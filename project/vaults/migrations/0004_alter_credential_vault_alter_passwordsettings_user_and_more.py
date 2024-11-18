# Generated by Django 5.0.7 on 2024-10-27 15:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vaults', '0003_alter_credential_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='credential',
            name='vault',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='credentials', to='vaults.vault'),
        ),
        migrations.AlterField(
            model_name='passwordsettings',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='password_settings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='vault',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vaults', to=settings.AUTH_USER_MODEL),
        ),
    ]
