# Shop App - Fullstack MERN 

## Overview


This comprehensive MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application, equipped with Vite for frontend efficiency and Nodemon for seamless server restarts, offers users a dynamic platform for product exploration, cart management, and secure checkout. Boasting user authentication for personalized experiences, the application also grants admin privileges for enhanced product and order management. Drawing inspiration from Laravel, it incorporates features like seeders for automated data generation, a route list for dynamic route visibility, and custom commands for streamlined task execution, culminating in a robust and developer-friendly e-commerce solution.

- [Features](#features)
- [Usage](#Usage)
- [License](#license)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination (in progress 🔥)
- Product search feature (in progress 🔥)
- User profile with orders 
- Admin product management 
- Admin user management (in progress 🔥)
- Admin Order details page 
- Mark orders as delivered option 
- Checkout process (shipping, payment method, etc) 
- PayPal / credit card integration 
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
JWT_SECRET = '******'
PAYPAL_CLIENT_ID= 'get it from paypalsandbox'=> [paypal docs](https://developer.paypal.com/){:target="_blank"}

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
For an easy way to see all routes with their methods, paths, and their respective controllers.

```
# Display all routes
npm run list

``` 
### Testing The api 
If you want just to see the api work flow and all it features you can follow the stracture i put in "The_shop/backend/postman" you have more controll and clean workspace 

```
# Run just the server side 
npm run server

# Create a workspace
# Create the collections (don't forget the env )
# Enjoy your surfing

```


## License

The MIT License

Copyright (c) 2023 Abdessalam Ouazri
