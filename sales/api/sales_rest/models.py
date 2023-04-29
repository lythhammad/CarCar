from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_show_sales_person", kwargs={"id": self.id})

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"id": self.id})

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

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"id": self.id})
