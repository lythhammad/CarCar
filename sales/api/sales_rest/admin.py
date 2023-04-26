from django.contrib import admin
from .models import Salesperson, Sale, Customer

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
