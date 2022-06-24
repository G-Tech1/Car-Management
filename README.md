# CarCar

Team:

- Brandon- Auto Sales
- Gilan- Auto Service

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

### Models:

**AutomobileVO**

- Receives VIN #s from the inventory via service poller.

**Status**

- Provides 1 of 3 statuses for ServiceAppointment.
  - submitted
  - cancelled
  - confirmed

**Technician**

- Provides a data table for technicians including:
  - Name
  - Employee Number

**ServiceAppointment**

- Provides a data table for service appointments including:
  - VIP
  - VIN
  - Customer
  - Date
  - Time
  - Description
  - Technician (Foreign Key)
  - Status (Foreign Key)

## Sales microservice

I created four models which are the AutoVO which only retrieves the vin number from the inventory to make it possible to use it as a foreing key for the records, i made a sales person model to create a sales person and give it a employee number a customer model that lets us create a customer with a name address and a phone number and a record model which uses data from the autovo model the customer model and the sales person model to create a record
