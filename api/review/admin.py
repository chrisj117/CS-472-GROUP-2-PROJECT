from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
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

    list_filter = (
        'school',
        'term',
        'grade_received',
        'delivery_method'
    )
