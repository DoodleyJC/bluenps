from django.shortcuts import render
from django.http import HttpResponse





def index(request):
    if(request.method=="POST"):
        dataDict = request.POST
        print(dataDict.get("name"))
        if "name" in dataDict and "court" in dataDict and "time" in dataDict:
            return HttpResponse("good request from: "+dataDict.get("name"))
        else:
            return HttpResponse("error, bad request")
    return HttpResponse("hello, world")

