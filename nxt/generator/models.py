from django.db import models


class Daily(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    rsi = models.TextField(null=False)
    ma = models.TextField(null=False)
    cp = models.TextField(null=False)
    pm = models.TextField(null=False)
    srl = models.TextField(null=False)
    va = models.TextField(null=False)
    rsi_image_url = models.URLField(max_length=255, null=False)
    ma_image_url = models.URLField(max_length=255, null=False)
    cp_image_url = models.URLField(max_length=255, null=False)
    pm_image_url = models.URLField(max_length=255, null=False)
    srl_image_url = models.URLField(max_length=255, null=False)
    va_image_url = models.URLField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    generate_tracker = models.CharField(max_length=255, null=False)

    class Meta:
        db_table = 'dailytechnical'

    def __str__(self):
        return f'<Daily Technicals {self.title}>'
