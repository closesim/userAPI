# userAPI

## Configure app

Usar .env.example para generar un propio .env

## Run test and coverage

    $ npm test

## Running the project

    $ docker-compose build
    $ docker-compose up

## Default API URL: 

    localhost:3000/api/healthcheck
    localhost:3000/api/user/login
    localhost:3000/api/user/create
    localhost:3000/api/avr-data/search
    localhost:3000/api/user/logout
    localhost:3000/api/user/transactions


## Create User


curl --location --request POST 'localhost:3000/api/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "ttttttt5",
    "password": "passwordTest"
}'

## Login User

curl --location --request POST 'localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "ttttttt5",
    "password": "passwordTest"
}'

## Search

curl --location --request POST 'localhost:3000/api/avr-data/search' \
--header 'Authorization: Bearer xxxxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "lat": -54.810,
    "lon": -68.315,
    "radius": 100
}'

## Transactions logged user

curl --location --request GET 'localhost:3000/api/user/transactions' \
--header 'Authorization: Bearer xxxxx'


## Logout

curl --location --request POST 'localhost:3000/api/user/logout' \
--header 'Authorization: Bearer xxxxx'