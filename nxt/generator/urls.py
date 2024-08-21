from django.urls import path
from .views import GetAllCryptoTitleView, GetSpecificCryptoListView, GetSpecificCryptoDetailsView

urlpatterns = [
    path('signals/cryptolist/', GetAllCryptoTitleView.as_view(),
         name='get_all_crypto_title'),
    path('signals/cryptolist/<str:title>/',
         GetSpecificCryptoListView.as_view(), name='get_specific_crypto_list'),
    path('signals/cryptolist/detail/<str:generate_tracker>/',
         GetSpecificCryptoDetailsView.as_view(), name='get_specific_crypto_details'),
]
