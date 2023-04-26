from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    import_href = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name= "sales",
        on_delete=models.CASCADE,
    )
    def AutomobileVin(self):
        return self.automobile.vin

    sales_person = models.ForeignKey(
        Salesperson,
        related_name= "sales",
        on_delete=models.CASCADE,
        default=0
    )
    customer = models.ForeignKey(
        Customer,
        related_name= "sales",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField(default=0)
