# E@sy Shop is an app that helps us to add and manage wishlists

The application contain the following screens
Sign In/Sign Up
List of Wishilists
Add Wishlist modal
List of products
Add product


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the node server in the development mode.\

You can access API from "localhost:3007"

### `npm test`

Runs the unit tests of the application node server

### `npm run dev`

Start the node server and the react app in a development mode

The React app is related to the node app with proxy

Use can open the browser in http://localhost:3000 to see the web application


# App Description #

##  Sign in / Sign up Section 

* First time opening the app you have to sign up then sign in (sign up won't sign in directly to show the two functionalities)

You can sign in with your userName and password


## Wishlist Section 

* A user can add a wishlist when navigating to "/" throughout a modal which contain a required input name

* Just after adding the wishlist you can update its name by clicking on edit button or delete it by clicking on delete button

* A wishlist contains the list of products associated to it, you can view the product list as a table or a grid on clicking on one of the navigation buttons (list / grid)

* You can change the currency to see the price equal to the current currency in (USD, EUR or TND), by default it's TND

## Product Section 

* A user can add a product when navigating to "/products" throughout a modal which contain a form to complete (Only image is optional)

* To add an image you have to click on the default picture and add a new one

* Just after adding the product you can update its information by clicking on edit button or delete it by clicking on delete button

* A Product is realted to the wishlist pre-added

* You can change the currency to see the price equal to the current currency in (USD, EUR or TND), by default it's TND

### Bootstrap

This application uses bootstrap 4.6

## Why Bootstrap

Bootstrap is a complete features to be used for developing webpages in an easy and effective manner without much time requirement. It also includes many predefined libraries that came with adjoined styling and JavaScript rules with help to run the suitable class associated tag in proper structured manner.



### Deployment

This app is deployed on heroku, to see app in action please visit ["https://astrolab.herokuapp.com/"]

# API DOCUMENTATION #

## POST **/user/signup**

- Add a new user

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| email     | adresse mail|
| password  | password    |
| userName  | userName    |


## POST **/user/signin**

- Authenticate a user

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| sign_password  | password    |
| sign_userName  | userName    |

> Response will be an authcookie set with maximum age 1 day and httpOnly

## POST **/wishlist**

- Add a new wishlist 
- The name must be unique for a user

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| name      |wishlist name|


## GET **/wishlist**

- Get all wishlists for a specific user

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |


## GET **/wishlist/:id**

- Get a specific wishlist

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| id        | wishlist id |

## PUT **/wishlist/:id**

- Update a specific wishlist

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| id        | wishlist id |


## DELETE **/wishlist/:id**

- Delete a specific wishlist

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| id        | wishlist id |


## POST **/product**

- Add a new product 

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | multipart/form-data   |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter   | Description |
| ----------- | ----------- |
| name        | product name|
| description | description |
| price       |    price    |
| currency    |  currency   |
| wishlist    |   wishlist  |
| status      |   status    |
| image       |   file      | 

image is optional

## GET **/product**

- Get all products for a specific user

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |


## GET **/product/:id**

- Get a specific product

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| id        | product id  |

## PUT **/product/:id**

- Update a specific product

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter   | Description |
| ----------- | ----------- |
| id          | product id  |
| name        | product name|
| description | description |
| price       |    price    |
| currency    |  currency   |
| wishlist    |   wishlist  |
| status      |   status    |
| image       |   file      | 

image is optional
## DELETE **/product/:id**

- Delete a specific product

**Headers**

| Parameter    | Description           |
| ------------ | --------------------- |
| Content-Type | application/json      |
| Cookie       | MUST BE AUTHENTICATED |

**URL Parameters**

| Parameter | Description |
| --------- | ----------- |
| id        | product id  |


