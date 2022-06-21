from django.urls import path 
from .views import(
    api_sales,
    api_customers,
    api_records
)
urlpatterns = [
    path('sales/', api_sales, name= "api_sales"),
    path('customers/', api_customers, name= "api_customers"), 
    path('records/', api_records, name= "api_records"),  
]