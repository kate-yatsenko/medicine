Medicine
======
High Quality Medical platform

## Install
* npm 6.9.0
* Node.js 11.14.0
* yarn

## Setup project
#### From frontend folder:
```
yarn install
yarn start
```
    
#### From backend folder:
Assuming you have configured the database.
See [SQL file](/backend/src/db/db.sql)
```
# create .env file
cp .env.exmaple .env

# replace parameters with real
nano .env

# install dependencies and run
npm i
npm start
```
    
## Description:

#### Api:
   * Description of all endpoints [Postman Collection](https://documenter.getpostman.com/view/6906588/S1ETScEr)

#### In the Medcard you can:
   * GoogleAuth with [React Google Login](https://www.npmjs.com/package/react-google-login)
   * fill and change profile
   * view medical records
   * create new medical record
   * search for a doctor / patient 
   
#### In the Chat you can (created with [Socket.io Client](https://www.npmjs.com/package/socket.io-client) + [Socket.io](https://www.npmjs.com/package/socket.io)):
   * chat with patients / doctors
   * view message history
   * receive SMS notification
   * view the number of unread SMS
   * see who read your SMS
   * view all contacts and chat list
   * search for the contact you need
   
#### In the Map you can(created with [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api)):
   * find closest to your location healthcare places:
        * location can be get from navigator.geolocation or from input address
        * search can be run with approximate search radius option in range 100m - 5km (default - 500m)
   * search dentist or pharmacy
   * filter found places by name.
   * view information about place address, rating and it’s types from Google Places
   
###### Note: selected on list place is centered on map
   




