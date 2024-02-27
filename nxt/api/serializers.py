from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Article, Post
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
    image = serializers.CharField()
    time_created = serializers.DateTimeField()

    def to_representation(self, instance):
        if isinstance(instance, Article):
            return {
                'id': instance.id,
                'title': instance.title,
                'content': instance.content,
                'author': UserSerializer(instance.author).data,
                'image': instance.image,
                'time_created': instance.time_created,
            }
        elif isinstance(instance, Post):
            return {
                'id': instance.id,
                'title': instance.title_post,
                'content': instance.content_post,
                'author': UserSerializer(instance.author_post).data,
                'image': instance.image_post,
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
    class Meta:
        model = Profile
        fields = '__all__'


class ArticleSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)


class PostSerializer(ModelSerializer):
    author_post = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        validated_data['author_post'] = self.context['request'].user
        return super().create(validated_data)
