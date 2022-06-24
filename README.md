# CarCar

Team:

* Brandon- Auto Sales
- Gilan- Auto Service


## Design


## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

I created four models which are the AutoVO which only retrieves the vin number from the inventory to make it possible to use it as a foreing key for the records, i made a sales person model to create a sales person and give it a employee number a customer model that lets us create a customer with a name address and a phone number and a record model which uses data from the autoVO model the customer model and the sales person model to create a record.i then started working on my GET and POST requests to create a customer, an employee and a record  after i got those working i started working on my poller which fetches data from the automobile model and puts it on the autoVO model i made. After the backend was done i started working on my frontend using React, created the Customer the employee and the record form, after that i made pages to show each list,and made a sales person record list filter to a specific sales person.