# Backen API Documentation

## 🛡️ User Authentication API 

This is a **Node.js + Express + MongoDB** based backend API for user authentication.  
It supports **user registration, login, JWT authentication via cookies**, and secure route protection.

---

## 🚀 Features
- User **registration** with password hashing (`bcrypt`)
- User **login** with JWT authentication
- **JWT stored in HTTP-only cookies** (safer than localStorage)
- **Protected routes** accessible only to authenticated users

---

## 1️. Register User

### Description 
Registers a new user by creating a user account with the provided information

### HTTP Method
`POST`

**API Endpoint:**  

`/api/v1/user/register`

### **Example Request : **
```json
{
  "name": "John Doe",
  "email": "email@example.com",
  "password": "mypassword"
}
```
### Example Response
```json
{
    "success": false,
    "message": "User Created Successfully",
    "CretedUser": {
        "name": "User Nama",
        "email": "user email",
        "role": "student",
        "entrolledCourse": [],
        "profileUrl": "",
        "_id": "68a8c95241203eef27678d33abedh18b2",
        "createdAt": "2025-08-22T19:47:30.015Z",
        "updatedAt": "2025-08-22T19:47:30.015Z",
        "__v": 0
    }
}
```


## 2. Login User

### Description 
Authenticates a user using their email and password, returning a JWT token  upon successful login.

### HTTP Method
`POST`

**API Endpoint:**  

`/api/v1/user/login`

### **Example Request : **
```json
{
  "email": "email@example.com",
  "password": "mypassword"
}
```

### Example Response
```json
{
    "success": true,
    "message": "Welcome message",
    "user": {
        "_id": "68a8bfd36b90541aa6adf897b1",
        "name": "Name of the user",
        "email": "user email",
        "role": "student",
        "entrolledCourse": [],
        "profileUrl": "",
        "createdAt": "2025-08-22T19:06:59.423Z",
        "updatedAt": "2025-08-22T19:06:59.423Z",
        "__v": 0
    }
}
```



