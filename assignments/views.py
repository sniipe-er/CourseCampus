from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from .models import Assignment, Submission
from .serializers import AssignmentSerializer, SubmissionSerializer
from courses.models import Lesson
from enrollments.models import Enrollment
from users.permissions import IsInstructor, IsStudent
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from certificates.utils import check_and_complete_course

# Create your views here.

class AssignmentListCreateView(ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_queryset(self):
        return Assignment.objects.filter(lesson_id=self.kwargs['lesson_id'])

    def perform_create(self, serializer):
        lesson = get_object_or_404(Lesson, id=self.kwargs['lesson_id'])

        if lesson.course.instructor != self.request.user:
            raise PermissionDenied("You do not own this course")

        serializer.save(lesson=lesson)

class SubmitAssignmentView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request, assignment_id):
        assignment = get_object_or_404(Assignment, id=assignment_id)

        if not Enrollment.objects.filter(
            student=request.user,
            course=assignment.lesson.course
        ).exists():
            raise PermissionDenied("You are not enrolled in this course")

        serializer = SubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        submission, created = Submission.objects.get_or_create(
            assignment=assignment,
            student=request.user,
            defaults=serializer.validated_data
        )

        if not created:
            return Response(
                {"detail": "Assignment already submitted"},
                status=status.HTTP_400_BAD_REQUEST
            )
 
        check_and_complete_course(
            student=request.user,
            course=assignment.lesson.course
        )

        return Response(
            SubmissionSerializer(submission).data,
            status=status.HTTP_201_CREATED
        )
