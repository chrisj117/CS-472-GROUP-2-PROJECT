import uuid
import re

from rest_framework import status, views
from rest_framework.response import Response
from review.models import Review
from review.serializers import ReviewSerializer
from school.models import Course, School, Professor


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

        # Handle professor identifier
        professor_identifier = data.pop("professor", None)
        if professor_identifier:
            # If it's a list, get the first element
            if isinstance(professor_identifier, list) and professor_identifier:
                professor_identifier = professor_identifier[0]

            try:
                # Attempt to process it as a UUID
                professor = Professor.objects.get(pk=uuid.UUID(professor_identifier))
                data["professor"] = professor.pk
            except (ValueError, Professor.DoesNotExist):
                # If not a UUID, process as "first_name last_name"
                try:
                    first_name, last_name = professor_identifier.split(maxsplit=1)
                    professor = Professor.objects.get(first_name=first_name, last_name=last_name)
                    data["professor"] = professor.pk
                except (ValueError, Professor.DoesNotExist):
                    return Response(
                        {"error": "Invalid professor identifier format or professor not found."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

        # Proceed with serialization
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            # Fetch the school and course objects to get their short name and code
            school = School.objects.get(pk=serializer.data["school"])
            course = Course.objects.get(pk=serializer.data["course"])
            professor = Professor.objects.get(pk=serializer.data["professor"])

            # Update the response data with school's short name and course code
            response_data = serializer.data
            response_data["school"] = school.short_name
            response_data["course"] = f'{course.subject} {course.catalog_number}'
            response_data["professor"] = f'{professor.first_name} {professor.last_name}'

            return Response(
                {"message": "Review created successfully", "data": response_data},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, review_id=None, short_name=None, course_subject_catalog=None):
        if short_name and course_subject_catalog:
            return self.course_review_list(request, short_name, course_subject_catalog)
        if review_id:
            try:
                review = Review.objects.get(id=review_id)
                serializer = self.serializer_class(review)
                response_data = serializer.data

                school = School.objects.get(pk=response_data["school"])
                course = Course.objects.get(pk=response_data["course"])
                professor = Professor.objects.get(pk=response_data["professor"])

                response_data["school"] = school.short_name
                response_data["course"] = f'{course.subject} {course.catalog_number}'
                response_data["professor"] = f'{professor.first_name} {professor.last_name}'

                response = {"message": "Review retrieved successfully", "data": response_data}
                return Response(data=response, status=status.HTTP_200_OK)
            except Review.DoesNotExist:
                return Response({"message": "Review not found!", "data": []}, status=status.HTTP_404_NOT_FOUND)
        if short_name:
            try:
                school = School.objects.get(short_name=short_name)
                reviews = Review.objects.filter(school=school)
            except School.DoesNotExist:
                return Response({"message": "School not found!", "data": []}, status=status.HTTP_404_NOT_FOUND)
        else:
            reviews = Review.objects.all()

        serializer = self.serializer_class(reviews, many=True)
        response_data = []

        for review in reviews:
            review_data = ReviewSerializer(review).data
            review_school = School.objects.get(pk=review_data["school"])
            review_course = Course.objects.get(pk=review_data["course"])
            review_professor = Professor.objects.get(pk=review_data["professor"])

            review_data["school"] = review_school.short_name
            review_data["course"] = f'{review_course.subject} {review_course.catalog_number}'
            review_data["professor"] = f'{review_professor.first_name} {review_professor.last_name}'
            response_data.append(review_data)

        return Response(response_data, status=status.HTTP_200_OK)

    def course_review_list(self, request, short_name, course_subject_catalog):
        # Use regular expression to split the course_subject_catalog into subject and catalog_number
        match = re.match(r"([a-zA-Z]+)([0-9]+)", course_subject_catalog)
        if not match:
            return Response({'error': 'Invalid course identifier format'}, status=status.HTTP_400_BAD_REQUEST)

        subject, catalog_number = match.groups()

        try:
            school = School.objects.get(short_name=short_name)
            course = Course.objects.filter(subject=subject, catalog_number=catalog_number, school=school).first()
        except School.DoesNotExist:
            return Response({'error': 'School not found'}, status=status.HTTP_404_NOT_FOUND)

        if not course:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        reviews = Review.objects.filter(course=course)
        response_data = []

        for review in reviews:
            review_data = ReviewSerializer(review).data
            review_data["school"] = school.short_name
            review_data["course"] = f'{course.subject} {course.catalog_number}'
            review_data["professor"] = f'{review.professor.first_name} {review.professor.last_name}'
            response_data.append(review_data)

        return Response(response_data, status=status.HTTP_200_OK)

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

        # Handle professor identifier
            professor_identifier = data.pop("professor", None)
            if professor_identifier:
                # Check if identifier is a list and get the first element
                if isinstance(professor_identifier, list) and professor_identifier:
                    professor_identifier = professor_identifier[0]

                try:
                    uuid.UUID(professor_identifier)
                    professor_pk = professor_identifier
                except ValueError:
                    try:
                        first_name, last_name = professor_identifier.split(maxsplit=1)
                        professor = Professor.objects.get(first_name=first_name, last_name=last_name)
                        professor_pk = professor.pk
                    except (ValueError, Professor.DoesNotExist):
                        return Response(
                            {"error": "Invalid professor identifier format or professor not found."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
            data["professor"] = professor_pk

            serializer = self.serializer_class(review_object, data=data)
            if serializer.is_valid():
                serializer.save()

                # Fetch the school, course, and professor objects
                school = School.objects.get(pk=serializer.data["school"])
                course = Course.objects.get(pk=serializer.data["course"])
                professor = Professor.objects.get(pk=serializer.data["professor"])

                # Update the response data with detailed information
                response_data = serializer.data
                response_data["school"] = school.short_name
                response_data["course"] = f'{course.subject} {course.catalog_number}'
                response_data["professor"] = f'{professor.first_name} {professor.last_name}'

                return Response(
                    {"message": "Review updated successfully", "data": response_data},
                    status=status.HTTP_200_OK,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #! line not covered by tests

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
