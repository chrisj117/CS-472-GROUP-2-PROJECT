from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import RequestSchoolSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import RequestSchool


class RequestSchoolAPIView(views.APIView):
    """
    Endpoints for creating, listing, and deleting school requests
    """
    serializer_class = RequestSchoolSerializer

    """Create a new school request"""
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "School request created successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        # If serializer is not valid, bad request
        # This will occur usually when a duplicate school name is attempting to be posted.
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    """Get school requests"""
    def get(self, request, school_name=None):
        try:
            if school_name:
                request_school_object = RequestSchool.objects.get(school_name=school_name)
                serializer = RequestSchoolSerializer(request_school_object)
            else:
                query_set = RequestSchool.objects.all()
                serializer = RequestSchoolSerializer(query_set, many=True)
            response={
                "message": "School requests listed successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        except RequestSchool.DoesNotExist:
            return Response({"message": "School request not found!", "data":[]}, status=status.HTTP_404_NOT_FOUND)

    """Delete a school request"""
    def delete(self, request, school_name=None):
        try:
            request_school_object = RequestSchool.objects.get(school_name=school_name)
            request_school_object.delete()
            return Response({"message": "School request deleted successfully", "data":[]}, status=status.HTTP_204_NO_CONTENT)
        except RequestSchool.DoesNotExist:
            return Response({"message": "School request not found!", "data":[]}, status=status.HTTP_404_NOT_FOUND)