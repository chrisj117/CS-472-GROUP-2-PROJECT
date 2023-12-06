from utils.models import TrackingModel
from django.db import models


class School(TrackingModel):
    class Meta:
        verbose_name_plural = "Schools"

    long_name = models.CharField(max_length=255, 
                                 verbose_name="LongName",
                                 unique=True, default="University of Nevada, Las Vegas")
    short_name = models.CharField(max_length=5, verbose_name="ShortName", unique=True, default="UNLV")
    website = models.URLField(null=True)
    state = models.CharField(max_length=25, verbose_name="State")
    city = models.CharField(max_length=25, verbose_name="City")
    country = models.CharField(max_length=25, verbose_name="Country")

    def __str__(self) -> str:
        return f'{self.short_name}'


class Professor(TrackingModel):
    class Meta:
        verbose_name_plural = "Professors"

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    schools = models.ManyToManyField('School', related_name='professors')

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'


class Course(TrackingModel):
    class Meta:
        verbose_name_plural = "Courses"
    
    # Each course is linked to a certain school, 
    # courses cant exist without a school for our purposes
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    # i.e. "CS"
    subject = models.CharField(max_length=4, verbose_name="SubjectAbbreviation")
    # "101"
    catalog_number = models.CharField(max_length=5, verbose_name="CatalogNumber")
    # "Computer Science I"
    title = models.CharField(max_length=55, verbose_name="Title")

    # TODO: Professor foreign key, a course can have multiple professors,
    # professors can have multiple courses
    professors = models.ManyToManyField('Professor', related_name='courses')

    # Include school name in this string representation too?
    def __str__(self) -> str:
        return f'{self.subject} {self.catalog_number}'
