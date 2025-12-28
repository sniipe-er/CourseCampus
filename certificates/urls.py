from django.urls import path
from .views import MyCertificatesView

urlpatterns = [
    path('me/', MyCertificatesView.as_view(), name='my-certificates'),
]