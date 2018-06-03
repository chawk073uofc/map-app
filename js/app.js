
class Restaurant{
    constructor(name, lat, long) {
        this.name = name;
        this.lat = lat;
        this.long = long;
    }
}

let testList;
let hardCodedRestaurantList = [
    new Restaurant('Treasures of Saigon', 51.060816, -114.179903),
    new Restaurant('Cafe MoMoKo', 51.063519, -114.194769),
    new Restaurant('A&W', 51.066708, -114.216300),
    new Restaurant('Diner Delux Aspen', 51.039878, -114.209179),
    new Restaurant('Edo Japan', 51.041403, -114.210483)
    ];
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