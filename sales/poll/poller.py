import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutoVO
# Import models from sales_rest, here.
# from sales_rest.models import Something

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = json.loads(response.content)
            for cars in content['autos']:
                AutoVO.objects.update_or_create(
                    vin=cars['vin']
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
