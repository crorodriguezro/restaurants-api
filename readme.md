# Restaurants
Rest API that finds restaurants by city or coordinates.

The API connects with Zomato API.

## UPDATE 08/Nov
The dependency `uuid` was missing from package.json. The package.json was updated to fix this.

## Features
- Login
- Sign up
- Transaction Log
- Search restaurants by coordinates
- Search restaurants by city
- Postman collection

## Getting started
Install dependencies
```
npm install
```
Starting the server
```
npm start
```

## Technologies used
The project was build using Express.js, Typescript, TypeORM y Axios. 

The starting point of this API is `src/index.ts`. In this file TypeORM is initialized and some middlewares are added.

##Project details
### Controllers
Requests are handled by three controllers, Auth, Restaurants ad Transactions.

The login endpoint is located in the Auth controller. This endpoints returns a jwt that is used to authenticated the user.

### Entities
There are two entities, Transaction and User. This entities entities are used by TypeORM to create repositories and tables.

### Middlewares
checkJwt: Is used to check the jwt.
transactions: Is used to save each request to the restaurant endpoint.

### Services
There is one service, RestaurantService that consumes the Zomato API.

### Postman Collection
The api can be tested using the PostmanCollection `Tyba.postman_collection.json`

TypeORM is set up to use a sqlite data base. 

## TODO
- Docker
- Testing
