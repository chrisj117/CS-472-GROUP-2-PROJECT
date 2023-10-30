from django.test import TestCase
from school.models import School


class TestModels(TestCase):
    
    def test_should_create_school(self):
        school = School.objects.create(short_name="TEST", 
                                       long_name="The Test University")
        school.save()
        self.assertEqual(str(school), "TEST")
