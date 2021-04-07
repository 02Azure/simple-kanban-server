# kanban-server
server API for  site to implement agile and DevOps software development.

* RESTful endpoint for kanban's CRUD operation
* powered with express and postgres (with sequelize)
* Support google login

## Endpoints

<details>
<summary>1. POST /register</summary>

&nbsp;

> Register a new user

&nbsp;

**Request Body**
``` JS
{
  username: "otong322"
  email: "otong@mail.com",
  password: "pass123"
}
```

**Response (201)**
``` JSON
{
  "id": 1,
  "username": "otong322",
  "email": "otong@mail.com"
}
```
</details>

---

<details>
<summary>2. POST /login</summary>

&nbsp;

> Login a user

&nbsp;

**Request Body**
``` JS
{
  username: "lilynano",
  password: "lilily"
}
```

**Response (200)**
``` JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsaWx5bmFubyIsImlhdCI6MTYxNzcwMjYwNX0.qjLvckyJeKDSlYKZDqZiAHqazqiUU_zzFNYdu3uXD08",

    "username": "lilynano"
```

**Response (400) (id and/or password isn't matched with any user)**
``` JSON
{
  "error": "Incorrect Username or Password"
}
```

</details>

---

<details>
<summary>3. POST /google-login</summary>

&nbsp;

> Login a user ( and register it if that email is not used yet) with Google Account

&nbsp;

**Request Body**
``` JS
{
  id_token: "<your generated id_token after successfully logging in with google account>",
}
```

**Response (200)**
``` JSON
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3MTgyNjI4fQ.DvuE-I-jCpYGO2uNM5_ZRxfI4DUBaOQqEIeK8Rr_hN8",
  "username": "<your email OR your current username that was registered before by using that gmail>"
}
```

</details>

---
<details>
<summary>3. GET /tasks</summary>

&nbsp;

> View All Tasks 

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Response (200)**
``` JSON
[
    {
        "id": 1,
        "title": "Kanban portfolio!",
        "category": "doing",
        "due": "2021-04-09",
        "UserId": 2,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    },
    {
        "id": 2,
        "title": "grinding gbf!?",
        "category": "backlog",
        "due": "2021-04-30",
        "UserId": 3,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    },
    {
        "id": 3,
        "title": "Todo portfolio!",
        "category": "done",
        "due": "2021-04-03",
        "UserId": 2,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    }
]
```
</details>

---

<details>
<summary>4. GET /tasks</summary>

&nbsp;

> View All Tasks 

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Response (200)**
``` JSON
[
    {
        "id": 1,
        "title": "Kanban portfolio!",
        "category": "doing",
        "due": "2021-04-09",
        "UserId": 2,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    },
    {
        "id": 2,
        "title": "grinding gbf!?",
        "category": "backlog",
        "due": "2021-04-30",
        "UserId": 3,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    },
    {
        "id": 3,
        "title": "Todo portfolio!",
        "category": "done",
        "due": "2021-04-03",
        "UserId": 2,
        "createdAt": "2021-04-06T08:37:40.784Z",
        "updatedAt": "2021-04-06T08:37:40.784Z"
    }
]
```
</details>

---

<details>
<summary>5. POST /tasks</summary>

&nbsp;

> Add a new task 

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Task id that you want to get>"
}
```

**Response (201)**
``` JSON
{
    "id": 5,
    "title": "iseng buat coba",
    "category": "backlog",
    "due": "2021-05-05",
    "UserId": 1,
    "updatedAt": "2021-06-06T09:54:55.311Z",
    "createdAt": "2021-06-06T09:54:55.311Z"
}
```
**Response (404) (empty title and invalid due date)**
``` JSON
{
    "error": [
        "Title can't be empty",
        "Due Date must be a date string"
    ]
}
```
</details>

---
<details>
<summary>6. GET /tasks/:id</summary>

&nbsp;

> View one task with matched Id

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Response (200)**
``` JSON
  {
    "id": 1,
    "title": "Kanban portfolio!",
    "category": "doing",
    "due": "2021-04-09",
    "UserId": 2,
    "createdAt": "2021-04-06T08:37:40.784Z",
    "updatedAt": "2021-04-06T08:37:40.784Z"
  }
```

**Response (404) (id isn't matched with any task)**
``` JSON
{
    "error": "Task with this id is not found"
}
```

</details>

---

<details>
<summary>7. PUT /tasks/:id</summary>

&nbsp;

> Update a tasks's title and/or due

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```
**Request Parameters**
``` JSON
{
  "id": "<Task id that you want to update>"
}
```

**Request Body**
``` JS
{
  title: "diganti!! oleh admin",
  due: "2022-01-01",
}
```
**Response (200)**
``` JSON
{
    "id": 6,
    "title": "diganti!! oleh admin",
    "category": "backlog",
    "due": "2022-01-01",
    "UserId": 1,
    "createdAt": "2021-04-06T09:58:04.175Z",
    "updatedAt": "2021-04-06T09:58:14.971Z"
}
```
**Response (400) (empty date)**
``` JSON
{
    "error": [
        "Due Date must be a date string"
    ]
}
```
**Response (404) (id isn't matched with any task)**
``` JSON
{
    "error": "Task with this id is not found"
}
```
</details>

---

<details>
<summary>8. PATCH /tasks/:id</summary>

&nbsp;

>Change a task's category

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Task id that you want to switch>"
}
```

**Request Body**
``` JS
{
  category: "todo",
}
```

**Response (200) (with params id = 3)**
``` JSON
{
    "id": 6,
    "title": "diganti!! oleh admin",
    "category": "todo",
    "due": "2022-01-01",
    "UserId": 1,
    "createdAt": "2021-04-06T09:58:04.175Z",
    "updatedAt": "2021-04-06T10:01:47.147Z"
}
```

**Response (404) (id isn't matched with any todo)**
``` JSON
{
    "error": "Task with this id is not found"
}
```
</details>

---

<details>
<summary>9. DELETE /tasks/:id</summary>

&nbsp;

> Delete a task

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Task id that you want to delete>"
}
```

**Response (200) (with params id = 5)**
``` JSON
{
    "message": "Task with id 5 is successfully deleted"
}
```

**Response (404) (id isn't matched with any task)**
``` JSON
{
    "error": "Task with this id is not found"
}
```
</details>

---
