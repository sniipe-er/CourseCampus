from enrollments.models import Enrollment
from assignments.models import Assignment, Submission
from certificates.models import Certificate

def check_and_complete_course(student, course):
    assignments = Assignment.objects.filter(lesson__course=course)

    if not assignments.exists():
        return False

    submissions_count = Submission.objects.filter(
        student=student,
        assignment__in=assignments
    ).count()

    if submissions_count == assignments.count():
        enrollment = Enrollment.objects.get(student=student, course=course)
        enrollment.status = 'completed'
        enrollment.save()

        Certificate.objects.get_or_create(
            student=student,
            course=course
        )
        return True

    return False
