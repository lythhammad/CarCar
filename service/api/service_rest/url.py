from django.urls import path
from .views import complete_appointment, api_list_technicians, api_list_appointments, api_list_appointment


urlpatterns = [
    path("appointments", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>", api_list_appointment, name="api_list_appointment"),
    path("appoimtments/<int:id>/complete", complete_appointment, name="complete_appointment"),
    path("technicians", api_list_technicians, name="api_list_technicians"),
]
