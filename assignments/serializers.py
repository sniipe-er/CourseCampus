from rest_framework import serializers
from .models import Assignment, Submission

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'lesson', 'instructions', 'due_date']
        read_only_fields = ['lesson']


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            'id',
            'assignment',
            'text_answer',
            'file_url',
            'marks',
            'submitted_at'
        ]
        read_only_fields = ['marks', 'submitted_at', 'assignment']
