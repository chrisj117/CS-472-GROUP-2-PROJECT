from django.test import TestCase
from school.models import School
from review.models import Review
from requestschool.models import RequestSchool
from school.models import Course, Professor


class TestModels(TestCase):

    def test_should_create_school(self):
        school = School.objects.create(short_name="TEST",
                                       long_name="The Test University")
        school.save()
        self.assertEqual(str(school), "TEST")

    def test_should_create_review(self):
        # Create a school instance
        school = School.objects.create(
            short_name="TEST",
            long_name="Test University",
            website="http://testuniversity.edu",
            state="Test State",
            city="Test City",
            country="Test Country"
        )

        # Create a course instance
        course = Course.objects.create(
            school=school,
            subject="TEST",
            catalog_number="101",
            title="Introduction to Tests"
        )

        # Create a professor instance
        professor = Professor.objects.create(
            first_name="John",
            last_name="Doe"
        )
        professor.schools.add(school)
        professor.save()

        # Create a review instance
        review = Review.objects.create(
            school=school,
            course=course,
            professor=professor,
            review_text="This is an excellent class!",
            term='Spring',
            grade_received='A',
            delivery_method='Online',
            helpful_count=5,
            year_taken=2023,
            textbook_required=False,
            recommended=True,
            rating_course_overall=5,
            rating_course_content=4,
            rating_instructor_contribution=5,
            rating_course_organization=4,
            rating_instructor_explanation=5,
            rating_instructor_interest=4,
            rating_work_amount=3,
            rating_clarity_requirements=4,
            rating_class_time_use=3,
            rating_student_confidence=5,
            rating_question_quality=4
        )
        review.save()

        # Assert that the review exists and its string representation is correct
        self.assertTrue(Review.objects.filter(pk=review.pk).exists())
        self.assertEqual(str(review), "Review for TEST 101 by John Doe at TEST")

    def test_should_create_professor(self):
        # Create a school instance
        school = School.objects.create(
            short_name="TEST_U",
            long_name="The Test University"
        )

        # Create a professor instance
        professor = Professor.objects.create(
            first_name="John",
            last_name="Doe"
        )
        professor.schools.add(school)
        professor.save()
        self.assertEqual(str(professor), "John Doe")
        self.assertIn(school, professor.schools.all())

    def test_should_create_school_request(self):
        school_req = RequestSchool.objects.create(school_name="TEST_U", 
                                                  website="https://www.test-university.edu/")
        school_req.save()
        self.assertEqual(str(school_req), "TEST_U")

    def test_should_create_course(self):
        # Create a school to attach this test course to
        school = School.objects.create(short_name="TEST_U",
                                       long_name="The Test University")
        school.save()

        course = Course.objects.create(
            school=school, 
            subject="TEST", 
            catalog_number="101", 
            title="Introduction to Tests"
        )
        course.save()
        self.assertEqual(str(course), "TEST 101")
