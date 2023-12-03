from .test_setup import TestSetUp
from ..models import User
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
import jwt


class TestViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, 400)

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_url, self.user_data, format="json")
        self.assertEqual(res.data['email'], self.user_data['email'])
        self.assertEqual(res.data['username'], self.user_data['username'])
        self.assertEqual(res.status_code, 201)

    def test_user_cannot_login_with_unverified_email(self):
        self.client.post(
            self.register_url, self.user_data, format="json")
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 401)

    def test_user_can_login_after_verification(self):
        response = self.client.post(
            self.register_url, self.user_data, format="json")
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 200)

    # def test_user_can_verify_account(self):
    #     response = self.client.post(
    #         self.register_url, self.user_data, format="json")
    #     email = response.data['email']
    #     user = User.objects.get(email=email)
    #     token = RefreshToken.for_user(user).access_token
    #     res = self.client.get(f'{self.email_verify_url}?token={token}')
    #     user = User.objects.get(email=email)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertTrue(user.is_verified)
    
    def test_invalid_token_should_return_error(self):
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC'
        res = self.client.get(f'{self.email_verify_url}?token={token}')
        self.assertEqual(res.status_code, 301)

    def test_expired_token_should_return_error(self):
        response = self.client.post(
            self.register_url, self.user_data, format="json")
        email = response.data['email']
        user = User.objects.get(email=email)

        now = datetime.utcnow()
        exp = now - timedelta(days=5)
        iat = now
        token = jwt.encode({'email': user.email, 'exp': exp, 'iat': iat}, settings.SECRET_KEY)
        res = self.client.get(f'{self.email_verify_url}?token={token}')
        self.assertEqual(res.status_code, 301)

    def test_user_can_logout(self):
        response = self.client.post(
        self.register_url, self.user_data, format="json")
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        res = self.client.post(self.login_url, self.user_data, format="json")
        refresh_token = res.data['tokens']['refresh']
        access_token = res.data['tokens']['access']
        self.assertEqual(res.status_code, 200)
        # logout user
        data = {
            "refresh": refresh_token
        }
        res = self.client.post(self.logout, data, format="json", HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(res.status_code, 204)

