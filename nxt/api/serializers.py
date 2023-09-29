from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Article, Post
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        password_confirm = validated_data.pop('password_confirm')
        if password != password_confirm:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, data):
#         user = authenticate(username=data['username'], password=data['password'])
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Incorrect Credentials")

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
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return data


class LogoutSerializer(serializers.Serializer):
    pass

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ArticleSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)
    # id = serializers.UUIDField(format='hex', read_only=True)

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