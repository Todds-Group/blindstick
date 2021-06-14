from django.db import models

# Create your models here.
class Location(models.Model):
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{lat}, {lng}".format(
            lat=self.lat,
            lng=self.lng
        )
