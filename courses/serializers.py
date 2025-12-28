from rest_framework import serializers
from .models import Course, Lesson
from users.models import User

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']


class CourseSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'description',
            'category',
            'instructor',
            'created_at',
            'updated_at'
        ]

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'id',
            'title',
            'content_url',
            'order_number',
            'course'
        ]
        read_only_fields = ['course']
