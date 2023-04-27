from django.db import models

class AutomobileVO(models.Model):
    vin = models.TextField(max_length=17, unique=True)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField()

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name= "automobile",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        Salesperson,
        related_name= "salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name= "customer",
        on_delete=models.CASCADE,
    )
    price = models.CharField(max_length=100)
