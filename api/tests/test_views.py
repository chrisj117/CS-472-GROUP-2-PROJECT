from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


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
        response = self.client.post(reverse('schools'), test_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_should_list_all_schools(self):

        response = self.client.get(reverse('schools'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(len(response.data),0)
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
        response = self.client.get(reverse('school', kwargs={'short_name':"TEST"}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['short_name'],'TEST')
        # try to get a school that doesn't exit
        response = self.client.get(reverse('school', kwargs={'short_name':"TEST123"}))
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
        response = self.client.put(reverse('school', kwargs={'short_name':"TEST"}), update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['city'], 'Updated')
        self.assertEqual(response.data['data']['website'], 'https://update.university.edu')
        
        response = self.client.put(reverse('school', kwargs={'short_name':"TEST"}), update_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.put(reverse('school', kwargs={'short_name':"TEST123"}), update_data)
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
        response = self.client.delete(reverse('school', kwargs={'short_name':"TEST"}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(response.data['data']), 0)
        # try to delete to a school that doesn't exist
        response = self.client.delete(reverse('school', kwargs={'short_name':"TEST"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

    # should delete a school request
    def test_should_delete_school_request(self):
        test_data = {
            "school_name" : "TEST_U",
            "website" : "https://www.test-university.com"
        }
        # create school request
        response = self.client.post(reverse('schoolrequest'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # delete it
        response = self.client.delete(reverse('schoolrequest', kwargs={'school_name':"TEST_U"}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(response.data['data']), 0)
        # try to delete a school request that doesnt exist
        response = self.client.delete(reverse('schoolrequest', kwargs={'short_name':"TEST"}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(len(response.data['data']), 0)

    # should get all school requests
    def test_should_get_all_school_requests(self):

        response = self.client.get(reverse('schoolrequest'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(len(response.data), 0)
        self.assertIsInstance(response.data['data'], list)

    # should get a school request
    def test_should_get_one_school_requests(self):
        test_data = {
            "school_name" : "TEST_U",
            "website" : "https://www.test-university.com"
        }

        response = self.client.post(reverse('schoolrequest'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(reverse('schoolrequest', kwargs={'school_name':"TEST_U"}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['school_name'],'TEST_U')
        # Attempt to get a school that isnt in database
        response = self.client.get(reverse('schoolrequest', kwargs={'school_name':"NOT_A_UNIVERSITY"}))
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
        response = self.client.post(reverse('schoolrequest'), test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Make sure a bad request returns a bad request code
        response = self.client.post(reverse('schoolrequest'), test_data_with_missing_required_field)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)