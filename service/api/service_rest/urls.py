from django.urls import path

from .views import (
    api_list_technician,
    api_show_technician,
    api_list_service,
    api_show_service,
)


urlpatterns = [
    path("technician/", api_list_technician, name="api_technician"),
    path("technician/<int:pk>/", api_show_technician, name="api_show_technician"),
    path("service/", api_list_service, name="api_technician"),
    path("service/<int:pk>/", api_show_service, name="api_show_technician")
]
