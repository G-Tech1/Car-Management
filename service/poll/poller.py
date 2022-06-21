import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVO


# gets data from bin model in wardrobe via api link
def get_vins():
    print("success")
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print("success2")
    content = json.loads(response.content)
    print("success3")
    for car in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=car["vin"],
        )
    print("success4")



def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_vins()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
