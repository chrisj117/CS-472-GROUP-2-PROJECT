from rest_framework import status, views
from rest_framework.response import Response
from review.models import Review
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

    def get(self, school_id=None):
        try:
            if school_id:
                reviews = Review.objects.filter(school__id=school_id)
                serializer = ReviewSerializer(reviews, many=True)
            else:
                query_set = Review.objects.all()
                serializer = ReviewSerializer(query_set, many=True)
            response = {
                "message": "Reviews listed successfully",
                "data": serializer.data,
            }
            return Response(data=response, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            return Response(
                {"message": "Review not found!", "data": []},
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

    def delete(self, review_id=None):
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
