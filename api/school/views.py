from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import SchoolSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import School


class SchoolAPIView(views.APIView):
    """
    Endpoints for creating and listing schools
    """
    serializer_class = SchoolSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={
                "message": "School created successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_OK)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, short_name=None):
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
    
    def put(self, request, short_name, format=None):
        if short_name !="" and short_name is not None:
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
        else:
            return JsonResponse({"message": "Please provide short name of the school"})
    
    def delete(self, request, short_name, format=None):
        school_object = School.objects.get(short_name=short_name)
        if school_object:
            school_object.delete()
            return Response({"message": "school deleted successfully", "data":[]}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "school not found!", "data":[]}, status=status.HTTP_204_NO_CONTENT)
        
    
    
    