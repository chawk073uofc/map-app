'use strict';
let restaurantData = getRestaurantData();

// Taken form https://nodejs.org/en/docs/guides/getting-started-guide/
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    //console.log(getRestaurantData());
    //restaurantData.forEach(restaurant => console.log(restaurant.id));

    //res.write('returned from node');
   // console.log(restaurantData);
    res.end(restaurantData.toString());
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getRestaurantData()
{
    const yelp = require('yelp-fusion');
    const apiKey = 'G3sTa-Thyp2ZuyHfMaLGrnUqrBFuri05MZ7VyaUiZPDB2A7SDLvU_Y0EiL_-ZEr0kAU02HkQ4RiXFIsQfQ1gipsK-IjPWV1WG4KzqHrrA4O98mQ61dZUQYbYaYRyWnYx';
    const searchRequest = {
        term: 'food',
        location: 'T3H1V8'
    };
    const client = yelp.client(apiKey);
    client.search(searchRequest).then(response => {
        restaurantData = response;//.jsonBody.businesses;

        //test
        restaurantData.jsonBody.businesses.forEach(restaurant => console.log(restaurant.id));
    }).catch(e => {
        console.log(e);
    });



}