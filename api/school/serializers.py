from school.models import School, Course, Professor
from rest_framework import serializers
from rest_framework.fields import CharField


class SchoolSerializer(serializers.ModelSerializer):

	long_name = CharField(required=True)
	short_name = CharField(required=True)
	state = CharField(required=False)
	city = CharField(required=False)
	country = CharField(required=False)

	class Meta:
		model = School
		fields = (
			'id',
			'long_name',
			'short_name',
			'website',
			'city',
			'state',
			'country',
			'created_at',
			'updated_at'
		)


class ProfessorSerializerFilter(serializers.ModelSerializer):

	class Meta:
		model = Professor
		fields = ('id', 'first_name', 'last_name')


class SchoolSerializerFilter(serializers.ModelSerializer):
	class Meta:
		model = School
		fields = ('id', 'short_name',)


class CourseSerializer(serializers.ModelSerializer):
	school = SchoolSerializerFilter(many=False)
	professors = ProfessorSerializerFilter(many=True)
	class Meta:
		model = Course
		fields = '__all__'