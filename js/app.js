class Restaurant{
    constructor(name, long, lat) {
        this.name = name;
        this.long = long;
        this.lat = lat;
    }
}

//for testing
let hardCodedRestaurantList = [new Restaurant('Scooners', 1, 1), new Restaurant("CPL", 2, 2)];

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
}
ko.applyBindings(new RestaurantListViewModel());