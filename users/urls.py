from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    PromoteToAdminView
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('promote/<int:user_id>/', PromoteToAdminView.as_view()),
]