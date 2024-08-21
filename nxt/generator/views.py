# from django.http import JsonResponse
# from django.views import View
# from django.views.generic import ListView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from .models import Daily
from .serializers import CryptoListSerializer, CryptoDetailSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'per_page'
    max_page_size = 100


class GetAllCryptoTitleView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        unique_titles = Daily.objects.values_list(
            'title', flat=True).distinct()
        return Response(list(unique_titles))


class GetSpecificCryptoListView(APIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, title, *args, **kwargs):

        queryset = Daily.objects.filter(title=title).order_by('-created_at')
        paginator = StandardResultsSetPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = CryptoListSerializer(paginated_queryset, many=True)

        response_data = {
            "items": serializer.data,
            "total": paginator.page.paginator.count,
            "page": paginator.page.number,
            "pages": paginator.page.paginator.num_pages,
        }

        return Response(response_data)


class GetSpecificCryptoDetailsView(APIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, generate_tracker, *args, **kwargs):
        try:
            detail = Daily.objects.get(generate_tracker=generate_tracker)
            serializer = CryptoDetailSerializer(detail)
            return Response(serializer.data)
        except Daily.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
