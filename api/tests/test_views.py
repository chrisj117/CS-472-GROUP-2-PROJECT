from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from school.models import School
from review.models import Review


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
        # Creating a school object for the tests
        self.school = School.objects.create(
            long_name="Test School", short_name="TS", city="Test City",
            state="Test State", country="Test Country")

    def test_should_create_review(self):
        test_data = {
            "school": self.school.id,
            "review_text": "This is a sample review.",
            "term": "Spring",
            "grade_received": "A",
            "delivery_method": "Online",
            "helpful_count": 15
        }

        response = self.client.post(
            reverse('review_list'), test_data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.data)

        created_review_data = response.data['data']
        self.assertEqual(created_review_data.get('review_text'),
                         test_data['review_text'], response.data)

        # print('Response Data:', response.data)

    def test_should_list_all_reviews(self):
        test_data = {
            "school": {
                "name": "Test School",
                "short_name": "TS"
            },
            "review_text": "This is a sample review.",
            "term": "Fall",
            "grade_received": "B+",
            "delivery_method": "In Person",
            "helpful_count": 10
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
                review_text=f"This is review number {i}",
                term="Fall",
                grade_received="A",
                delivery_method="In Person",
                helpful_count=i
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
            "review_text": "This is a sample review.",
            "term": "Summer",
            "grade_received": "A-",
            "delivery_method": "Hybrid",
            "helpful_count": 5
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
            "review_text": "This is a sample review.",
            "term": "Spring",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 8
        }
        post_response = self.client.post(
            reverse('review_list'), test_data, format='json')

        review_id = post_response.data['data']['id']

        # testing updating the specific review
        update_data = {
            "school": self.school.id,
            "review_text": "This is an updated review.",
            "term": "Spring",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 20
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
            "review_text": "This is a sample update review",
            "term": "Invalid Term",
            "grade_received": "B",
            "delivery_method": "Online",
            "helpful_count": 20
        }
        response = self.client.put(
            reverse('review_detail', kwargs={'review_id': review_id}), invalid_update_data, format='json')

        # 400 BAD REQUEST for invalid data
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_delete_review(self):
        test_data = {
            "school": self.school.id,
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

