# Generated by Django 5.0.7 on 2024-10-27 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vaults', '0004_alter_credential_vault_alter_passwordsettings_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vault',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
