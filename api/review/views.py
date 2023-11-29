import uuid

from rest_framework import status, views
from rest_framework.response import Response
from review.models import Review
from review.serializers import ReviewSerializer
from school.models import Course, School


class ReviewAPIView(views.APIView):
    """
    Endpoints for creating, updating, and listing reviews.
    """

    serializer_class = ReviewSerializer

    def post(self, request):
        data = request.data.copy()

        school_identifier = data.get("school", None)
        if school_identifier:
            try:
                # Checking if valid UUID is provided
                if uuid.UUID(school_identifier):
                    school = School.objects.get(pk=school_identifier)
                    data["school"] = school.pk
            except (ValueError, School.DoesNotExist):
                # Getting school from short_name if UUID is not valid.
                school = School.objects.filter(short_name=school_identifier).first()
                if school:
                    data["school"] = school.pk
                else:
                    return Response(
                        {"error": "School not found with the provided identifier."},
                        status=status.HTTP_404_NOT_FOUND,
                    )

        course_identifier = data.get("course", None)
        if course_identifier:
            if isinstance(course_identifier, list):
                course_identifier = course_identifier[0]

            try:
                # Check if it's a valid UUID
                uuid.UUID(course_identifier)
                course = Course.objects.get(pk=course_identifier)
                data["course"] = course.pk
            except ValueError:
                # If not a UUID, try parsing as "subject & catalog_number"
                try:
                    subject, catalog_number = course_identifier.split()
                    course = Course.objects.get(subject=subject, catalog_number=catalog_number)
                    data["course"] = course.pk
                except (ValueError, Course.DoesNotExist):
                    # Handle cases where the format is incorrect or course does not exist
                    return Response(
                        {"error": "Invalid course identifier format or course not found."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
        else:
            # Handle case where course identifier is not provided
            return Response(
                {"error": "Course identifier is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Proceed with serialization
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            # Fetch the school and course objects to get their short name and code
            school = School.objects.get(pk=serializer.data["school"])
            course = Course.objects.get(pk=serializer.data["course"])

            # Update the response data with school's short name and course code
            response_data = serializer.data
            response_data["school"] = school.short_name
            response_data["course"] = f'{course.subject} {course.catalog_number}'

            return Response(
                {"message": "Review created successfully", "data": response_data},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # line not covered in test

    def get(self, request, review_id=None, short_name=None):
        if review_id:
            # retrieving a single review by ID
            try:
                review = Review.objects.get(id=review_id)
                serializer = self.serializer_class(review)
                response_data = serializer.data

                # Update school's short name and course code
                school = School.objects.get(pk=response_data["school"])
                course = Course.objects.get(pk=response_data["course"])
                response_data["school"] = school.short_name
                response_data["course"] = f'{course.subject} {course.catalog_number}'

                response = {
                    "message": "Review retrieved successfully",
                    "data": response_data,
                }
                return Response(data=response, status=status.HTTP_200_OK)
            except Review.DoesNotExist:
                return Response(
                    {"message": "Review not found!", "data": []},
                    status=status.HTTP_404_NOT_FOUND,
                )

        if short_name:
            # retrieving reviews for school when short_name is provided.
            try:
                school = School.objects.get(short_name=short_name)
                reviews = Review.objects.filter(school=school)
            except School.DoesNotExist:
                return Response(
                    {"message": "School not found!", "data": []},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            # list all reviews when id or shortname is not provided.
            reviews = Review.objects.all()

        serializer = self.serializer_class(reviews, many=True)
        response_data = serializer.data

        # Update each review in the response data
        for review in response_data:
            school = School.objects.get(pk=review["school"])
            course = Course.objects.get(pk=review["course"])
            review["school"] = school.short_name
            review["course"] = f'{course.subject} {course.catalog_number}'

        response = {"message": "Reviews listed successfully", "data": response_data}
        return Response(data=response, status=status.HTTP_200_OK)

    def put(self, request, review_id=None):
        try:
            review_object = Review.objects.get(id=review_id)
            data = request.data.copy()

            # Handle school identifier
            school_identifier = data.get("school", None)
            if school_identifier:
                try:
                    if uuid.UUID(school_identifier):
                        school = School.objects.get(pk=school_identifier)
                        data["school"] = school.pk
                except (ValueError, School.DoesNotExist):
                    school = School.objects.filter(short_name=school_identifier).first()
                    if school:
                        data["school"] = school.pk
                    else:
                        return Response(
                            {"error": "School not found with the provided identifier."},
                            status=status.HTTP_404_NOT_FOUND,
                        )

            # Handle course identifier
            course_identifier = data.pop("course", None)
            if course_identifier:
                if isinstance(course_identifier, list):
                    course_identifier = course_identifier[0]

                try:
                    uuid.UUID(course_identifier)
                    course_pk = course_identifier
                except ValueError:
                    try:
                        subject, catalog_number = course_identifier.split()
                        course = Course.objects.get(subject=subject, catalog_number=catalog_number)
                        course_pk = course.pk
                    except (ValueError, Course.DoesNotExist):
                        return Response(
                            {"error": "Invalid course identifier format or course not found."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                data["course"] = course_pk

            serializer = self.serializer_class(review_object, data=data)
            if serializer.is_valid():
                serializer.save()

                # Fetch the school and course objects to get their short name and code
                school = School.objects.get(pk=serializer.data["school"])
                course = Course.objects.get(pk=serializer.data["course"])

                # Update the response data with school's short name and course code
                response_data = serializer.data
                response_data["school"] = school.short_name
                response_data["course"] = f'{course.subject} {course.catalog_number}'

                return Response(
                    {"message": "Review updated successfully", "data": response_data},
                    status=status.HTTP_200_OK,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Review.DoesNotExist:
            return Response(
                {"message": "Review not found!"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, *args, **kwargs):
        review_id = kwargs.get("review_id")
        try:
            review_object = Review.objects.get(id=review_id)
            review_object.delete()
            return Response(
                {"message": "Review deleted successfully", "data": []},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Review.DoesNotExist:
            # The review does not exist
            return Response(
                {"message": "Review not found!", "data": []},
                status=status.HTTP_404_NOT_FOUND,
            )
