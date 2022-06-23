from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, ServiceAppointment, Technician

# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model= AutomobileVO
    properties = ["vin"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ['id','name', 'employee_number']


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        'id',
        'vin',
        'customer',
        'date',
        'time',
        'description',
        'technician'
    ]

    encoders = {
        'technician': TechnicianEncoder()
    }
    
    def get_extra_data(self, o):
        try:
            AutomobileVO.objects.get(vin=o.vin)
            return {"vip": True}
        except:
            return {"vip": False}
            

@require_http_methods(['GET', 'POST'])
def api_list_technician(request):
    """
    Returns a dictionary with a single key "technician" which
    is a list of technician names and employee numbers. 

    {
        "technician": [
            {
                "name": technician's name,
                "employee_number": employee number,
            },
            ...
        ]
    }
    """
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except IntegrityError:
            return JsonResponse(
                {'message': "Invalid Employee Number"},
                status = 400
            )


@require_http_methods(["DELETE", "GET",])
def api_show_technician(request, pk):
    """
    Single-object API for the technician resource.

    GET:
    Returns the information for a technician resource based
    on the value of pk
    {
        "name": technician's name,
        "employee_number": employee number,
    }

    DELETE:
    Removes the technician resource from the application
    """
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response        


@require_http_methods(['GET', 'POST'])
def api_list_service(request):
    """
    Returns a dictionary with a single key "service" which
    is a list of service attributes. 
    {
        "service": [
            {
                "vin": vin number,
                "customer": customer name,
                "date": date,
                "time": time,
                "description": description,
                "technician": technician's name,

            },
            ...
        ]
    }
    """
    if request.method == "GET":
        service = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service": service},
            encoder=ServiceAppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except (IntegrityError, Technician.DoesNotExist):
            return JsonResponse(
                {"message": "Invalid credentials. Please check employee_number or vin"},
                status=400,
            )


        service = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET",])
def api_show_service(request, pk):
    """
    Single-object API for the service resource.

    GET:
    Returns the information for a service resource based
    on the value of pk
    {
                "vin": vin number,
                "customer": customer name,
                "date": date,
                "time": time,
                "description": description,
                "technician": [
                    {
                    name: technician's name,
                    employee_number: employee_number
                    }
                ]

            }

    DELETE:
    Removes the service resource from the application
    """
    if request.method == "GET":
        try:
            service = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            service = ServiceAppointment.objects.get(id=pk)
            service.delete()
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response