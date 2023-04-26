from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
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
        "AutomobileVin",
        "Sales_Person",
        "Customer",
        "Price",
    ]
    encoders={
        "Automobile": AutomobileVOEncoder(),
        "Sales_Person": SalespersonEncoder(),
        "Customer": CustomerEncoder(),
    }
