# Generated by Django 4.0.3 on 2023-04-27 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_remove_automobilevo_import_href_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.TextField(max_length=17, unique=True),
        ),
    ]