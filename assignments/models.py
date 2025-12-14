from django.db import models
from django.db import models
from django.conf import settings
from courses.models import Lesson

# Create your models here.

User = settings.AUTH_USER_MODEL

class Assignment(models.Model):
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name='assignments'
    )
    instructions = models.TextField()
    due_date = models.DateField()

    def __str__(self):
        return f"Assignment for {self.lesson.title}"


class Submission(models.Model):
    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    text_answer = models.TextField(blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)
    marks = models.IntegerField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('assignment', 'student')

    def __str__(self):
        return f"{self.student} - {self.assignment}"
