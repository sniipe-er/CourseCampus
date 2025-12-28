from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Certificate
from .serializers import CertificateSerializer
from users.permissions import IsStudent

# Create your views here.

class MyCertificatesView(ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Certificate.objects.filter(student=self.request.user)
