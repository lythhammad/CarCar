from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=150)
    import_href = models.CharField(max_length=200)

    def __str__(self):
        return self.vin

    class Meta:
        verbose_name_plural = "inventory VINs"


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"{self.first_name} - {self.last_name} - {self.employee_id}"

    def get_api_url(self):
        return reverse("technicinan", kwargs={"id": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.TextField()
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=150)
    custamer = models.CharField(max_length=150)

    technician = models.ForeignKey(
        Technician,
        related_name="services",
        on_delete=models.CASCADE
    )

    def complete_service(self):
        self.completed = True
        self.save()

    def __str__(self):
        return f"{self.vin} - {self.custamer} - {self.date_time}"

    def get_api_ur(self):
        return reverse("appointment", kwargs={"id": self.id})
