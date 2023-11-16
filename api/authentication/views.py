from django.shortcuts import render
from rest_framework import generics,status, views
from .serializers import RegisterSerializer, EmailVerificationSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRender


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
            <h2 style='color: #344054;'>Welcome to MyCourseEvaluation, Daniel</h2>
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
                     Reply to this email to contact us. <a href="" style='text-decoration: none; font-size:12px; color:dodgerblue'>Unsubscribe</a></div>
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
            payload = jwt.decode(token, settings.SECRET_KEY, verify=False)
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()

            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as e:
            return Response({'erorr': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e:
            return Response({'erorr': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)