class Restaurant{
    constructor(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
let restaurantList = [
    new Restaurant('Treasures of Saigon', 51.060816, -114.179903),
    new Restaurant('Cafe MoMoKo', 51.063519, -114.194769),
    new Restaurant('A&W', 51.066708, -114.216300),
    new Restaurant('Diner Delux Aspen', 51.039878, -114.209179),
    new Restaurant('Edo Japan', 51.041403, -114.210483)
    ];
var map;

function RestaurantListViewModel() {
    let self = this;

    self.searchTerm; //text entered by user for filter list
    self.restaurants = restaurantList;
    self.filterRestaurants = function() {};
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.0601364, lng: -114.1827787},
        zoom: 15
    });
    //Add a marker for each restaurant
    restaurantList.forEach(restaurant => {
        let marker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
    });
}

ko.applyBindings(new RestaurantListViewModel());