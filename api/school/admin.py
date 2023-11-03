from django.contrib import admin
from .models import School


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'long_name', 'short_name', 'website', 'city', 'state', 'country', 'created_at','updated_at')
