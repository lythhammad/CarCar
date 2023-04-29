# CarCar

Team:

lyth hammad - Service microservice
mo - Sales microservice

## Design

## Service microservice
http://localhost:8080/api/appointments To GET and POST my appointments


http://localhost:8080/api/appointments/18 to DELETE any appointment


http://localhost:8080/api/appointments/21/finish To set the statuse finish

http://localhost:8080/api/appointments/13/cancel To set the statuse cancel

http://localhost:8080/api/technicians
To GET, POST, DELETE Technicians


## Sales microservice

The Sales Api allows you to track customers, sales made, as well as adding and search old and new sales.
http://localhost:3000/Sales/customers/create allows to create a new customer
http://localhost:3000/Sales/customers/list a list of those created customers
http://localhost:3000/Sales/salespeople/create allows to create a new sales person
http://localhost:3000/Sales/salespeople/list a list of those created sales people
http://localhost:3000/Sales/sales/all a list of all sales
http://localhost:3000/Sales/form to create a sale
