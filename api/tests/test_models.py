from django.test import TestCase
from school.models import School
from requestschool.models import RequestSchool


class TestModels(TestCase):
    
    def test_should_create_school(self):
        school = School.objects.create(short_name="TEST", 
                                       long_name="The Test University")
        school.save()
        self.assertEqual(str(school), "TEST")

    def test_should_create_school_request(self):
        school_req = RequestSchool.objects.create(school_name="TEST_U", 
                                                  website="https://www.test-university.edu/")
        school_req.save()
        self.assertEqual(str(school_req), "TEST_U")
