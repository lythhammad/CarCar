from django.urls import path
from .views import complete_appointment, api_list_technicians, api_list_appointments, api_list_appointment


urlpatterns = [
    path("appointments", api_list_appointments, name="appointments"),
    path("appointments/<int:id>", api_list_appointment, name="appointments"),
    path("appoimtments/<int:id>/complete", complete_appointment, name="appointments"),
    path("technicians", api_list_technicians, name="technicians"),
    path("technicians/<int:id>", api_list_technicians, name="technicians"),
]
