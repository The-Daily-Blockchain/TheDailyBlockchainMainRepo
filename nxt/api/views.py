from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.shortcuts import render
from .models import CryptoPost, Profile, Article, Post, CryptoDetail
# rest
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework import generics, status

from rest_framework.views import APIView
from cloudinary.uploader import upload

from .serializers import CombinedSerializer, CryptoListPostSerializer, UserSerializer, ProfileSerializer, ArticleSerializer, PostSerializer, CryptoDetailSerializer, ArticleDetailSerializer, PostDetailSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse


def index(request):
    return render(request, 'frontend/build/index.html')


class LoginAPIView(ObtainAuthToken):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({'error': 'User is already authenticated.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'success': 'Logged in successfully'})
        else:
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        token = Token.objects.get(user=request.user)
        token.delete()

        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({'message': 'Successfully registered', 'token': token.key})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# wards


class article_list(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-time_created')
    serializer_class = ArticleSerializer
    authentication_classes = [TokenAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if 'image' in request.FILES:
            file = request.FILES['image']
            # Upload the file to Cloudinary
            upload_result = upload(file, folder='article_images')
            if 'secure_url' in upload_result:
                # If upload is successful, update the article object with the Cloudinary URL
                request.data['image'] = upload_result['secure_url']
            else:
                # If upload fails, return an error response
                return Response({'error': 'Failed to upload image to Cloudinary'}, status=status.HTTP_400_BAD_REQUEST)
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            article_id = response.data['id']
            article_url = f"{settings.SITE_URL}/article/{article_id}"
            return Response({'article_url': article_url}, status=status.HTTP_201_CREATED)
        return response

    def perform_create(self, serializer):
        # Save the article object with the Cloudinary URL
        instance = serializer.save(author=self.request.user)
        # Update the image field with the Cloudinary URL
        instance.image = self.request.data.get('image')
        instance.save()


class article_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer
    lookup_field = 'id'
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]


class post_list(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-time_created_post')
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if 'image' in request.FILES:
            file = request.FILES['image']
            # Upload the file to Cloudinary
            upload_result = upload(file, folder='post_images')
            if 'secure_url' in upload_result:
                # If upload is successful, update the article object with the Cloudinary URL
                request.data['image_post'] = upload_result['secure_url']
            else:
                # If upload fails, return an error response
                return Response({'error': 'Failed to upload image to Cloudinary'}, status=status.HTTP_400_BAD_REQUEST)
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            post_id = response.data['id']
            post_url = f"{settings.SITE_URL}/post/{post_id}"
            return Response({'post_url': post_url}, status=status.HTTP_201_CREATED)
        return response

    def perform_create(self, serializer):
        # Save the article object with the Cloudinary URL
        instance = serializer.save(author_post=self.request.user)
        # Update the image field with the Cloudinary URL

        instance.image_post = self.request.data.get('image_post')
        instance.save()


class post_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'id'
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]


class SearchView(generics.ListAPIView):
    serializer_class = CombinedSerializer
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        else:
            return [IsAuthenticated()]

    def get_queryset(self):
        title_query = self.request.query_params.get('title', None)
        combined_queryset = []
        if title_query:
            articles = Article.objects.filter(
                title__icontains=title_query).order_by('-time_created')
            posts = Post.objects.filter(
                title_post__icontains=title_query).order_by('-time_created_post')
            combined_queryset = list(articles) + list(posts)
        return combined_queryset


class SearchDetailView(generics.RetrieveAPIView):
    serializer_class = CombinedSerializer
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        else:
            return [IsAuthenticated()]

    def get_queryset(self):
        title_query = self.request.query_params.get('title', None)
        combined_queryset = []
        if title_query:
            combined_queryset = []
        return combined_queryset

    def get_object(self):
        obj_id = self.kwargs.get('id')
        # Try to retrieve the object from the Article model
        obj = Article.objects.filter(id=obj_id).first()
        if not obj:
            # If not found in Article model, try retrieving from the Post model
            obj = Post.objects.filter(id=obj_id).first()
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        profile = Profile.objects.get(user=request.user)
        return Response(ProfileSerializer(profile).data)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist'}, status=status.HTTP_404_NOT_FOUND)


class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CryptoDetailAPIView(generics.RetrieveAPIView):
    queryset = CryptoDetail.objects.all()
    serializer_class = CryptoDetailSerializer
    lookup_field = 'slug'
    permission_classes = []


class CryptoListPost(generics.ListCreateAPIView):
    serializer_class = CryptoListPostSerializer
    permission_classes = []

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        if slug:
            return CryptoPost.objects.filter(slug=slug)
        else:
            return CryptoPost.objects.all()


class ValidateTokenView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If the request reaches here, the token is valid
        return JsonResponse({"message": "Token is valid"}, status=200)
