# CarCar

Team:

- Brandon- Auto Sales
- Gilan- Auto Service

## Design
This website is designed for a dealership which could be used for many things like creating an service appointment for your car, show the service history of every car. The website also allows you to create a new employee,be they a sales person or a technician, as well as creating a new customer, record every car sold and every employee that sold said car.

The service, the inventory and the sales are all different microservice using the RESTful API model within their respective bounded context.


## Service microservice

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

I created four models which are the AutoVO which only retrieves the vin number from the inventory to make it possible to use it as a foreing key for the records, i made a sales person model to create a sales person and give it a employee number a customer model that lets us create a customer with a name address and a phone number and a record model which uses data from the autoVO model the customer model and the sales person model to create a record.i then started working on my GET and POST requests to create a customer, an employee and a record  after i got those working i started working on my poller which fetches data from the automobile model and puts it on the autoVO model i made. After the backend was done i started working on my frontend using React, created the Customer the employee and the record form, after that i made pages to show each list,and made a sales person record list filter to a specific sales person.
