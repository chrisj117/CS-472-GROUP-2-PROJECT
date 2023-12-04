from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'school',
        'course',
        'professor',
        'review_text',
        'term',
        'grade_received',
        'delivery_method',
        'helpful_count',
        'year_taken',
        'textbook_required',
        'recommended',
        'created_at',
        'updated_at'
    )

    list_filter = (
        'school',
        'course',
        'professor',
        'term',
        'grade_received',
        'delivery_method',
        'year_taken',
        'textbook_required',
        'recommended'
    )
