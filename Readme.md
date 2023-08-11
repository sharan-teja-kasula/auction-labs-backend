# Project Documentation

## Section 1: Running the Project

To run the project, follow the steps below. You can also copy the commands and run them directly in your command line.

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

The `postman` folder in the project consists of an HTTP requests collection and a Postman environment. You can use these to import into Postman and make API calls. Instead of importing the collection, you can directly access it using the public URL mentioned below:

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

- **200:**

```json
{
  "data": {
    "id": 1,
    "email": "example@example.com",
    "displayname": "example"
  },
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9....."
}
```

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

- **200:**

```json
{
  "msg": "OTP sent successfully!"
}
```

#### Register

- **Endpoint:** `/authentication/register`
- **Method:** `POST`
- **Summary:** Register a new user.
- **Body Payload:**

```json
{
  "displayName": "example",
  "email": "example@example.com",
  "password": "password123", // Minium length is 8
  "otp": "585608"
}
```

##### Responses

- **200:**

```json
{
  "msg": "User successfully registered!"
}
```

#### Forgot Password

- **Endpoint:** `/authentication/forgotpassword`
- **Method:** `POST`
- **Summary:** Send a request for a forgot password.
- **Body Payload:**

```json
{
  "email": "example@example.com",
  "password": "password123",
  "otp": "901542"
}
```

##### Responses

- **200:**

```json
{
  "msg": "Password updated successfully!"
}
```

### Auction Endpoints

#### Create Auction

- **Endpoint:** `/api/graphql`
- **Method:** `POST`
- **Description:** Create a new auction.
- **Authorization:** Requires an Authorization header with a valid JWT token.
- **Query:**

```graphql
mutation ($input: AuctionInput!) {
  createAuction(input: $input) {
    id
    title
    description
    category
    imageurl
    start_time
    end_time
    current_bid_amount
    user_id
    status
  }
}
```

- **Variables:**

```
{
  "input": {
    "title": "New Auction",
    "description": "This is a new auction",
    "category": "Electronics",
    "imageurl": "https://example.com/sample.jpg",
    "start_time": "2023-08-11T10:00:00Z",
    "end_time": "2023-08-15T18:00:00Z"
  }
}
```

##### Responses

- **200:**

```json
{
  "data": {
    "createAuction": {
      "id": "10",
      "title": "New Auction",
      "description": "This is a new auction",
      "category": "Electronics",
      "imageurl": "https://example.com/sample.jpg",
      "start_time": "1691728200000",
      "end_time": "1692102600000",
      "current_bid_amount": 0,
      "user_id": 4,
      "status": true
    }
  }
}
```

#### Update Auction

- **Endpoint:** `/api/graphql`
- **Method:** `POST`
- **Description:** Update the status of an auction.
- **Authorization:** Requires an Authorization header with a valid JWT token.
- **Query:**

```graphql
mutation ($id: ID!, $status: Boolean!) {
  updateAuctionStatus(id: $id, status: $status) {
    id
    title
    description
    category
    imageurl
    start_time
    end_time
    current_bid_amount
    user_id
    status
  }
}
```

- **Variables:**

```
{
    "id": 9,
    "status": false
}
```

##### Responses

- **200:**

```json
{
  "data": {
    "createAuction": {
      "id": "10",
      "title": "New Auction",
      "description": "This is a new auction",
      "category": "Electronics",
      "imageurl": "https://example.com/sample.jpg",
      "start_time": "1691728200000",
      "end_time": "1692102600000",
      "current_bid_amount": 0,
      "user_id": 4,
      "status": false
    }
  }
}
```

#### Get Auctions

- **Endpoint:** `/graphql`
- **Method:** `POST`
- **Description:** Retrieve a list of auctions.
- **Authorization:** Requires an Authorization header with a valid JWT token.
- **Query:**

```graphql
query {
  getAuctions(
    filter: ""
    limit: 10
    offset: 0
    sortby: "title"
    sortorder: "asc"
  ) {
    id
    title
    description
    category
    imageurl
    start_time
    end_time
    current_bid_amount
    user_id
    status
  }
}
```

##### Responses

- **200:**

```json
{
  "data": {
    "getAuctions": [
      {
        "id": "10",
        "title": "New Auction",
        "description": "This is a new auction",
        "category": "Electronics",
        "imageurl": "https://example.com/sample.jpg",
        "start_time": "1691728200000",
        "end_time": "1692102600000",
        "current_bid_amount": 0,
        "user_id": 4,
        "status": false
      }
    ]
  }
}
```

### Bids

#### Get Bids

- **Endpoint:** `/graphql`
- **Method:** `POST`
- **Description:** Retrieve a list of bids for a specific auction.
- **Authorization:** Requires an Authorization header with a valid JWT token.
- **Query:**

```graphql
query {
  getBids(
    auction_id: 2
    limit: 10
    offset: 0
    sortby: "bid_time"
    sortorder: "asc"
  ) {
    id
    user_id
    displayname
    email
    auction_id
    bid_amount
    bid_time
  }
}
```

##### Responses

- **200:**

```json
{
  "data": {
    "getBids": [
      {
        "id": "7",
        "user_id": 5,
        "displayname": "example",
        "email": "example@example.com",
        "auction_id": "11",
        "bid_amount": 10121.2,
        "bid_time": "1691771129514"
      }
    ]
  }
}
```

#### Create Bid

- **Endpoint:** `/graphql`
- **Method:** `POST`
- **Description:** Create a new bid for an auction.
- **Authorization:** Requires an Authorization header with a valid JWT token.
- **Query:**

```graphql
mutation ($input: BidInput!) {
  createBid(input: $input) {
    id
    user_id
    displayname
    email
    auction_id
    bid_amount
    bid_time
  }
}
```

- **Variables:**

```
{
  "input": {
    "auction_id": 2,
    "bid_amount": 10121.2
  }
}
```

##### Responses

- **200:**

```json
{
  "data": {
    "createBid": {
      "id": "7",
      "user_id": 5,
      "displayname": "example",
      "email": "example@example.com",
      "auction_id": "11",
      "bid_amount": 10121.2,
      "bid_time": "1691771129514"
    }
  }
}
```
