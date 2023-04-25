from django.db import models

class AutoMobileVO(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    import_href = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.vin

class SalesPerson(models.Model):
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
        AutoMobileVO,
        related_name= "Sale",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name= "Sale",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name= "Sale",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField
