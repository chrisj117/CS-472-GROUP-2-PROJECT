from django.shortcuts import render
from rest_framework import generics,status, views, permissions
from .serializers import RegisterSerializer, SetNewPasswordSerializer, ResetPasswordEmailRequestSerializer, EmailVerificationSerializer, LoginSerializer,LogoutSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .utils import Util
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRender
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    renderer_classes = (UserRender, )

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        user = User.objects.get(email=user_data['email'])

        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relative_link = reverse('email-verify')
        absurl = f'http://{current_site}{relative_link}?token={str(token)}'
        email_body =f"""<center style='font-family:Arial, Helvetica, sans-serif;'>
    <tr> 
        <td
            style='color: #344054; font-size: 16px; font-family:inherit; font-weight: 400; line-height: 24px; word-wrap: break-word;'>
            <br>
            <br>
            <h2 style='color: #344054;'>Welcome to MyCourseEvaluation, {user.username}</h2>
                <br />
                Your account is almost ready.
                <br /><br />
                <a href={absurl} target='_blank' style="text-decoration: none;">
                    <div
                        style='width: 20%; height: 100%; padding-left: 32px; padding-right: 32px; padding-top: 16px; padding-bottom: 16px; background: #135DFF; border-radius: 1px; justify-content: center; align-items: center; gap: 10px; display: inline-flex; border-radius: 5px 5px;'>
                        <div
                            style='text-align: center; color: white; font-size: 16px; font-weight: 400; line-height: 24px; word-wrap: break-word'>
                            Activate your Account</div>
                    </div>
                </a>
                <br />
                <br />
                You can also click or paste the following link into your browser:
                <br />
                <br />
                <a href={absurl} target='_blank' style='text-decoration: none; font-size:11px; line-height: 12px;  color:dodgerblue'>{absurl}</a>
                <br /><br />
                <div
                    style='width: 100%; opacity: 0.60; color: #344054; font-weight: 400; word-wrap: break-word'>
                    If you did not request account creation on MyCourseEvaluation, ignore this email and account will not be created.
                </div>
                <br />
                <br />
                <hr style='border-width: 1px;' />
                <div
                    style='width: 100%; opacity: 0.60; color: #344054;font-size:12px; word-wrap: break-word'>
                    Sent by MyCourseEvaluation System, CS472 Project, University of Nevada-Las Vegas. 
                     Reply to this email to contact us. <a href='' style='text-decoration: none; font-size:12px; color:dodgerblue'>Unsubscribe</a></div>
            </td>
        </tr>
    </center>"""
        
        # f'Hi {user.username} \n User the link below to verify your email. \n {absurl}'
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'MyCourseEvaluation Account Activation'}

        Util.send_email(data)
        
        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()

            return CustomRedirect(os.environ.get('FRONTEND_URL_LOGIN'))
            #return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as e:
            return CustomRedirect(f"{os.environ.get('FRONTEND_URL_LOGIN')}/token=expired")
            #return Response({'erorr': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e:
            return CustomRedirect(f"{os.environ.get('FRONTEND_URL_LOGIN')}/token=invalid")
            #return Response({'erorr': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = f'http://{current_site}{relativeLink}?redirect_url={redirect_url}'
            
            email_body = f"""<center style='font-family:Arial, Helvetica, sans-serif;'>
    <tr> 
        <td
            style='color: #344054; font-size: 16px; font-family:inherit; font-weight: 400; line-height: 24px; word-wrap: break-word;'>
            <br>
            <br>
            <h2 style='color: #344054;'>MyCourseEvaluation Password Reset</h2>
                <br />
                Click the button below to reset your password.
                <br /><br />
                <a href={absurl} target='_blank' style="text-decoration: none;">
                    <div
                        style='width: 20%; height: 100%; padding-left: 32px; padding-right: 32px; padding-top: 16px; padding-bottom: 16px; background: #135DFF; border-radius: 1px; justify-content: center; align-items: center; gap: 10px; display: inline-flex; border-radius: 5px 5px;'>
                        <div
                            style='text-align: center; color: white; font-size: 16px; font-weight: 400; line-height: 24px; word-wrap: break-word'>
                            Reset Your Password</div>
                    </div>
                </a>
                <br />
                <br />
                <div
                    style='width: 100%; opacity: 0.60; color: #344054; font-weight: 400; word-wrap: break-word'>
                    If you did not request password reset on MyCourseEvaluation, ignore this email.
                </div>
                <br />
                <br />
                <hr style='border-width: 1px;' />
                <div
                    style='width: 100%; opacity: 0.60; color: #344054;font-size:12px; word-wrap: break-word'>
                    Sent by MyCourseEvaluation System, CS472 Project, University of Nevada-Las Vegas. 
                     Reply to this email to contact us. <a href='' style='text-decoration: none; font-size:12px; color:dodgerblue'>Unsubscribe</a></div>
            </td>
        </tr>
    </center>"""
            
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect(os.environ.get('FRONTEND_URL_RESET', '')+'/?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'/?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(os.environ.get('FRONTEND_URL_RESET', '')+'/?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'/?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)



class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
    
    
class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)