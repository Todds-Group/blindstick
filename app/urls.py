from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('receive_lat_lng/<str:lat>/<str:lng>/', views.receive_lat_lng, name="receive"),
    path('read_last_entry/', views.read_last_location, name="read_last")
]