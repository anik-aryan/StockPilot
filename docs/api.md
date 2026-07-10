# StockPilot API Documentation

## Overview

StockPilot is a multi-warehouse inventory management platform built using the MERN Stack.

**Base URL**

```
http://localhost:5000/api/v1
```

---

# Authentication APIs

Authentication is handled using JWT (JSON Web Token) stored in HTTP-only cookies.

---

## 1. Register User

### Endpoint

```
POST /auth/signup
```

### Description

Creates a new user account.

---

### Request Body

```json
{
  "firstName": "Anik",
  "lastName": "Aryan",
  "email": "anik@test.com",
  "password": "123456",
  "role": "admin"
}
```

---

### Success Response

**Status Code**

```
201 Created
```

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "665d7fa8c0b9d7b76e1c2d34",
    "firstName": "Anik",
    "lastName": "Aryan",
    "email": "anik@test.com",
    "role": "admin",
    "warehouse": null,
    "isActive": true,
    "lastLogin": null,
    "createdAt": "2026-07-10T12:30:00.000Z",
    "updatedAt": "2026-07-10T12:30:00.000Z"
  }
}
```

---

### Validation Errors

| Status Code | Reason |
|-------------|--------|
|400|Invalid Request Body|
|409|Email Already Exists|
|500|Internal Server Error|

---

## 2. Login User

### Endpoint

```
POST /auth/login
```

### Description

Authenticates a registered user and returns user information. A JWT access token is stored in an HTTP-only cookie.

---

### Request Body

```json
{
  "email": "anik@test.com",
  "password": "123456"
}
```

---

### Success Response

**Status Code**

```
200 OK
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "_id": "665d7fa8c0b9d7b76e1c2d34",
    "firstName": "Anik",
    "lastName": "Aryan",
    "email": "anik@test.com",
    "role": "admin",
    "warehouse": null
  }
}
```

---

### Possible Errors

| Status Code | Reason |
|-------------|--------|
|400|Validation Failed|
|401|Invalid Credentials|
|404|User Not Found|
|500|Internal Server Error|

---

## 3. Logout User *(Upcoming)*

### Endpoint

```
POST /auth/logout
```

### Description

Clears the authentication cookie and logs out the current user.

---

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logout successful"
}
```

---

## 4. Get Current User *(Upcoming)*

### Endpoint

```
GET /auth/me
```

### Description

Returns information about the currently authenticated user.

Authentication Required

✅ Yes

---

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Current user fetched successfully",
  "data": {
    "_id": "...",
    "firstName": "Anik",
    "lastName": "Aryan",
    "email": "anik@test.com",
    "role": "admin"
  }
}
```

---


