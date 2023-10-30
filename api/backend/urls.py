from django.urls import path
from django.contrib import admin
from rest_framework import routers
from school import views as school_views
from django.conf.urls import handler400, handler403, handler404, handler500
from utils.views import error_404, error_500




router = routers.DefaultRouter()

urlpatterns = router.urls
base_url = 'api/v1'

# handler404 = error_404
# handler500 = error_500
handler404
handler500

urlpatterns += [
    path('admin/', admin.site.urls),
    path(f'{base_url}/school/', school_views.SchoolAPIView.as_view()),
    path(f'{base_url}/school/<str:short_name>/', school_views.SchoolAPIView.as_view()),
]
