from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.views import APIView


urlpatterns = [
    # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    # path('register/', views.register, name='register'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('posts/', views.post_list.as_view(), name='posts'),
    path('profile/', views.profile, name='profile'),
    path('articles/', views.article_list.as_view(), name='article-list'),
    path('articles/<uuid:id>/', views.article_detail.as_view(), name='article-detail'),
    path('posts/', views.post_list.as_view(), name='post-list'),
    path('posts/<uuid:id>/', views.post_detail.as_view(), name='post-detail'),
    path('user/', views.UserView.as_view()),
]