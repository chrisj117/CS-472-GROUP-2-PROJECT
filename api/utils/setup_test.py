from rest_framework.test import APITestCase

class TestSetUp(APITestCase):
    def setUp(self) -> None:
        print("Test started")
        return super().setUp()
    
    def tearDown(self) -> None:
        print("Test finished")
        return super().tearDown()