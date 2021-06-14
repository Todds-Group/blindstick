from django.shortcuts import render
from django.http import JsonResponse

from .models import Location

# Create your views here.
def index(request):
    return render(request, 'app/index.html')

def receive_lat_lng(request):
    data = {'status': 'failed'}
    if request.method == "GET":
        lat = request.GET.get('lat', 0.0)
        lng = request.GET.get('lng', 0.0)
        loc = Location()
        loc.lat = float(lat)
        loc.lng = float(lng)
        loc.save()
        data = {
            "status": "ok"
        }
    return JsonResponse(data)

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