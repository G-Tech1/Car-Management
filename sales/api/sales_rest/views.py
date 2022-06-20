from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

import idna

from common.json import ModelEncoder
from .models import SalesPerson, AutoVO, Customer, Record

class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties =[
        "vin"
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties =[
        "name",
        "employee_number"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties =[
        "name",
        "address",
        "phone_number",
    ]
    
class RecordEncoder(ModelEncoder):
    model = Record
    properties =[
        "auto",
        "sales_person",
        "customer",
    ]
    
    
@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)    
            name = SalesPerson.objects.create(**content) 
            employee_id = content["employee_id"] 
            employee = SalesPerson.objects.get(pk=employee_id)
            content["employee_id"] = employee
            return JsonResponse(
                name,
                encoder=SalesPersonEncoder,
                safe=False,
            )     
        except:
            response = JsonResponse(
                {"message": "Could not create sales person"}
            )
            response.status_code = 400
            return response
            
            
        