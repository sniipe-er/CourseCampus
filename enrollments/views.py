from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Enrollment
from .serializers import EnrollmentSerializer
from courses.models import Course
from users.permissions import IsStudent

# Student enrolls in a course
class EnrollView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )

        if not created:
            return Response(
                {"detail": "Already enrolled"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"detail": "Enrolled successfully"},
            status=status.HTTP_201_CREATED
        )


# Student views enrolled courses
class MyEnrollmentsView(ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)
