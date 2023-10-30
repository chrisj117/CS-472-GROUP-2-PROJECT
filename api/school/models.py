from utils.models import TrackingModel
from django.db import models


class School(TrackingModel):
    class Meta:
        verbose_name_plural = "Schools"

    long_name = models.CharField(max_length=25, 
                                 verbose_name="LongName",
                                 unique=True, default="UNLV")
    short_name = models.CharField(max_length=5, verbose_name="ShortName", unique=True, default="UNLV")
    website = models.URLField(null=True)
    state = models.CharField(max_length=25, verbose_name="State")
    city = models.CharField(max_length=25, verbose_name="City")
    country = models.CharField(max_length=25, verbose_name="Country")

    def __str__(self) -> str:
        return f'{self.long_name}'
