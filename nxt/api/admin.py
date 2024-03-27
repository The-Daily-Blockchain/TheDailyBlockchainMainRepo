from django.contrib import admin
from .models import User, Profile, Article, Post, CryptoDetail, CryptoPost
# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Article)
admin.site.register(Post)
admin.site.register(CryptoDetail)
admin.site.register(CryptoPost)
