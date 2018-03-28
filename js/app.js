
class Restaurant{
    constructor(name, long, lat) {
        this.name = name;
        this.long = long;
        this.lat = lat;
    }
}

//for testing
let testList;
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
    //start the server

    //get restaurants from Yelp via server
    //let restaurantData;
    fetch('http://localhost:3000/').then(response => {
        return response.blob();//.json.toString();
        // restaurantData = response;
        // console.log(restaurantData);
    }).then(blob => {
        let reader = new FileReader();
        reader.readAsText(blob);
        let restaurantData = reader.result;
        console.log(restaurantData);
        restaurantData.jsonBody.businesses.forEach(restaurant => console.log(restaurant.id));
    });
    //console.log(restaurantData);

}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.0601364, lng: -114.1827787},
        zoom: 15
    });
}

ko.applyBindings(new RestaurantListViewModel());