from utils.models import TrackingModel
from django.db import models
from school.models import School


class Review(TrackingModel):
    TERM_CHOICES = [
        ('Spring', 'Spring'),
        ('Summer', 'Summer'),
        ('Fall', 'Fall')
    ]

    GRADE_CHOICES = [
        ('F', 'F'),
        ('D-', 'D-'),
        ('D', 'D'),
        ('D+', 'D+'),
        ('C-', 'C-'),
        ('C', 'C'),
        ('C+', 'C+'),
        ('B-', 'B-'),
        ('B', 'B'),
        ('B+', 'B+'),
        ('A-', 'A-'),
        ('A', 'A'),
        ('A+', 'A+'),
        ('N/A', 'N/A')
    ]

    DELIVERY_CHOICES = [
        ('Online', 'Online'),
        ('In Person', 'In Person'),
        ('Hybrid', 'Hybrid')
    ]

    # If a school is deleted, all related reviews will also be deleted. Reviews can be nullable and optional
    # each review is associated with one school, and each school can have many reviews
    school = models.ForeignKey(
        School, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    # TODO: Course Model Foreign Key
    # TODO: Professor Model Foreign Key
    # limiting reviews to 500 characters
    review_text = models.CharField(max_length=500)
    # term in which the course was reviewed
    term = models.CharField(max_length=10, choices=TERM_CHOICES)
    # grade received by the reviewer
    grade_received = models.CharField(max_length=3, choices=GRADE_CHOICES)
    # mode in which reviewer took the course
    delivery_method = models.CharField(max_length=10, choices=DELIVERY_CHOICES)
    # count of how many people found the review helpful
    helpful_count = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Reviews"

    def __str__(self):
        return f'Review for {self.school.short_name}'


# TODO Rating Criteria Model

# TODO Review Rating Model
