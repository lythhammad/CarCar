from django.urls import path
from .views import list_technicians, list_appointments, list_appointment, list_technician, finished_appointment, cancel_appointment, api_vin


urlpatterns = [
    path("appointments", list_appointments, name="appointments"),
    path("appointments/<int:id>", list_appointment, name="appointment"),
    path("appointments/<int:id>/finish", finished_appointment, name="appointments"),
    path("appointments/<int:id>/cancel", cancel_appointment, name="appointments"),
    path("technicians", list_technicians, name="technicians"),
    path("technicians/<int:id>", list_technician, name="technicians"),
    path("vin/", api_vin, name="vin")
]
