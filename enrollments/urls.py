from django.urls import path
from .views import EnrollView, MyEnrollmentsView

urlpatterns = [
    path('enroll/<int:course_id>/', EnrollView.as_view(), name='enroll'),
    path('me/', MyEnrollmentsView.as_view(), name='my-enrollments'),
]