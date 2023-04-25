from django.shortcuts import render
from .models import AutoMobileVO, SalesPerson, Sale, Customer
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "vin"
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "Automobile",
        "Sales_Person",
        "Customer",
        "Price",
    ]
    encoders={
        "Automobile": AutoMobileVOEncoder(),
        "Sales_Person": SalesPersonEncoder(),
        "Customer": CustomerEncoder(),
    }

@require_http_methods(["GET"])
def api_list_AutoMobileVO(request):
    if request.method == "GET":
        automobiles = AutoMobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutoMobileVOEncoder
        )

@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"Sales_People":sales_people},
            encoder=SalesPersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            Sales_Person = SalesPerson.objects.create(**content)
            return JsonResponse(
                Sales_Person,
                encoder=SalesPersonEncoder,
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
        sales_person = SalesPerson.objects.get(id=id)
    except SalesPerson.DoesNotExist:
        return JsonResponse(
            {"message": "Sales Person doesn't exist"}
            status = 404
        )
    if request.method == "GET":
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder
            safe=False,
        )
    else:
        count, _ = SalesPerson.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})



@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        Customers = Customer.objects.all()
        return JsonResponse(
            {"Customers":Customers},
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
                {"Message": "Could not create Customer"},
                status=404,
            )

@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer doesn't exist"}
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
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"Sales": sales},
            encoder=SaleEncoder,
            )
    else:
        content = json.loads(request.body)

        try:
            Auto = AutoMobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = Auto
        except AutoMobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Vin # not recognized"},
                status=404
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"}
                status=404
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
            status=404
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
    
