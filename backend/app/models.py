from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=200)
    audio_blob = models.BinaryField(blank=True)
    