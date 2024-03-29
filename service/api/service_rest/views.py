import json
from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
from .models import Technician, Appointment, AutomobileVO
from django.views.decorators.http import require_http_methods


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    property = [
        "id"
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEnocoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "status",
    ]
    encoders = {"technician": TechnicianEncoder()}


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEnocoder,
        )
    else:  #POST
        try:
            content = json.loads(request.body)
            id = content["technician"]
            technicians = Technician.objects.get(id=id)
            content["technician"] = technicians

            appointment = Appointment.objects.create(**content)
            appointment.create()
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Could not create the service"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "DELETE"])
def list_appointment(request, id):
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
def finished_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "finished"
            appointment.finished()
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "canceled"
            appointment.cancel()
            return JsonResponse(
                appointment,
                encoder=AppointmentEnocoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "POST":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
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
            encoder=TechnicianEncoder
        )


@require_http_methods(["GET", "DELETE"])
def list_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Dose not exist"})
            response.status_code = 404
            return response
    else:    #Delet
        try:
            count, _ = Technician.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "dose not exist"})


@require_http_methods(["GET"])
def api_vin(request):
    if request == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder,
        )
    else:
        response = JsonResponse(
            {"message": "Could not create vin"}
        )
        response.status_code = 400
        return response
