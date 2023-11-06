from utils.models import TrackingModel
from django.db import models


class RequestSchool(TrackingModel):
    class Meta:
        verbose_name_plural = "RequestSchools"

    school_name = models.CharField(max_length=50,
                                   unique=True)
    website = models.URLField()

    def __str__(self) -> str:
        return f'{self.school_name}'