# Generated by Django 4.0.3 on 2023-04-26 02:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_automobilevo_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='custamer',
            new_name='customer',
        ),
    ]
