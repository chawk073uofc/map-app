const YELP_API_KEY = 'G3sTa-Thyp2ZuyHfMaLGrnUqrBFuri05MZ7VyaUiZPDB2A7SDLvU_Y0EiL_-ZEr0kAU02HkQ4RiXFIsQfQ1gipsK-IjPWV1WG4KzqHrrA4O98mQ61dZUQYbYaYRyWnYx';
//const yelp = require('yelp-fusion');

class Restaurant{
    constructor(name, long, lat) {
        this.name = name;
        this.long = long;
        this.lat = lat;
    }
}

//for testing
let hardCodedRestaurantList = [new Restaurant('Scooners', 1, 1), new Restaurant("CPL", 2, 2)];
var map;

init();

function RestaurantListViewModel() {
    let self = this;

    self.searchTerm; //text entered by user for filter list
    self.restaurants = hardCodedRestaurantList;
    self.filterRestaurants = function() {};
}

/**
 * Initialize the app by getting a map of the neighbourhood and a list of restaurants in that
 * neighbourhood using Google and Yelp API calls.
 */
function init() {
    //get map form Google maps API

    //get restaurants from Yelp Fusion API

    'use strict';

    const yelp = require('yelp-fusion');

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

    // let yelpReqHeaders = new Headers();
    // yelpReqHeaders.append('Authorization', YELP_API_KEY);
    //
    // let yelpReqConfig ={headers: yelpReqHeaders, credentials: 'include', mode: 'cors'};//todo try cors, navigate, same-origin
    //
    // fetch("https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", yelpReqConfig) //todo add params
    //     .then(function(response) {
    //     return response.json();
    // }).then(function(restaurantsJSON) {
    //     //RestaurantListViewModel.restaurants = restaurantsJSON;
    //     console.log(restaurantsJSON);
    // });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.0601364, lng: -114.1827787},
        zoom: 15
    });
}

ko.applyBindings(new RestaurantListViewModel());