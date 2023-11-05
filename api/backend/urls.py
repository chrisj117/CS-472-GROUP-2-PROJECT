from django.urls import path
from django.contrib import admin
from rest_framework import routers
from school import views as school_views
from requestschool import views as request_school_views
from django.conf.urls import handler400, handler403, handler404, handler500


router = routers.DefaultRouter()

urlpatterns = router.urls
base_url = 'api/v1'

# handler404 = error_404
# handler500 = error_500
handler404
handler500

urlpatterns += [
    path('admin/', admin.site.urls),
    path(f'{base_url}/school/', school_views.SchoolAPIView.as_view(), name='schools'),
    path(f'{base_url}/school/<str:short_name>/', school_views.SchoolAPIView.as_view(), name='school'),
    path(f'{base_url}/request-school/', request_school_views.RequestSchoolAPIView.as_view(), name='school_requests'),
    path(f'{base_url}/request-school/<str:school_name>/', request_school_views.RequestSchoolAPIView.as_view(), name='school_request')
]
