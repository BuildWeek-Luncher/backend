# backend

[product vision](https://www.notion.so/dislersd/Product-Vision-8650648b724a4bb6b6062270da8ffdb8)

# Working Endpoints

# Admins

`POST /api/admins/register`

- Register new admin

`POST /api/admins/login`

- Login as admin

`GET /api/admins/`

- Get list of all admins

`GET /api/admins/:id`

- Get admin by ID

`POST /api/admins/:id/school` - Protected

- Register a school to admin

# Schools

`GET /api/schools`

- Get list of all schools

`GET /api/schools/:id`

- Get school by ID

`POST /api/schools/:id`

- Send an object resembling `{ donation: 200 }` to make a donation to a school with specified ID

`PUT /api/schools/:id`

- Edit/Update school information with specified ID
