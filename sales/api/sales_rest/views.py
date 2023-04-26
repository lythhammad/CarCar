from django.shortcuts import render

from sales_rest.encoders import AutomobileVOEncoder, CustomerEncoder, SaleEncoder, SalespersonEncoder
from .models import AutomobileVO, Salesperson, Sale, Customer
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def api_list_AutomobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder
        )

@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople":sales_people},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create Sales Person"}
            )
            response.status_code = 404
            return response

@require_http_methods(["GET", "DELETE"])
def api_show_sales_person(request, id):
    try:
        sales_person = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Sales Person doesn't exist"},
            status=404
        )

    if request.method == "GET":
        return JsonResponse(
            sales_person,
            encoder=SalespersonEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {"message": "Sales person not deleted"},
                status=404
            )
        else:
            response = JsonResponse(
                {"message": "Sales Person deleted"},
            )
            response.status_code = 200
            return response

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        Customers = Customer.objects.all()
        return JsonResponse(
            {"customers":Customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"Message": "Could not create customer"},
                status_code=404,
            )

@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer doesn't exist"},
            status = 404
        )
    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})



@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_id=None):
    if request.method == "GET":
        if employee_id == None:
            sales = Sale.objects.all()
        else:
            sales = Sale.objects.filter(sales_person_id=employee_id)
        return JsonResponse(
            {"Sales": list(sales)},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            auto = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Vin # not recognized"},
                status_code=404
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status_code=404
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson"},
                status_code=404
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, id):
    try:
        sale = Sale.objects.get(id=id)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Sale does not exist"},
            status_code=404
        )
    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})
