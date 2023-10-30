from school.models import School
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