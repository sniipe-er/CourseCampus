from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role='student', **extra_fields):
        if not email:
            raise ValueError("Email is required")

        if role not in ['student', 'instructor']:
            raise ValueError("Invalid role for public registration")

        user = self.model(
            email=self.normalize_email(email),
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, password):
        user = self.model(
            email=self.normalize_email(email),
            role='admin',
            is_staff=True,
            is_superuser=True
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_owner(self, email, password):
        user = self.model(
            email=self.normalize_email(email),
            role='owner',
            is_staff=True,
            is_superuser=True
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
        ('student', 'Student'),
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return f"{self.email} ({self.role})"