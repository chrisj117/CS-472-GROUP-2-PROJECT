from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from school.models import School, Course, Professor
import uuid


class TestSchoolAIPView(APITestCase):
    def test_should_create_school(self):
        test_data = {
            "short_name": "TEST",
            "long_name": "The Test University",
            "website": "https://test.university.edu",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country"
        }
        test_data_with_missing_required_field = {
            "website": "https://test.university.edu",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country"
        }

        response = self.client.post(reverse('schools'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(
            reverse('schools'), test_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_list_all_schools(self):
        response = self.client.get(reverse('schools'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(len(response.data), 0)
        self.assertIsInstance(response.data['data'], list)

    def test_should_return_one_school(self):
        test_data = {
            "short_name": "TEST",
            "long_name": "The Test University",
            "website": "https://test.university.edu",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country"
        }

        response = self.client.post(reverse('schools'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(
            reverse('school', kwargs={'short_name': "TEST"}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['short_name'], 'TEST')
        # try to get a school that doesn't exit
        response = self.client.get(
            reverse('school', kwargs={'short_name': "TEST123"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

    def test_should_update_school(self):
        test_data = {
            "short_name": "TEST",
            "long_name": "The Test University",
            "website": "https://test.university.edu",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country"
        }

        response = self.client.post(reverse('schools'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        update_data = {
            "short_name": "TEST",
            "long_name": "The Test University",
            "website": "https://update.university.edu",
            "city": "Updated",
        }
        update_data_with_missing_required_field = {
            "long_name": "The Test University",
            "website": "https://update.university.edu",
            "city": "Updated",
        }
        response = self.client.put(
            reverse('school', kwargs={'short_name': "TEST"}), update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['city'], 'Updated')
        self.assertEqual(
            response.data['data']['website'], 'https://update.university.edu')

        response = self.client.put(reverse('school', kwargs={
                                   'short_name': "TEST"}), update_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.put(
            reverse('school', kwargs={'short_name': "TEST123"}), update_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_should_delete_school(self):
        test_data = {
            "short_name": "TEST",
            "long_name": "The Test University",
            "website": "https://test.university.edu",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country"
        }
        # create a school
        response = self.client.post(reverse('schools'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # delete the newly created school
        response = self.client.delete(
            reverse('school', kwargs={'short_name': "TEST"}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(response.data['data']), 0)
        # try to delete to a school that doesn't exist
        response = self.client.delete(
            reverse('school', kwargs={'short_name': "TEST"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

        
# Review API TESTS
class TestReviewAPIView(APITestCase):
    def setUp(self):
        self.school = School.objects.create(
            long_name="Test School", short_name="TS",
            city="Test City", state="Test State", country="Test Country")
        self.professor = Professor.objects.create(first_name="John", last_name="Doe")
        self.course = Course.objects.create(
            school=self.school, subject="TEST", catalog_number="101", title="Introduction to Tests")
        self.professor.courses.add(self.course)

    # --- TESTING POST METHOD ---
    def create_review(self, data):
        return self.client.post(reverse('review_list'), data, format='json')

    def create_test_review_data(self, override_data=None):
        data = {
            "school": self.school.id,
            "course": self.course.id,
            "professor": self.professor.id,
            "review_text": "This is a sample review.",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True,
            "rating_course_overall": 3,
            "rating_course_content": 2,
            "rating_instructor_contribution": 3,
            "rating_course_organization": 2,
            "rating_instructor_explanation": 3,
            "rating_instructor_interest": 5,
            "rating_work_amount": 3,
            "rating_clarity_requirements": 5,
            "rating_class_time_use": 1,
            "rating_student_confidence": 2,
            "rating_question_quality": 3
        }
        if override_data:
            data.update(override_data)
        return data

    def test_should_create_review(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("data", response.data)
        self.assertEqual(response.data['data']['review_text'], test_data['review_text'])

    def test_create_review_with_invalid_school_uuid(self):
        test_data = self.create_test_review_data({
            "school": "invalid-uuid",
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)

    def test_create_review_with_valid_school_uuid_but_nonexistent(self):
        # Generate a valid UUID that doesn't exist in the database
        nonexistent_uuid = uuid.uuid4()
        test_data = self.create_test_review_data({
            "school": nonexistent_uuid,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)

    def test_create_review_with_valid_school_uuid(self):
        # Use an existing school's UUID
        valid_uuid = str(self.school.id)
        test_data = self.create_test_review_data({
            "school": valid_uuid,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("data", response.data)

    def test_create_review_with_list_course_identifier(self):
        # Course identifier as a list
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": [str(self.course.id)],
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_review_with_invalid_course_format(self):
        # Invalid format for course identifier
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": "invalid-format",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_review_without_course_identifier(self):
        # No course identifier provided
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        })
        test_data.pop("course")
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_review_with_invalid_professor_identifier(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": "invalid-professor-identifier"  # Non-UUID, non-first name last name format
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_create_review_with_list_professor_identifier_invalid(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": ["invalid-list-item"]  # List with an invalid item
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_create_review_with_valid_course_and_professor_uuids(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": str(self.course.id),
            "professor": str(self.professor.id)
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_review_with_invalid_data(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}",
            "grade_received": "Invalid Grade"  # Invalid grade
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("grade_received", response.data)
        self.assertEqual(response.data["grade_received"][0], '"Invalid Grade" is not a valid choice.')

    def test_create_review_with_invalid_serializer_data(self):
        test_data = self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}",
            "grade_received": "Invalid Grade"  # Invalid grade to trigger serializer error
        })
        response = self.create_review(test_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("grade_received", response.data)

    # --- TESTING GET METHOD ---
    def test_should_list_all_reviews(self):
        self.create_review(self.create_test_review_data({
            "school": self.school.short_name,
            "course": f"{self.course.subject} {self.course.catalog_number}",
            "professor": f"{self.professor.first_name} {self.professor.last_name}"
        }))
        response = self.client.get(reverse('review_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_reviews_by_school_short_name(self):
        for i in range(5):
            self.create_review(self.create_test_review_data({
                "school": self.school.short_name,
                "course": f"{self.course.subject} {self.course.catalog_number}",
                "professor": f"{self.professor.first_name} {self.professor.last_name}",
                "review_text": f"This is review number {i}"
            }))
        url = reverse('school_reviews', kwargs={'short_name': self.school.short_name})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(response.data, list))
        self.assertEqual(len(response.data), 5)

    def test_get_reviews_for_nonexistent_school(self):
        response = self.client.get(reverse('school_reviews', kwargs={'short_name': 'nonexistent'}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "School not found!")

    def test_get_all_reviews(self):
        # Make sure there's at least one review in the database
        self.create_review(self.create_test_review_data())
        response = self.client.get(reverse('review_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_retrieve_specific_review(self):
        # Create a review and then try to retrieve it by ID
        review_data = self.create_test_review_data()
        created_review = self.create_review(review_data).data['data']
        response = self.client.get(reverse('review_detail', kwargs={'review_id': created_review['id']}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['id'], created_review['id'])

    def test_retrieve_nonexistent_review(self):
        # Try to retrieve a review with a nonexistent ID
        nonexistent_review_id = uuid.uuid4()
        response = self.client.get(reverse('review_detail', kwargs={'review_id': nonexistent_review_id}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_reviews_by_school_and_course(self):
        # Create multiple reviews for the same course and then retrieve them
        for i in range(5):
            self.create_review(self.create_test_review_data({
                "review_text": f"Review {i} for course"
            }))
        response = self.client.get(reverse('course_reviews', kwargs={'short_name': self.school.short_name, 'course_subject_catalog': f"{self.course.subject}{self.course.catalog_number}"}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
    # --- TESTING COURSE_REVIEW_LIST METHOD ---
    def test_retrieve_reviews_with_invalid_course_format(self):
        response = self.client.get(reverse('course_reviews', kwargs={'short_name': self.school.short_name, 'course_subject_catalog': "invalidformat"}))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid course identifier format')

    def test_retrieve_reviews_nonexistent_school(self):
        response = self.client.get(reverse('course_reviews', kwargs={'short_name': 'nonexistent', 'course_subject_catalog': f"{self.course.subject}{self.course.catalog_number}"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'School not found')

    def test_retrieve_reviews_nonexistent_course(self):
        response = self.client.get(reverse('course_reviews', kwargs={'short_name': self.school.short_name, 'course_subject_catalog': "TST209"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Course not found')

    # --- TESTING PUT METHOD ---
    def create_and_return_review(self):
        review_data = self.create_test_review_data()
        return self.create_review(review_data).data['data']

    def test_successful_review_update(self):
        review = self.create_and_return_review()
        update_data = {
            "review_text": "Updated review text",
            "school": review['school'],
            "course": review['course'],
            "professor": review['professor'],
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True,
            "rating_course_overall": 3,
            "rating_course_content": 2,
            "rating_instructor_contribution": 3,
            "rating_course_organization": 2,
            "rating_instructor_explanation": 3,
            "rating_instructor_interest": 5,
            "rating_work_amount": 3,
            "rating_clarity_requirements": 5,
            "rating_class_time_use": 1,
            "rating_student_confidence": 2,
            "rating_question_quality": 3
        }
        response = self.client.put(reverse('review_detail', kwargs={'review_id': review['id']}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['review_text'], "Updated review text")

    def test_update_review_with_valid_uuids(self):
        review = self.create_and_return_review()
        valid_school_uuid = str(self.school.id)
        valid_course_uuid = str(self.course.id)
        valid_professor_uuid = str(self.professor.id)

        update_data = {
            "school": valid_school_uuid,
            "course": valid_course_uuid,
            "professor": valid_professor_uuid,
            "review_text": "Updated review text",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True,
            "rating_course_overall": 3,
            "rating_course_content": 2,
            "rating_instructor_contribution": 3,
            "rating_course_organization": 2,
            "rating_instructor_explanation": 3,
            "rating_instructor_interest": 5,
            "rating_work_amount": 3,
            "rating_clarity_requirements": 5,
            "rating_class_time_use": 1,
            "rating_student_confidence": 2,
            "rating_question_quality": 3
        }

        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review['id']}),
            update_data,
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['school'], self.school.short_name)
        self.assertEqual(response.data['data']['course'], f"{self.course.subject} {self.course.catalog_number}")
        self.assertEqual(response.data['data']['professor'], f"{self.professor.first_name} {self.professor.last_name}")
        self.assertEqual(response.data['data']['review_text'], "Updated review text")

    def test_update_review_with_course_identifier_as_list(self):
        review = self.create_and_return_review()
        update_data = {
            "course": [str(self.course.id)],
            "professor": [str(self.professor.id)],
            "school": review['school'],
            "review_text": "Review text",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True,
            "rating_course_overall": 3,
            "rating_course_content": 2,
            "rating_instructor_contribution": 3,
            "rating_course_organization": 2,
            "rating_instructor_explanation": 3,
            "rating_instructor_interest": 5,
            "rating_work_amount": 3,
            "rating_clarity_requirements": 5,
            "rating_class_time_use": 1,
            "rating_student_confidence": 2,
            "rating_question_quality": 3
        }
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review['id']}),
            update_data,
            format='json'
        )
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_nonexistent_review(self):
        nonexistent_review_id = uuid.uuid4()
        response = self.client.put(reverse('review_detail', kwargs={'review_id': nonexistent_review_id}), {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_school_identifier_in_update(self):
        review = self.create_and_return_review()
        update_data = {"school": "invalid-uuid"}
        response = self.client.put(reverse('review_detail', kwargs={'review_id': review['id']}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_course_identifier_in_update(self):
        review = self.create_and_return_review()
        update_data = {"course": "invalid-format"}
        response = self.client.put(reverse('review_detail', kwargs={'review_id': review['id']}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_professor_identifier_in_update(self):
        review = self.create_and_return_review()
        update_data = {"professor": "invalid-identifier"}
        response = self.client.put(reverse('review_detail', kwargs={'review_id': review['id']}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_review_with_invalid_serializer_data(self):
        review = self.create_and_return_review()
        update_data = {
            "professor": review['professor'],
            "review_text": "",
        }
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review['id']}),
            update_data,
            format='json'
        )
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("review_text", response.data)

    # --- TESTING DELETE METHOD ---
    def test_successful_review_deletion(self):
        review = self.create_and_return_review()
        response = self.client.delete(
            reverse('review_detail', kwargs={'review_id': review['id']})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, {"message": "Review deleted successfully", "data": []})

    def test_delete_nonexistent_review(self):
        nonexistent_review_id = uuid.uuid4()
        response = self.client.delete(
            reverse('review_detail', kwargs={'review_id': nonexistent_review_id})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"message": "Review not found!", "data": []})


# SCHOOL REQUEST TESTS
class TestSchoolRequestAIPView(APITestCase):
    # should delete a school request
    def test_should_delete_school_request(self):
        test_data = {
            "school_name" : "TEST_U",
            "website" : "https://www.test-university.com"
        }
        # create school request
        response = self.client.post(reverse('school_requests'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # delete it
        response = self.client.delete(reverse('school_request', kwargs={'school_name':"TEST_U"}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(response.data['data']), 0)
        # try to delete a school request that doesnt exist
        response = self.client.delete(reverse('school_request', kwargs={'school_name':"TEST"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

    # should get all school requests
    def test_should_get_all_school_requests(self):

        response = self.client.get(reverse('school_requests'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(len(response.data), 0)
        self.assertIsInstance(response.data['data'], list)

    # should get a school request
    def test_should_get_one_school_requests(self):
        test_data = {
            "school_name" : "TEST_U",
            "website" : "https://www.test-university.com"
        }

        response = self.client.post(reverse('school_requests'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(reverse('school_request', kwargs={'school_name':"TEST_U"}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['school_name'],'TEST_U')
        # Attempt to get a school that isnt in database
        response = self.client.get(reverse('school_request', kwargs={'school_name':"NOT_A_UNIVERSITY"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

    # should create 1 school request
    def test_should_create_one_school_request(self):
        test_data = {
            "school_name" : "TEST_U",
            "website" : "https://www.test-university.com"
        }
        test_data_with_missing_required_field = {
            "website" : "https://www.test-university.com"
        }

        # Make sure a created request returns a created code
        response = self.client.post(reverse('school_requests'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Make sure a bad request returns a bad request code
        response = self.client.post(reverse('school_requests'), test_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

