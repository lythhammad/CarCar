from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "address",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]
    encoders={
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
