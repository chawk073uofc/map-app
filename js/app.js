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

ko.applyBindings(new RestaurantListViewModel());