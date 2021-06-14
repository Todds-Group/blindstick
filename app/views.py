from django.shortcuts import render
from django.http import JsonResponse

from .models import Location

# Create your views here.
def index(request):
    return render(request, 'app/index.html')

def receive_lat_lng(request, lat, lng):
    loc = Location()
    loc.lat = float(lat)
    loc.lng = float(lng)
    loc.save()
    context = {
        lat: lat,
        lng: lng,
    }
    return JsonResponse(context)

def read_last_location(request):
    loc = Location.objects.last()
    if loc is None:
        data = None
    else:
        data = {
            'lat': loc.lat,
            'lng': loc.lng,
            'created_at': loc.created_at
        }
    return JsonResponse(data)