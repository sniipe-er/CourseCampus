from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from .permissions import IsOwner

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

class PromoteToAdminView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)

        if user.role == 'owner':
            return Response(
                {"detail": "Owner cannot be modified"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.role = 'admin'
        user.is_staff = True
        user.save()

        return Response({"detail": "User promoted to admin"})
