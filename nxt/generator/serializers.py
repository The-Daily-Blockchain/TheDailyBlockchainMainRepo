from rest_framework import serializers
from .models import Daily


class CryptoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily
        fields = ['id', 'title', 'generate_tracker', 'created_at']


class CryptoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily
        fields = '__all__'
