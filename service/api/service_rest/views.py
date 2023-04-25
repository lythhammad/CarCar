import json
from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
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


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEnocoder,
        )
    else:  #POST
        try:
            content = json.loads(request.body)

            employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=employee_id)
            content["technican"] = technician

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not create the service"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_list_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Dose not exist"})
            response.status_code = 404
            return response
    else:    #Delet
        try:
            count, _ = Appointment.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "dose not exist"})


@require_http_methods(["PUT"])
def complete_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.complete_service()
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Dose not exist"})


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "POST":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Could not create the technician"}
                )
            response.status_code = 400
            return response
    elif request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
