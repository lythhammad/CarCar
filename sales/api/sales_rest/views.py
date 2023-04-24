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
