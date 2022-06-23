from email import contentmanager
from http.client import responses
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

import idna

from common.json import ModelEncoder
from .models import SalesPerson, AutoVO, Customer, Record


class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = ["vin"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]


class RecordEncoder(ModelEncoder):
    model = Record
    properties = [
        "auto",
        "sales_person",
        "customer",
        "sales_price",
    ]
    encoders = {
        "customer": CustomerEncoder(),
        "sales_person": SalesPersonEncoder(),
        "auto": AutoVOEncoder(),
    }



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
            return JsonResponse(
                name,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create sales person"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create a customer"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_records(request):
    if request.method == "GET":
        records = Record.objects.all()
        return JsonResponse(
            {"records": records},
            encoder=RecordEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        # print("content",content)
        # print("instance",isinstance(content['auto'],str))
        content = {
            **content,
            "auto": AutoVO.objects.get(id=content["auto"]),
            "sales_person": SalesPerson.objects.get(id=content["sales_person"]),
            "customer": Customer.objects.get(id=content["customer"]),
        }
        record = Record.objects.create(**content)
        return JsonResponse(
            record,
            encoder=RecordEncoder,
            safe=False,
        )
