from django.urls import path
from .views import complete_appointment, list_technicians, list_appointments, list_appointment, list_technician


urlpatterns = [
    path("appointments", list_appointments, name="appointments"),
    path("appointments/<int:id>", list_appointment, name="appointment"),
    path("appointments/<int:id>/finish", complete_appointment, name="appointments"),
    path("appointments/<int:id>/cancel", complete_appointment, name="appointments"),
    path("technicians", list_technicians, name="technicians"),
    path("technicians/<int:id>", list_technician, name="technicians"),
]
