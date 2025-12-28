from django.urls import path
from .views import (
    CourseListCreateView,
    CourseDetailView,
    PublicCourseListView,
    LessonListCreateView
)

urlpatterns = [
    path('', PublicCourseListView.as_view(), name='course-list'),
    path('me/', CourseListCreateView.as_view(), name='my-courses'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('<int:course_id>/lessons/', LessonListCreateView.as_view(), name='course-lessons'),
]