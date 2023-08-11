# Project Documentation

## Section 1: Running the Project

To run the project, follow the steps below. You can also copy the commands and run them directly in your GitHub repository.

```sh
git clone https://github.com/sharan-teja-kasula/auction-labs-backend.git
```

```sh
cd auction-labs-backend
```

```sh
npm install
```

```sh
npm start
```

## Section 2: Postman Collection

The `Postman` folder in the project consists of an HTTP requests collection and a Postman environment. You can use these to import into Postman and make API calls. Instead of importing the collection, you can directly access it using the public URL mentioned below:

[Postman Collection](https://www.postman.com/sparrowteck/workspace/auction-labs)

## Section 3: API Documentation

### Authentication Endpoints

#### Login

- **Endpoint:** `/authentication/login`
- **Method:** `POST`
- **Summary:** Log in to the system.
- **Body Payload:**

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

##### Responses

- **200:** Successful response

#### Send OTP

- **Endpoint:** `/authentication/otp/{requestType}`
- **Method:** `POST`
- **Summary:** Send an OTP for either forgot password or registration.
- **Body Payload:**

```json
{
  "email": "example@example.com"
}
```

##### Parameters

| Name        | Located in | Description                                 | Required | Schema |
| ----------- | ---------- | ------------------------------------------- | -------- | ------ |
| requestType | path       | Type of request: forgotpassword or register | Yes      | string |

##### Responses

- **200:** Successful response

#### Register

- **Endpoint:** `/authentication/register`
- **Method:** `POST`
- **Summary:** Register a new user.
- **Body Payload:**

```json
{
  "displayName": "Sharan Teja",
  "email": "sharanteja669@gmail.com",
  "password": "123456789",
  "otp": "585608"
}
```

##### Responses

- **200:** Successful response

#### Forgot Password

- **Endpoint:** `/authentication/forgotpassword`
- **Method:** `POST`
- **Summary:** Send a request for a forgot password.
- **Body Payload:**

```json
{
  "email": "sharanteja669@gmail.com",
  "password": "1234567890",
  "otp": "901542"
}
```

##### Responses

- **200:** Successful response
