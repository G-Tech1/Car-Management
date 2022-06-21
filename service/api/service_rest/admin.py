from django.contrib import admin
from .models import AutomobileVO, Technician, ServiceAppointment

# Register your models here.


admin.site.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


admin.site.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


admin.site.register(ServiceAppointment)
class ServiceAppointmentAdmin(admin.ModelAdmin):
    pass

