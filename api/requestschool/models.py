from utils.models import TrackingModel
from django.db import models


class RequestSchool(TrackingModel):
    school_name = models.CharField(max_length=50)
    website = models.URLField()

    def __str__(self) -> str:
        return f'{self.school_name}'