from rest_framework import serializers
from review.models import Review
from school.models import Course, School, Professor


class ReviewSerializer(serializers.ModelSerializer):
    school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    professor = serializers.PrimaryKeyRelatedField(queryset=Professor.objects.all())

    review_text = serializers.CharField(required=True)
    term = serializers.ChoiceField(required=True, choices=Review.TERM_CHOICES)
    grade_received = serializers.ChoiceField(required=False, choices=Review.GRADE_CHOICES, allow_blank=True, default='N/A')
    delivery_method = serializers.ChoiceField(required=False, choices=Review.DELIVERY_CHOICES, allow_blank=True, default='N/A')
    textbook_required = serializers.BooleanField(required=False, default=False)
    helpful_count = serializers.IntegerField(required=False)

    # Fields for rating questions
    rating_course_overall = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_course_content = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_instructor_contribution = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_course_organization = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_instructor_explanation = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_instructor_interest = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_work_amount = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_clarity_requirements = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_class_time_use = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_student_confidence = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)
    rating_question_quality = serializers.ChoiceField(choices=Review.RATING_CHOICES, required=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "school",
            "course",
            "professor",
            "review_text",
            "term",
            "grade_received",
            "delivery_method",
            "textbook_required",
            "helpful_count",
            "year_taken",
            "recommended",
            "rating_course_overall",
            "rating_course_content",
            "rating_instructor_contribution",
            "rating_course_organization",
            "rating_instructor_explanation",
            "rating_instructor_interest",
            "rating_work_amount",
            "rating_clarity_requirements",
            "rating_class_time_use",
            "rating_student_confidence",
            "rating_question_quality",
            "created_at",
            "updated_at",
        )

    def validate(self, data):
        course = data["course"]
        school = data["school"]
        professor = data["professor"]

        # Check if the course is from the selected school
        if course.school != school:
            raise serializers.ValidationError(
                {"course": "The course must be from the selected school."}
            )

        # Validate that the professor is teaching the course
        if professor and not course.professors.filter(id=professor.id).exists():
            raise serializers.ValidationError(
                {"professor": "This professor does not teach the selected course."}
            )

        return data
