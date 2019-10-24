# backend

[product vision](https://www.notion.so/dislersd/Product-Vision-8650648b724a4bb6b6062270da8ffdb8)

# Working Endpoints

# Admins

`POST /api/admins/register`

- Register new admin by sending an object resembling
```
js
{
	"username":"chrisb",
	"password":"newyork",
	"email":"chrisb@gmail.com",
	"first_name": "Chris",
	"last_name": "Bonifacio"
}```



`POST /api/admins/login`

- Login as admin by sending valid ```{username, password}```
- Receive a json web token for use as authentication

`GET /api/admins/`

- Get list of all admins

`GET /api/admins/:id`

- Get admin by ID

`POST /api/admins/:id/school` - Protected

- Register a school to admin by sending an object resembling
```
js
{
	"school_name":"Summerside High School",
	"address": "54321 Cayan St",
	"city":"Waterbury",
	"state": "Connecticut",
	"zipcode":"06704",
	"funds_needed": 45000,
	"funds_raised": 12000
}```

# Schools

`GET /api/schools`

- Get list of all schools

`GET /api/schools/:id`

- Get school by ID

`POST /api/schools/:id`

- Send an object resembling `{ donation: 200 }` to make a donation to a school with specified ID

`PUT /api/schools/:id`

- Edit/Update school information with specified ID
