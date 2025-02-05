# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```json
{
  "username": "pzn",
  "password": "rahasia",
  "name": "Fausta Akbar"
}
```

Respon Body Succsess:

```json
{
  "data": {
    "username": "pzn",
    "name": "Fausta Akbar"
  }
}
```

Respon Body Eror:

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body:

```json
{
  "username": "pzn",
  "password": "rahasia"
}
```

Respon Body Succsess:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Respon Body Eror:

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Enpoint : PATCH /api/users/current

Headers :

- Aurhorization : token

Request Body:

```json
{
  "name": "Fausta Akbar lagi", //optional
  "password": "rahasia" //optional
}
```

Respon Body Succsess:

```json
{
  "data": {
    "username": "pzn",
    "name": "Fausta Akbar lagi"
  }
}
```

Respon Body Eror:

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/user/current

Headers :

- Aurhorization : token

Respon Body Succsess:

```json
{
  "data": {
    "username": "pzn",
    "name": "Fausta Akbar lagi"
  }
}
```

Respon Body Eror:

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Headers :

- Aurhorization : token

Endpoint : DELETE /api/users/logout

Respon Body Succsess:

```json
{
  "data": "OK"
}
```

Respon Body Eror:

```json
{
  "data": "Unauthorized"
}
```
