from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from school.models import School, Course
from review.models import Review
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
        # Creating a school and course object for the tests
        self.school = School.objects.create(
            long_name="Test School", short_name="TS", city="Test City",
            state="Test State", country="Test Country")
        self.course = Course.objects.create(
            school=self.school,
            subject="TEST",
            catalog_number="101",
            title="Introduction to Tests"
        )

    def test_should_create_review(self):
        test_data = {
            "school": self.school.id,
            "course": self.course.id,
            "review_text": "This is a sample review.",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }

        response = self.client.post(
            reverse('review_list'), test_data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.data)

        created_review_data = response.data['data']
        self.assertEqual(created_review_data.get('review_text'),
                         test_data['review_text'], response.data)

        # Test creating a review using school's short_name and course's subject and catalog_number
        test_data_with_short_name = {
            "school": self.school.short_name,
            "course": [self.course.subject + " " + self.course.catalog_number],
            "review_text": "Review with school short_name.",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        response = self.client.post(
            reverse('review_list'), test_data_with_short_name, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Attempt to create a review with a non-UUID string for 'school' and 'course' that should trigger the ValueError
        response_non_uuid = self.client.post(
            reverse('review_list'),
            {
                "school": "not-a-uuid",
                "course": [self.course.subject + " " + self.course.catalog_number],
                "review_text": "Invalid school identifier.",
                "term": "Fall",
                "grade_received": "B+",
                "delivery_method": "In Person",
                "helpful_count": 10,
                "year_taken": 2023,
                "textbook_required": False,
                "recommended": True
            },
            format='json'
        )
        self.assertEqual(response_non_uuid.status_code, status.HTTP_404_NOT_FOUND)

        # Attempt to create a review with a non-UUID string for 'course' that should trigger the ValueError
        response_course_non_uuid = self.client.post(
            reverse('review_list'),
            {
                "school": self.school.short_name,
                "course": "not-a-uuid",
                "review_text": "Invalid course identifier.",
                "term": "Fall",
                "grade_received": "B+",
                "delivery_method": "In Person",
                "helpful_count": 10,
                "year_taken": 2023,
                "textbook_required": False,
                "recommended": True
            },
            format='json'
        )
        self.assertEqual(response_course_non_uuid.status_code, status.HTTP_400_BAD_REQUEST)

        # Attempt to create a review with a UUID that does not correspond to an existing school and course
        response_invalid_uuid = self.client.post(
            reverse('review_list'),
            {
                "school": uuid.uuid4(),  # Generates a valid UUID that does not exist in the database
                "course": uuid.uuid4(),
                "review_text": "Non-existent school UUID.",
                "term": "Fall",
                "grade_received": "B+",
                "delivery_method": "In Person",
                "helpful_count": 10,
                "year_taken": 2023,
                "textbook_required": True,
                "recommended": True

            },
            format='json'
        )
        self.assertEqual(response_invalid_uuid.status_code, status.HTTP_404_NOT_FOUND)

        # Attempt to create a review with a school 'short_name' that does not exist
        response_invalid_short_name = self.client.post(
            reverse('review_list'),
            {
                "school": "invalid-short-name",
                "course": "invalid course",
                "review_text": "Non-existent school short name.",
                "term": "Fall",
                "grade_received": "B+",
                "delivery_method": "In Person",
                "helpful_count": 10,
                "year_taken": 2023,
                "textbook_required": False,
                "recommended": True
            },
            format='json'
        )
        self.assertEqual(response_invalid_short_name.status_code, status.HTTP_404_NOT_FOUND)

        response_missing_school_data = self.client.post(
            reverse('review_list'),
            {
                # missing the school field
                "course": [self.course.subject + " " + self.course.catalog_number],
                "review_text": "Review with incomplete data.",
                "term": "Spring",
                "grade_received": "A",
                "delivery_method": "Online",
                "helpful_count": 15,
                "year_taken": 2023,
                "textbook_required": False,
                "recommended": True
            },
            format='json'
        )
        self.assertEqual(response_missing_school_data.status_code, status.HTTP_400_BAD_REQUEST)

        response_missing_course_data = self.client.post(
            reverse('review_list'),
            {
                "school": self.school.short_name,
                # missing the course field
                "review_text": "Review with incomplete data.",
                "term": "Spring",
                "grade_received": "A",
                "delivery_method": "Online",
                "helpful_count": 15,
                "year_taken": 2023,
                "textbook_required": False,
                "recommended": True
            },
            format='json'
        )
        self.assertEqual(response_missing_course_data.status_code, status.HTTP_400_BAD_REQUEST)

        print('Response Data:', response_missing_course_data.data)

    def test_should_list_all_reviews(self):
        test_data = {
            "school": self.school.id,
            "course": [self.course.subject + " " + self.course.catalog_number],
            "review_text": "This is a sample review.",
            "term": "Fall",
            "grade_received": "B+",
            "delivery_method": "In Person",
            "helpful_count": 10,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        self.client.post(reverse('review_list'), test_data, format='json')

        response = self.client.get(reverse('review_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_reviews_by_school_short_name(self):
        # Creating multiple reviews for the school
        for i in range(5):
            Review.objects.create(
                school=self.school,
                course=self.course,  # Directly pass the Course instance
                review_text=f"This is review number {i}",
                term="Fall",
                grade_received="A",
                delivery_method="In Person",
                helpful_count=i,
                year_taken=2023,
                textbook_required=False,
                recommended=True
            )

        # Checking if the reviews were created successfully
        self.assertEqual(Review.objects.filter(school=self.school).count(), 5)

        # Testing the existing reviews for a school with the given short_name.
        response = self.client.get(reverse('school_reviews', kwargs={
                                'short_name': self.school.short_name}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data['data']), 5)

        for i, review_data in enumerate(response.data['data']):
            self.assertIn(
                f"This is review number {i}", review_data['review_text'])

        # Checking GET request with an ID that doesn't exist to make sure it returns a 404
        invalid_short_name = 'RS'
        response = self.client.get(reverse('school_reviews', kwargs={
                                'short_name': invalid_short_name}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_should_return_one_review(self):
        test_data = {
            "school": self.school.id,
            "course": self.course.subject + " " + self.course.catalog_number,
            "review_text": "This is a sample review.",
            "term": "Summer",
            "grade_received": "A-",
            "delivery_method": "Hybrid",
            "helpful_count": 5,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }

        # POST request to create a new review
        post_response = self.client.post(
            reverse('review_list'), test_data, format='json')
        self.assertEqual(post_response.status_code,
                         status.HTTP_201_CREATED, post_response.data)

        # getting the review ID from the response
        review_id = str(post_response.data['data']['id'])

        # GET request to retrieve the created review by ID
        response = self.client.get(
            reverse('review_detail', kwargs={'review_id': review_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(
            response.data.get('review_text') or response.data['data']['review_text'], test_data['review_text'])

        # Checking GET request with an ID that doesn't exist to make sure it returns a 404
        non_existent_id = '00000000-0000-0000-0000-000000000000'
        response = self.client.get(
            reverse('review_detail', kwargs={'review_id': non_existent_id}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_should_update_review(self):
        test_data = {
            "school": self.school.id,
            "course": self.course.id,
            "review_text": "This is a sample review.",
            "term": "Spring",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 8,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        post_response = self.client.post(
            reverse('review_list'), test_data, format='json')

        review_id = post_response.data['data']['id']

        # testing updating the specific review
        update_data = {
            "school": self.school.id,
            "course": [self.course.subject + " " + self.course.catalog_number],
            "review_text": "This is an updated review.",
            "term": "Spring",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 20,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['data']['review_text'], update_data['review_text'])

        # Checking PUT request with an ID that doesn't exist to make sure it returns a 404
        non_existent_id = '00000000-0000-0000-0000-000000000000'
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': non_existent_id}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # testing invalid data
        invalid_update_data = {
            "school": self.school.id,
            "course": self.course.subject + " " + self.course.catalog_number,
            "review_text": "This is a sample update review",
            "term": "Invalid Term",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 20,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), invalid_update_data, format='json')

        # 400 BAD REQUEST for invalid data
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Update review using school's short_name
        update_data_short_name = {
            "school": self.school.short_name,  # Use short_name instead of UUID
            "course": [self.course.subject + " " + self.course.catalog_number],
            "review_text": "Updated review with school's short_name",
            "term": "Fall",
            "grade_received": "A+",
            "delivery_method": "Online",
            "helpful_count": 89,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        response_short_name = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data_short_name, format='json'
        )
        self.assertEqual(response_short_name.status_code, status.HTTP_200_OK)

        # Update review using invalid school identifier
        update_data_invalid_school = {
            "school": "invalid-school-id",
            "course": [self.course.subject + " " + self.course.catalog_number],
            "review_text": "Update attempt with invalid school identifier",
            "term": "Spring",
            "grade_received": "C-",
            "delivery_method": "Online",
            "helpful_count": 32,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }
        response_invalid_school = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data_invalid_school, format='json'
        )
        self.assertEqual(response_invalid_school.status_code, status.HTTP_404_NOT_FOUND)

        # Create a course with this UUID to ensure it exists in the database
        course_uuid = uuid.uuid4()
        Course.objects.create(
                id=course_uuid,
                school=self.school,
                subject="TS",
                catalog_number="102",
                title="Test Course"
        )

        # Update review using valid UUID for course
        update_data_valid_uuid_course = {
            "school": self.school.id,
            "course": course_uuid,
            "review_text": "Update attempt with valid course UUID",
            "term": "Summer",
            "grade_received": "A",
            "delivery_method": "Hybrid",
            "helpful_count": 25,
            "year_taken": 2023,
            "textbook_required": True,
            "recommended": False
        }

        response_valid_uuid_course = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data_valid_uuid_course, format='json'
        )

        self.assertEqual(response_valid_uuid_course.status_code, status.HTTP_200_OK)
        self.assertIn("Update attempt with valid course UUID", response_valid_uuid_course.data['data']['review_text'])

        # Update review using invalid course identifier
        update_data_invalid_course = {
            "school": self.school.short_name,
            "course": "invalid-course-id",
            "review_text": "Update attempt with invalid course identifier",
            "term": "Fall",
            "grade_received": "B-",
            "delivery_method": "Online",
            "helpful_count": 21,
            "year_taken": 2023,
            "textbook_required": True,
            "recommended": False
        }
        response_invalid_course = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data_invalid_course, format='json'
        )
        self.assertEqual(response_invalid_course.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_not_update_review_with_invalid_school_id(self):
        test_data = {
            "school": self.school.id,
            "course": self.course.subject + " " + self.course.catalog_number,
            "review_text": "This is a review for an update test.",
            "term": "Spring",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 8,
            "year_taken": 2023,
            "textbook_required": True,
            "recommended": False
        }
        post_response = self.client.post(reverse('review_list'), test_data, format='json')
        review_id = post_response.data['data']['id']

        # update data with an invalid school identifier
        invalid_school_identifier = "not-valid-uuid-or-shortname"
        update_data = {
            "school": invalid_school_identifier,
            "course": self.course.subject + " " + self.course.catalog_number,
            "review_text": "Attempt to update with invalid school identifier.",
            "term": "Spring",
            "grade_received": "B+",
            "delivery_method": "Online",
            "helpful_count": 10,
            "year_taken": 2023,
            "textbook_required": True,
            "recommended": False
        }

        # Send PUT request to update the review
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), update_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("School not found with the provided identifier.", response.data['error'])

    def test_review_validation_for_course_school_mismatch(self):
        # Creating another school
        new_school = School.objects.create(
            long_name="New Test School", short_name="NTS", city="New City",
            state="New State", country="New Country"
        )

        # Creating a course for the new school
        new_school_course = Course.objects.create(
            school=new_school,
            subject="TSC",
            catalog_number="102",
            title="Test Course 2"
        )

        # Attempting to create a review with a mismatch between school and course
        test_data = {
            "school": self.school.id,
            "course": new_school_course.id,
            "review_text": "Wrong School and Course mapping",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 135,
            "year_taken": 2023,
            "textbook_required": False,
            "recommended": True
        }

        response = self.client.post(reverse('review_list'), test_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("The course must be from the selected school.", str(response.data))

    def test_should_delete_review(self):
        test_data = {
            "school": self.school.id,
            "course": self.course.subject + " " + self.course.catalog_number,
            "review_text": "This is another sample review",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "In Person",
            "helpful_count": 12
        }
        post_response = self.client.post(
            reverse('review_list'), test_data, format='json')

        review_id = post_response.data['data']['id']

        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)

        # Deleting the review
        delete_response = self.client.delete(
            reverse('review_detail', kwargs={'review_id': review_id}))
        self.assertEqual(delete_response.status_code,
                         status.HTTP_204_NO_CONTENT)

        # GET the same review and expect a 404 NOT FOUND
        get_response = self.client.get(
            reverse('review_detail', kwargs={'review_id': review_id}))
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

        # Delete with a non-existent review UUID
        non_existent_id = '00000000-0000-0000-0000-000000000000'
        response_non_existent = self.client.delete(
            reverse('review_detail', kwargs={'review_id': non_existent_id}))
        self.assertEqual(response_non_existent.status_code,
                         status.HTTP_404_NOT_FOUND)


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

