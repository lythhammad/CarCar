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
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople":salespeople},
            encoder=SalespersonEncoder,
            safe=False
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
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
        except Salesperson.DoesNotExist:
            return JsonResponse(
            {"message": "Sales Person doesn't exist"},
            status=404
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
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers":customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
                status=200
            )
        except:
            return JsonResponse(
                {"Message": "Could not create customer"},
                status=404,
            )

@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer doesn't exist"},
                status = 404
        )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Cannot delete"},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_id=None):
    if request.method == "GET":
        if employee_id == None:
            sales = Sale.objects.all()
        else:
            sales = Sale.objects.filter(sales_person_id=employee_id)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Vin # not recognized"},
                status=404
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
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
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
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )

        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
             status_code=404
            )
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist" },
                status=404
            )
