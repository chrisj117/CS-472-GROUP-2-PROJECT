from rest_framework import serializers
from rest_framework.fields import CharField, ChoiceField, IntegerField
from review.models import Review
from school.models import Course, School


class ReviewSerializer(serializers.ModelSerializer):
    # referencing the school's ID during review creation or editing.
    school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    review_text = CharField(required=True)
    term = ChoiceField(required=True, choices=Review.TERM_CHOICES)
    grade_received = ChoiceField(required=True, choices=Review.GRADE_CHOICES)
    delivery_method = ChoiceField(required=True, choices=Review.DELIVERY_CHOICES)
    helpful_count = IntegerField(required=False)

    class Meta:
        model = Review
        fields = (
            "id",
            "school",
            "course",
            "review_text",
            "term",
            "grade_received",
            "delivery_method",
            "helpful_count",
            "year_taken",
            "textbook_required",
            "recommended",
            "created_at",
            "updated_at",
        )

    def validate(self, data):
        course = data["course"]
        school = data["school"]

        if course.school != school:
            raise serializers.ValidationError(
                {"course": "The course must be from the selected school."}
            )

        return data
