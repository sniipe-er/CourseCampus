"""
URL configuration for CourseCampus project.
"""

from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path("api/auth/jwt/create/", TokenObtainPairView.as_view(), name="jwt-create"),
    path("api/auth/jwt/refresh/", TokenRefreshView.as_view(), name="jwt-refresh"),
    path("api/courses/", include("courses.urls")),
    path("api/enrollments/", include("enrollments.urls")),
    path("api/assignments/", include("assignments.urls")),
    path("api/certificates/", include("certificates.urls")),
    re_path(
        r"^(?!api/|admin/|static/|assets/).*$",
        TemplateView.as_view(template_name="index.html"),
        name="frontend",
    ),
]
