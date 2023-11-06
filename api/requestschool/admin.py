from django.contrib import admin
from .models import RequestSchool


@admin.register(RequestSchool)
class RequestSchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_name', 'website')
