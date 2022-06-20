from django.urls import path 
from .views import(
    api_sales,
)
urlpatterns = [
    path('sales/', api_sales, name= "api_sales"),   
]