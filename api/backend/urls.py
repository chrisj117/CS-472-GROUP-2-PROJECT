from django.urls import path
from django.contrib import admin
from rest_framework import routers
from school import views as school_views
from review import views as review_views
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
    path(f'{base_url}/school/',
         school_views.SchoolAPIView.as_view(), name='schools'),
    path(f'{base_url}/school/<str:short_name>/',
         school_views.SchoolAPIView.as_view(), name='school'),

    # listing all reviews or creating a new review
    path(f'{base_url}/reviews/',
         review_views.ReviewAPIView.as_view(), name='review_list'),
    # getting, updating, or deleting a specific review
    path(f'{base_url}/reviews/<uuid:review_id>/',
         review_views.ReviewAPIView.as_view(), name='review_detail'),
    # listing reviews for a specific school (will be for courses later)
    path(f'{base_url}/school/<str:short_name>/reviews/',
         review_views.ReviewAPIView.as_view(), name='school_reviews'),
]
