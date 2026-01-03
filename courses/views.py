from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Course, Lesson
from .serializers import CourseSerializer, LessonSerializer
from users.permissions import IsInstructor
from enrollments.models import Enrollment

class PublicCourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseListCreateView(ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CourseDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

class LessonListCreateView(ListCreateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']

        if self.request.user.role == 'student':
            if not Enrollment.objects.filter(
                student=self.request.user,
                course_id=course_id
            ).exists():
                raise PermissionDenied("You are not enrolled in this course")

        return Lesson.objects.filter(course_id=course_id)

    def perform_create(self, serializer):
        if self.request.user.role != 'instructor':
            raise PermissionDenied("Only instructors can add lessons")

        serializer.save(course_id=self.kwargs['course_id'])
