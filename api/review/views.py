from rest_framework import status, views
from rest_framework.response import Response
from review.models import Review
from school.models import School
from review.serializers import ReviewSerializer


class ReviewAPIView(views.APIView):
    """
    Endpoints for creating, updating, and listing reviews.
    """

    serializer_class = ReviewSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "Review created successfully",
                "data": serializer.data,
            }
            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, review_id=None, short_name=None):
        try:
            if review_id:
                review = Review.objects.get(id=review_id)
                serializer = self.serializer_class(review)
            elif short_name:
                school = School.objects.get(short_name=short_name)
                reviews = Review.objects.filter(school=school)
                serializer = self.serializer_class(reviews, many=True)
            else:
                queryset = Review.objects.all()
                serializer = self.serializer_class(queryset, many=True)
            response = {
                "message": "Reviews listed successfully",
                "data": serializer.data,
            }
            return Response(data=response, status=status.HTTP_200_OK)
        except (Review.DoesNotExist, School.DoesNotExist):
            return Response(
                {"message": "No reviews found!", "data": []},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, review_id=None):
        try:
            review_object = Review.objects.get(id=review_id)
            data = request.data
            serializer = self.serializer_class(data=data, instance=review_object)
            if serializer.is_valid():
                serializer.save()
                response = {
                    "message": "Review updated successfully",
                    "data": serializer.data,
                }
                return Response(data=response, status=status.HTTP_200_OK)

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Review.DoesNotExist:
            return Response(
                {"message": "Review not found!", "data": []},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, *args, **kwargs):
        review_id = kwargs.get('review_id', None)
        if review_id is not None:
            try:
                review_object = Review.objects.get(id=review_id)
                review_object.delete()
                return Response(
                    {"message": "Review deleted successfully", "data": []},
                    status=status.HTTP_204_NO_CONTENT,
                )
            except Review.DoesNotExist:
                return Response(
                    {"message": "Review not found!", "data": []},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"message": "Invalid review ID", "data": []},
                status=status.HTTP_400_BAD_REQUEST,
            )
