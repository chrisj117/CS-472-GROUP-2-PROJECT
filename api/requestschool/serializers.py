from requestschool.models import RequestSchool
from rest_framework import serializers
from rest_framework.fields import CharField


class RequestSchoolSerializer(serializers.ModelSerializer):

	school_name = CharField(required=True)
	website = CharField(required=True)

	class Meta:
		model = RequestSchool
		fields = (
			'id',
			'school_name',
			'website',
		)