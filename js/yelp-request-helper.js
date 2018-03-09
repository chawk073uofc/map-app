'use strict';

// Taken form https://nodejs.org/en/docs/guides/getting-started-guide/
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


const yelp = require('yelp-fusion');

const apiKey = 'G3sTa-Thyp2ZuyHfMaLGrnUqrBFuri05MZ7VyaUiZPDB2A7SDLvU_Y0EiL_-ZEr0kAU02HkQ4RiXFIsQfQ1gipsK-IjPWV1WG4KzqHrrA4O98mQ61dZUQYbYaYRyWnYx';

const searchRequest = {
  //latitude: 51.0601364,
    //longitude: -114.1827787,
  term:'food',
  location: 'T3H1V8'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
const restaurants = response.jsonBody.businesses;
restaurants.forEach(restaurant => )
  //const firstResult = response.jsonBody.businesses[0];
 // const prettyJson = JSON.stringify(firstResult, null, 4);
 // console.log(prettyJson);
}).catch(e => {
  console.log(e);
});