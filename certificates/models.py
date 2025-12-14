from django.db import models
from django.db import models
from django.conf import settings
from courses.models import Course

# Create your models here.

User = settings.AUTH_USER_MODEL

class Certificate(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='certificates'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )
    issue_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.course}"
