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

let fsID = SFCIUOIIWV2VCYEHDNZJM2YZBDFKB0TIMPUNNL5ILGYLU1AQ;
let fsSecret = OYLZC4ZLIAK2E1MHEJ0C5ETO1Y0EJKCOYRECPLY4RFYD2L42;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.052731, lng: -114.196777},
        zoom: 14
    });
    //Add a marker for each restaurant
    restaurantList.forEach(restaurant => {
        let marker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
    });
}

ko.applyBindings(new RestaurantListViewModel());