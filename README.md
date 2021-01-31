# message-challenge
A challenge to make simple messaging feature

* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Builts using Node.Js; Express; PostgreSQL; Sequelize ORM

&nbsp;

## RESTful endpoints
### POST /user

> Create new user

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "username": "E",
}
```

_Response (201 - Created)_
```
{
  "id": 5,
  "username": "E",
  "updatedAt": "2021-01-31T13:59:25.602Z",
  "createdAt": "2021-01-31T13:59:25.602Z"
}
```
_Response (400 - Bad request)_
```
{
  "msg": "username already taken"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---

### GET /message

> Get all messages, and get all messages by Converstation ID

_Request Header_
```
<not needed>
```
_Request Query_
```
conv_id = <int>
```
_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
{
  "messages": [
    {
      "id": 5,
      "content": "Reply msg_id 1 dari A",
      "user_id": 1,
      "conv_id": 1,
      "reply_msg_id": 1,
      "createdAt": "2021-01-31T12:15:16.299Z",
      "updatedAt": "2021-01-31T12:15:16.299Z",
      "reply": {
        "id": 1,
        "content": "Hai A",
        "user_id": 1,
        "conv_id": 1,
        "reply_msg_id": null,
        "createdAt": "2021-01-31T12:08:26.500Z",
        "updatedAt": "2021-01-31T12:08:26.500Z"
      }
    },
    ...
  ]
}
```
_Response (400 - Bad request)_
```
{
  "msg": "username already taken"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---

### POST /message

> Create a new message to other users

_Request Header_
```
<not needed>
```

_Request Body_
```
{ 
  user_id: <integer>, 
  conv_id: <integer>, (optional)
  content: <string>,
  to_user: <integer>,
  reply_to: <integer> 
}
```

_Response (201 - Created)_
```
{
  "messages": [
    {
      "id": 5,
      "content": "Reply msg_id 1 dari A",
      "user_id": 1,
      "conv_id": 1,
      "reply_msg_id": 1,
      "createdAt": "2021-01-31T12:15:16.299Z",
      "updatedAt": "2021-01-31T12:15:16.299Z",
      "reply": {
        "id": 1,
        "content": "Hai A",
        "user_id": 1,
        "conv_id": 1,
        "reply_msg_id": null,
        "createdAt": "2021-01-31T12:08:26.500Z",
        "updatedAt": "2021-01-31T12:08:26.500Z"
      }
    },
    ...
  ]
}
```
_Response (400 - Bad request)_
```
{
  "msg": "username already taken"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```

---
### POST /reply/:id

> Create a new message to other users

_Request Header_
```
<not needed>
```
_Request Params_
```
id: <string> (id message to reply)
```

_Request Body_
```
{ 
  user_id: <integer>,
  content: <string>
}
```

_Response (201 - Created)_
```
{
  "message": {
    "id": 5,
    "content": "Reply msg_id 1 dari A",
    "user_id": 1,
    "conv_id": 1,
    "reply_msg_id": 1,
    "createdAt": "2021-01-31T12:15:16.299Z",
    "updatedAt": "2021-01-31T12:15:16.299Z",
    "reply": {
      "id": 1,
      "content": "Hai A",
      "user_id": 1,
      "conv_id": 1,
      "reply_msg_id": null,
      "createdAt": "2021-01-31T12:08:26.500Z",
      "updatedAt": "2021-01-31T12:08:26.500Z"
    }
  }
}
```
_Response (400 - Bad request)_
```
{
  "msg": "Content is required!"
}
```
_Response (401 - Unauthorized)_
```
{
  "msg": "not allowed to reply!"
}
```
_Response (404 - Not found)_
```
{
  "msg": "user not found"
}
{
  "msg": "msg not found"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---

### GET /conversation

> Get all conversation by user_id

_Request Header_
```
<not needed>
```
_Request Body_
```
{
  user_id: 1
}
```

_Response (200 - OK)_
```
[
  {
    "id": 2,
    "name": "A-C",
    "last_msg": null,
    "createdAt": "2021-01-31T12:08:26.477Z",
    "updatedAt": "2021-01-31T12:08:26.477Z",
    "Participants": [...]
  },
  {
    "id": 1,
    "name": "A-B",
    "last_msg": null,
    "createdAt": "2021-01-31T12:08:26.477Z",
    "updatedAt": "2021-01-31T12:08:26.477Z",
    "Participants": [...]
  }
]
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---

### GET /conversation/:id

> Get a conversation by ID, the result is a Conversation with the details of the participants and the message

_Request Header_
```
<not needed>
```
_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
{
  "id": 2,
  "name": "A-C",
  "last_msg": null,
  "createdAt": "2021-01-31T12:08:26.477Z",
  "updatedAt": "2021-01-31T12:08:26.477Z",
  "Messages": [
    {
      "id": 3,
      "content": "Ini percakapan A-C",
      "user_id": 3,
      "conv_id": 2,
      "reply_msg_id": null,
      "createdAt": "2021-01-31T12:08:26.500Z",
      "updatedAt": "2021-01-31T12:08:26.500Z"
    },
    {
      "id": 6,
      "content": "Reply id 3 di conversation A-C",
      "user_id": 3,
      "conv_id": 2,
      "reply_msg_id": 3,
      "createdAt": "2021-01-31T14:20:04.308Z",
      "updatedAt": "2021-01-31T14:20:04.308Z"
    }
  ],
  "Participants": [
    {
      "id": 3,
      "user_id": 1,
      "conv_id": 2,
      "createdAt": "2021-01-31T12:08:26.488Z",
      "updatedAt": "2021-01-31T12:08:26.488Z"
    },
    {
      "id": 4,
      "user_id": 3,
      "conv_id": 2,
      "createdAt": "2021-01-31T12:08:26.488Z",
      "updatedAt": "2021-01-31T12:08:26.488Z"
    }
  ]
}
```

_Response (404 - Not found)_
```
{
  "msg": "conversation not found!"
}
```

_Response (500 - Internal server error)_
```
{
  "msg": "internal server error"
}
```
---
