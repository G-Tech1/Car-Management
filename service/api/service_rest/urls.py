from django.urls import path

from .views import (
    api_list_technician,
    api_show_technician,
    api_list_service,
    api_show_service,
    api_cancel_service,
    api_complete_service,
    api_submitted_service
)


urlpatterns = [
    path("technician/", api_list_technician, name="api_technician"),
    path("technician/<int:pk>/", api_show_technician, name="api_show_technician"),
    path("service/", api_list_service, name="api_list_service"),
    path("service/submitted/", api_submitted_service, name="api_submitted_service"),
    path("service/<int:pk>/", api_show_service, name="api_show_service"),
    path("service/<int:pk>/complete/", api_complete_service, name="api_complete_service"),
    path("service/<int:pk>/cancel/", api_cancel_service, name="api_cancel_service")
]
