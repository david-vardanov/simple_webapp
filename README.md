# Simple WebApp

This project is a simple web application built using Node.js, Express, and PostgreSQL with Sequelize ORM. It demonstrates basic CRUD operations with an emphasis on transactional integrity and concurrency handling. The main feature is a user balance management system that ensures atomic updates to prevent race conditions.

## Table of Contents

- [Simple WebApp](#simple-webapp)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [PUT /users/balanceIncrease](#put-usersbalanceincrease)
    - [PUT /users/balanceDecrease](#put-usersbalancedecrease)
    - [GET /users/:userId](#get-usersuserid)
  - [Testing](#testing)
  - [Project Structure](#project-structure)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/david-vardanov/test_webapp.git
   cd simple-webapp
   ```

2. **Install the dependencies:**

   ```sh
   npm install
   ```

3. **Set up the PostgreSQL database:**

   Ensure you have PostgreSQL installed and running. Create a database named `simple-webapp` and update the database configuration in `src/config/database.js` if necessary.

4. **Run migrations:**

   ```sh
   npm run migrate:up
   ```

## Usage

1. **Start the server:**

   ```sh
   npm start
   ```

   The server will start on `http://localhost:3000`.

2. **API Endpoints:**

   - Increase User Balance:

     ```sh
     curl -X PUT "http://localhost:3000/users/balanceIncrease?userId=1&amount=1000"
     ```

   - Decrease User Balance:

     ```sh
     curl -X PUT "http://localhost:3000/users/balanceDecrease?userId=1&amount=2"
     ```

   - Get User Details:
     ```sh
     curl -X GET "http://localhost:3000/users/1"
     ```

## API Endpoints

### PUT /users/balanceIncrease

Increases the balance of a specified user.

- **Query Parameters:**

  - `userId` (integer): The ID of the user.
  - `amount` (integer): The amount to increase.

- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if parameters are missing or invalid.

### PUT /users/balanceDecrease

Decreases the balance of a specified user, ensuring it doesn't go negative.

- **Query Parameters:**

  - `userId` (integer): The ID of the user.
  - `amount` (integer): The amount to decrease.

- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if parameters are missing or invalid, or if funds are insufficient.

### GET /users/:userId

Fetches details of a specified user.

- **Path Parameters:**

  - `userId` (integer): The ID of the user.

- **Response:**
  - `200 OK` on success.
  - `404 Not Found` if user does not exist.

## Testing

The project includes a stress test script to simulate concurrent balance update requests.

1. **Run the stress test:**

   ```sh
   node massTest.js
   ```

   This will send 10,000 requests to decrease the balance by 2 units each and log the results.

## Project Structure
