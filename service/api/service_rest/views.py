import json
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, Appointment
from django.views.decorators.http import require_http_methods


class TechnicianEncoder(ModelEncoder):
    model = Technician
    property = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEnocoder(ModelEncoder):
    model = Appointment
    property = [
        "vin",
        "custamer",
        "date_time",
        "technician",
        "reason",
    ]
    encoders = {"technician": TechnicianEncoder()}
