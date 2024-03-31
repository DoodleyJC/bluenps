from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from court.models import CourtPresence
import json
from datetime import datetime, timedelta, time

today = datetime.now().date()

def index(request):
    print("received request")
    print(request)
    print(request.body)
    if(request.method=="POST"):
        dataDict = json.loads(request.body)
        print(dataDict)
        print(dataDict.get("name"))
        if "name" in dataDict and "court" in dataDict and "time" in dataDict:
            element = CourtPresence(name=dataDict.get("name"), time=dataDict.get("time"), court = dataDict.get("court"))
            element.save()
            r =  HttpResponse("okay")
            r["Access-Control-Allow-Origin"] = "*"
            return r
        else:
            print("bad")
            r= HttpResponse("error, bad request")
            r["Access-Control-Allow-Origin"] = "*"
            return r
    elif(request.method=="OPTIONS"):
        r = HttpResponse("OK")
        r["Access-Control-Allow-Origin"] = "*"
        r["Access-Control-Allow-Headers"] = "*"
        return r
    else:
        print(f"twasnot a post, twas {request.method}")
        alldata = list(CourtPresence.objects.filter(time=datetime.today()).values())
        r = JsonResponse(alldata, safe=False)
        r['Access-Control-Allow-Origin']= '*'
        return r

