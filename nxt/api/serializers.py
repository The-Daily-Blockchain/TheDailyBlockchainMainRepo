from rest_framework.serializers import ModelSerializer
from .models import CryptoPost, User, Profile, Article, Post, CryptoDetail
from rest_framework import serializers
from django.contrib.auth import authenticate


class UserSerializer(ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password',
                  'password_confirm', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        password_confirm = validated_data.pop('password_confirm')
        if password != password_confirm:
            raise serializers.ValidationError(
                {'password': 'Passwords do not match'})
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CombinedSerializer(serializers.Serializer):

    id = serializers.UUIDField()
    title = serializers.CharField()
    content = serializers.CharField()
    author = UserSerializer()
    image = serializers.SerializerMethodField()
    time_created = serializers.DateTimeField()

    def get_image_url(self, instance):
        if hasattr(instance, 'image') and instance.image:
            return instance.image.url
        elif hasattr(instance, 'image_post') and instance.image_post:
            return instance.image_post.url
        else:
            return None

    def to_representation(self, instance):
        if isinstance(instance, Article):
            return {
                'id': instance.id,
                'title': instance.title,
                'content': instance.content,
                'author': UserSerializer(instance.author).data,
                'image': self.get_image_url(instance),
                'time_created': instance.time_created,
            }
        elif isinstance(instance, Post):
            return {
                'id': instance.id,
                'title': instance.title_post,
                'content': instance.content_post,
                'author': UserSerializer(instance.author_post).data,
                'image': self.get_image_url(instance),
                'time_created': instance.time_created_post,
            }
        else:
            raise Exception("Unsupported object type for serialization")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError(
                        'User account is disabled.')
            else:
                raise serializers.ValidationError(
                    'Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError(
                'Must include "username" and "password".')

        return data


class LogoutSerializer(serializers.Serializer):
    pass


class ProfileSerializer(ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    first_name = serializers.CharField(
        source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

# this fix the res whole link
    def get_profile_image(self, obj):
        return obj.profile_image.url

    class Meta:
        model = Profile
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profile_image'] = self.get_profile_image(instance)
        return data


class ArticleSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if isinstance(obj.image, str):
            return obj.image
        if obj.image:
            return obj.image.url
        else:
            return None

    def create(self, validated_data):
        image_url = validated_data.pop('image', None)
        article = Article.objects.create(**validated_data)
        if image_url:
            article.image = image_url
            article.save()

        return article

    class Meta:
        model = Article
        fields = '__all__'

    # def create(self, validated_data):
    #     validated_data['author'] = self.context['request'].user
    #     return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = self.get_image(instance)
        return data


class PostSerializer(ModelSerializer):
    author_post = UserSerializer(read_only=True)
    image_post = serializers.SerializerMethodField()

    def get_image_post(self, obj):
        if isinstance(obj.image_post, str):
            return obj.image_post
        if obj.image_post:
            return obj.image_post.url
        else:
            return None

    def create(self, validated_data):
        image_post_url = validated_data.pop('image_post', None)
        post = Post.objects.create(**validated_data)
        if image_post_url:
            post.image_post = image_post_url
            post.save()

        return post

    class Meta:
        model = Post
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image_post'] = self.get_image_post(instance)
        return data


class CryptoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoDetail
        fields = '__all__'


class CryptoListPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    profile = ProfileSerializer(source='author.profile', read_only=True)

    class Meta:
        model = CryptoPost
        fields = '__all__'
