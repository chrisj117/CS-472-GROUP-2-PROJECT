from django.test import TestCase
from school.models import School
from review.models import Review


class TestModels(TestCase):

    def test_should_create_school(self):
        school = School.objects.create(short_name="TEST",
                                       long_name="The Test University")
        school.save()
        self.assertEqual(str(school), "TEST")

    def test_should_create_review(self):
        school = School.objects.create(
            short_name="TEST",
            long_name="Test University",
            website="http://testuniversity.edu",
            state="Test State",
            city="Test City",
            country="Test Country"
        )

        review = Review.objects.create(
            school=school,
            review_text="This is an excellent class!",
            term='Spring',
            grade_received='A',
            delivery_method='Online',
            helpful_count=5
        )

        self.assertTrue(Review.objects.filter(pk=review.pk).exists())
        self.assertEqual(str(review), "Review for TEST")