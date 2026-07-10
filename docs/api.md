# StockPilot API Documentation

Base URL

http://localhost:5000/api/v1

---

# Authentication

## Register User

POST /auth/signup

### Description

Registers a new user in the system.

### Request Body

```json
{
  "firstName": "Anik",
  "lastName": "Aryan",
  "email": "anik@test.com",
  "password": "123456",
  "role": "admin"
}