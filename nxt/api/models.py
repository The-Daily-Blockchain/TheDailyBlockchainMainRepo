from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid
from django.conf import settings

# Create your models here.

class User (AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.CharField(max_length=1000, null=True, blank=True)
    profile_content = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user



class Article(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.CharField(max_length=5000)
    time_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_article")
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    



class Post(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    title_post = models.CharField(max_length=200)
    content_post = models.TextField()
    image_post = models.CharField(max_length=5000)
    time_created_post = models.DateTimeField(auto_now_add=True)
    author_post = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")
    archived_post = models.BooleanField(default=False)

    def __str__(self):
        return self.title_post
    