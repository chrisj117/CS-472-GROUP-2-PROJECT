from django.urls import path
from django.contrib import admin
from rest_framework import routers
from rest_framework import permissions
from school import views as school_views
from review import views as review_views
from authentication import views as authentication_views
from requestschool import views as request_school_views
from django.conf.urls import handler400, handler403, handler404, handler500

from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

schema_view = swagger_get_schema_view(
    openapi.Info(
        title='My Course Evaluation API',
        default_version='1.0.0',
        contact=openapi.Contact(email='support@mycourseevaluation.com'),
        license=openapi.License(name='MIT License'),
        description='Comphrensive Course Evaluation API documentation'
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# router = routers.DefaultRouter()

# urlpatterns = router.urls
base_url = 'api/v1'

handler404
handler500

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{base_url}/school/',
         school_views.SchoolAPIView.as_view(), name='schools'),
    path(f'{base_url}/school/<str:short_name>/',
         school_views.SchoolAPIView.as_view(), name='school'),
     path(f'{base_url}/school/<str:short_name>/courses/', school_views.CourseAPIView.as_view(), name='search_courses'),
     path(f'{base_url}/school/<str:short_name>/courses/', school_views.CourseAPIView.as_view(), name='search_courses'),

    # listing all reviews or creating a new review
    path(f'{base_url}/reviews/',
         review_views.ReviewAPIView.as_view(), name='review_list'),
    # getting, updating, or deleting a specific review
    path(f'{base_url}/reviews/<uuid:review_id>/',
         review_views.ReviewAPIView.as_view(), name='review_detail'),
    # listing reviews for a specific school (will be for courses later)
    path(f'{base_url}/school/<str:short_name>/reviews/',
         review_views.ReviewAPIView.as_view(), name='school_reviews'),
    # listing reviews for a specific course
    path(f'{base_url}/reviews/<str:short_name>/<str:course_subject_catalog>/',
         review_views.ReviewAPIView.as_view(), name='course_reviews'),
  
    path(f'{base_url}/school/', school_views.SchoolAPIView.as_view(), name='schools'),
    path(f'{base_url}/school/<str:short_name>/', school_views.SchoolAPIView.as_view(), name='school'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path(f'{base_url}/request-school/', request_school_views.RequestSchoolAPIView.as_view(), name='school_requests'),
    path(f'{base_url}/request-school/<str:school_name>/', request_school_views.RequestSchoolAPIView.as_view(), name='school_request'),
    
    # listing courses
#     path(f'{base_url}/school/<str:short_name>/<str:course_subject_catalog>/', school_views.SchoolAPIView.as_view(), name='course'),

    # authentication
    path(f'{base_url}/auth/register/', authentication_views.RegisterView.as_view(), name='register'),
    path(f'{base_url}/auth/email-verify/', authentication_views.VerifyEmail.as_view(), name='email-verify'),
    path(f'{base_url}/auth/login/', authentication_views.LoginAPIView.as_view(), name='login'),
    path(f'{base_url}/auth/logout/', authentication_views.LogoutAPIView.as_view(), name="logout"),
    path(f'{base_url}/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(f'{base_url}/auth/request-reset-email/', authentication_views.RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path(f'{base_url}/auth/password-reset/<uidb64>/<token>/',
         authentication_views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path(f'{base_url}/auth/password-reset-complete', authentication_views.SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]
