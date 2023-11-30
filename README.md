# Shop App - Fullstack MERN 

## Overview

This repository contains the source code for a fullstack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application with Vite for the frontend and Nodemon for automatic server restarts during development. The application allows users to browse products, add them to the cart, and complete the purchase process.

- [Features](#features)
- [Usage](#Usage)

- [License](#license)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination (in progress 🔥)
- Product search feature (in progress 🔥)
- User profile with orders (in progress 🔥)
- Admin product management (in progress 🔥)
- Admin user management (in progress 🔥)
- Admin Order details page (in progress 🔥)
- Mark orders as delivered option (in progress 🔥)
- Checkout process (shipping, payment method, etc) (in progress 🔥)
- PayPal / credit card integration (in progress 🔥)
- Database seeder (products & users) 

## Usage
-Create a MongoDB database and obtain your `MongoDB URI`
### Env File
Rename the `.env.example` file to `.env` and add the following
Or
create a `.env` file and fill it with the following 
```
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

``` 
+ The JWT_SECRET is changable 

### Install Dependecies (frontend & backend)

```
npm i 
cd frontend
npm i

``` 
### Run

```
# Run the backend [:5000] & frontend [:5173]
npm run serve

# Run only the backend (for testing)
npm run server

``` 
### Seed Database
You can use this commands for seed your database with dummy data or even destroy all data from it 
```
# Seed Database 
npm run seeder

# Destroy data 
npm run data:destroy

``` 
### Routes List
For an easy way the see all routes with methods and the path plus the controller of it 

```
# Display all routes
npm run list

``` 


## License

The MIT License

Copyright (c) 2023 Abdessalam Ouazri