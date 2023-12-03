from django.contrib import admin

from .models import Course, School, Professor


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "long_name",
        "short_name",
        "website",
        "city",
        "state",
        "country",
        "created_at",
        "updated_at",
    )


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("subject", "catalog_number", "title", "school")
    search_fields = (
        "subject",
        "catalog_number",
        "title",
        "school__short_name",
        "school__long_name",
    )
    list_filter = ("school", "subject")


@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "display_schools")
    search_fields = ("first_name", "last_name", "schools__long_name", "schools__short_name")
    list_filter = ("schools",)

    def display_schools(self, obj):
        return ", ".join([school.short_name for school in obj.schools.all()])
    display_schools.short_description = "Schools"
