from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_vin", kwargs={"vin": self.vin})


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"{self.first_name} - {self.last_name} - {self.employee_id}"

    def get_api_url(self):
        return reverse("technicinan", kwargs={"id": self.id})


class Appointment(models.Model):
    Choices = (
        ("canceled", "canceled"),
        ("finished", "finished"),
        ("created", "created"),
        )
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=10)
    vin = models.CharField(max_length=150)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )

    def create(self):
        self.completed = "create"
        self.save()

    def cancel(self):
        self.completed = "canceled"
        self.save()

    def finished(self):
        self.completed = "finished"
        self.save()

    def __str__(self):
        return f"{self.vin} - {self.customer} - {self.date_time}"

    def get_api_ur(self):
        return reverse("appointment", kwargs={"id": self.id})
