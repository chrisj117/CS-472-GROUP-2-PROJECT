from review.models import Review
from rest_framework import serializers
from rest_framework.fields import CharField, IntegerField
from school.models import School


class ReviewSerializer(serializers.ModelSerializer):
    # referencing the school's ID during review creation or editing. 
    school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all())
    
    review_text = CharField(required=True)
    term = CharField(required=True, choices=Review.TERM_CHOICES)
    grade_received = CharField(required=True, choices=Review.GRADE_CHOICES)
    delivery_method = CharField(required=True, choices=Review.DELIVERY_CHOICES)
    helpful_count = IntegerField(required=False)

    class Meta:
        model = Review
        fields = (
            'id',
            'school',
            'review_text',
            'term',
            'grade_received',
            'delivery_method',
            'helpful_count',
            'created_at',
            'updated_at'
        )