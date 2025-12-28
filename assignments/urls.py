from django.urls import path
from .views import AssignmentListCreateView, SubmitAssignmentView

urlpatterns = [
    path('lesson/<int:lesson_id>/assignments/', AssignmentListCreateView.as_view()),
    path('submit/<int:assignment_id>/', SubmitAssignmentView.as_view()),
]