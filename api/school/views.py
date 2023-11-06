from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import SchoolSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import School


class SchoolAPIView(views.APIView):
    
    serializer_class = SchoolSerializer

    def post(self, request):
        """
        Endpoint for creating a new school
        """
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={
                "message": "School created successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, short_name=None):
        """
        Endpoint for retrieving schools
        """
        try:
            if short_name:
                school_object = School.objects.get(short_name=short_name)
                serializer = SchoolSerializer(school_object)
            else:
                query_set = School.objects.all()
                serializer = SchoolSerializer(query_set, many=True)
            response={
                        "message": "Schools listed successfully",
                        "data": serializer.data
                    }
            return Response(data=response, status=status.HTTP_200_OK)
        except School.DoesNotExist:
            return Response({"message": "school not found!", "data":[]}, status=status.HTTP_404_NOT_FOUND)

    
    def put(self, request, short_name=None, format=None):
        """
        Endpoint for updating school
        """
        try:
            school_object = School.objects.get(short_name=short_name)
            data = request.data
            serializer = self.serializer_class(data=data, instance=school_object)
            if serializer.is_valid():
                serializer.save()
                response={
                    "message": "School info updated successfully",
                    "data": serializer.data
                }
                return Response(data=response, status=status.HTTP_200_OK)
            
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except School.DoesNotExist:
            return Response({"message": "school not found!", "data":[]}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, short_name=None, format=None):
        """
        Endpoint for deleting a school
        """
        try:
            school_object = School.objects.get(short_name=short_name)
            school_object.delete()
            return Response({"message": "school deleted successfully", "data":[]}, status=status.HTTP_204_NO_CONTENT)
        except School.DoesNotExist:
             return Response({"message": "school not found!", "data":[]}, status=status.HTTP_404_NOT_FOUND)
    
    