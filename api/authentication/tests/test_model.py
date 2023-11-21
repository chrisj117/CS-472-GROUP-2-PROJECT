from .test_setup import TestSetUp
from ..models import User


class TestModel(TestSetUp):

    def test_should_create_user(self):
        user =  User.objects.create_user(
            self.user_data['username'],
            self.user_data['email'],
            self.user_data['password']
        )
        self.assertEqual(str(user), self.user_data['email'])

    def test_should_create_superuser(self):
        user =  User.objects.create_superuser(
            self.user_data['username'],
            self.user_data['email'],
            self.user_data['password']
        )
        self.assertIsInstance(user, User)

    def test_raises_error_when_no_superuser_password_is_supplied(self):
        self.assertRaises(TypeError, User.objects.create_superuser, 
                          username=self.user_data['username'], 
                          email=self.user_data['email'])

    def test_raises_error_when_no_username_is_supplied(self):
        self.assertRaises(ValueError, User.objects.create_user, 
                          username="", email=self.user_data['email'], 
                          password=self.user_data['password'])
        
    def test_raises_error_when_no_email_is_supplied(self):
        self.assertRaises(ValueError, User.objects.create_user, 
                          username=self.user_data['username'], email="", 
                          password=self.user_data['password'])