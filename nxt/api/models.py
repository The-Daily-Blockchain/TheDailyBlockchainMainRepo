from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User (AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='userprofile')
    username = models.CharField(max_length=30, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    followers = models.ManyToManyField(User, related_name='following')
    image = models.CharField(max_length=1000, null=True)
    joined_date = models.DateTimeField(auto_now_add=True)
    isVerified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        self.username = self.user.username
        self.first_name = self.user.first_name
        self.last_name = self.user.last_name
        super().save(*args, **kwargs)
