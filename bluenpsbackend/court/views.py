from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from court.models import CourtPresence

from datetime import datetime, timedelta, time

today = datetime.now().date()

def index(request):
    if(request.method=="POST"):
        dataDict = request.POST
        print(dataDict.get("name"))
        if "name" in dataDict and "court" in dataDict and "time" in dataDict:
            element = CourtPresence(name=dataDict.get("name"), time=dataDict.get("time"), court = dataDict.get("court"))
            element.save()
        else:
            return HttpResponse("error, bad request")
    alldata = list(CourtPresence.objects.filter(time=datetime.today()).values())
    r = JsonResponse(alldata, safe=False)
    r['Access-Control-Allow-Origin']= '*'
    return r

