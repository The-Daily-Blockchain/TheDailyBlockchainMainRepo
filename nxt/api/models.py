from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from tinymce.models import HTMLField
from cloudinary.models import CloudinaryField
from autoslug import AutoSlugField


class User (AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = CloudinaryField('images')
    profile_content = models.TextField(null=True, blank=True)
    nickname = models.CharField(max_length=70, null=True, blank=True)

    def __str__(self):
        return self.user.username


class Article(models.Model):
    id = models.UUIDField(primary_key=True, unique=True,
                          default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = HTMLField()
    image = CloudinaryField('images', null=False)
    time_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_article")
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Post(models.Model):
    id = models.UUIDField(primary_key=True, unique=True,
                          default=uuid.uuid4, editable=False)
    title_post = models.CharField(max_length=200)
    content_post = HTMLField()
    image_post = CloudinaryField('images', null=False)
    time_created_post = models.DateTimeField(auto_now_add=True)
    author_post = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_post")
    archived_post = models.BooleanField(default=False)

    def __str__(self):
        return self.title_post


class CryptoDetail(models.Model):
    title = models.CharField(unique=True, max_length=100)
    slug = AutoSlugField(unique=True, populate_from='title')
    description = HTMLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CryptoPost(models.Model):
    title = models.CharField(unique=False, max_length=100)
    slug = AutoSlugField(unique=False, populate_from='title')
    description = HTMLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
