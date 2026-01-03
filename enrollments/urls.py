from django.urls import path
from .views import EnrollView, MyEnrollmentsView

urlpatterns = [
    path('', MyEnrollmentsView.as_view()),
    path('enroll/<int:course_id>/', EnrollView.as_view()),
    path('my/', MyEnrollmentsView.as_view()),
]