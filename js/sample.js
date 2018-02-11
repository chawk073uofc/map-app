'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'G3sTa-Thyp2ZuyHfMaLGrnUqrBFuri05MZ7VyaUiZPDB2A7SDLvU_Y0EiL_-ZEr0kAU02HkQ4RiXFIsQfQ1gipsK-IjPWV1WG4KzqHrrA4O98mQ61dZUQYbYaYRyWnYx';

const searchRequest = {
  term:'Mucho Burito',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});