from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from court.models import CourtPresence
import json
from datetime import datetime, timedelta, time
import re
def index(request):
    today = datetime.now().date()
    print("received request")
    print(request)
    print(request.body)
    if(request.method=="POST"):
        dataDict = json.loads(request.body)
        print(dataDict)
        print(dataDict.get("name"))
        if "name" in dataDict and "court" in dataDict and "time" in dataDict:  
            properdate = datetime.strptime(dataDict.get("time"), "%Y-%m-%d")
            element = CourtPresence(name=dataDict.get("name"), time=properdate, court = dataDict.get("court"))
            element.save()
            serialized_element =  serializers.serialize('json', [ element, ])
            r =  HttpResponse(serialized_element)
            r.headers["Access-Control-Allow-Origin"] = "*"
            return r
        else:
            print("bad")
            return badRequest()
    elif(request.method=="OPTIONS"):
        r = HttpResponse("OK")
        r.headers["Access-Control-Allow-Origin"] = "*"
        r.headers["Access-Control-Allow-Headers"] = "*"
        return r
    else:
        print(f"twasnot a post, twas {request.method}")
        alldata = list(CourtPresence.objects.filter(time=datetime.today()).values())
        r = JsonResponse(alldata, safe=False)
        r.headers['Access-Control-Allow-Origin']= '*'
        return r
    
def all(request):
    if request.method=="GET":
        alldata = list(CourtPresence.objects.all().values())
        r = JsonResponse(alldata, safe=False)
        r.headers['Access-Control-Allow-Origin']= '*'
        return r

def deleteToday(request):
    if request.method=="DELETE":
        if "nameQuery" not in request.headers:
            print("namequery not found")
            return badRequest()
        
        nameQuery = request.headers["nameQuery"]
        fullQuery = f"^{nameQuery}$"
        todayData = CourtPresence.objects.filter(
            time=datetime.today(),
            ).filter(name__regex= f"{fullQuery}")
        dataCopy = list(todayData.values())
        todayData.delete()
        r = JsonResponse(dataCopy, safe=False)
        r.headers['Access-Control-Allow-Origin']= '*'
        r.headers["Access-Control-Allow-Methods"]="*"
        return r    
    elif request.method=="OPTIONS":
        return okay() 
    else:
        return badRequest()



def okay():
    r= HttpResponse("OK")
    r.headers["Access-Control-Allow-Origin"] = "*"
    r.headers["Access-Control-Allow-Methods"]="*"
    r.headers["Access-Control-Allow-Headers"] = "*"
    r.status_code=200
    return r

def badRequest():
    r= HttpResponse("error, bad request, cmon Daisey")
    r.headers["Access-Control-Allow-Origin"] = "*"
    r.headers["Content-Type"] = "text"
    r.status_code=400
    return r