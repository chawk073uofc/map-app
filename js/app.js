
class Restaurant{
    constructor(name, lat, lng, fsID) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.fsID = fsID;
        this.fsPhoto = null;
        this.mapMarker = null;
    }
}

let restaurantList = [
    new Restaurant('Treasures of Saigon', 51.060816, -114.179903, '4b6cce3cf964a520b3552ce3'),
    new Restaurant('Cafe MoMoKo', 51.063519, -114.194769, '4b6b7cacf964a520e50b2ce3'),
    new Restaurant('A Ladybug Bakery and Cafe', 51.04134019638049, -114.21250662761257, '4b0586e9f964a520937422e3'),
    new Restaurant('Diner Delux Aspen', 51.039878, -114.209179, '5393e8ae498e14bd1c94c3df'),
    new Restaurant('Edo Japan', 51.041403, -114.210483, '4ba690e8f964a520e45e39e3')
    ];


var map;

function RestaurantListViewModel() {
    let self = this;
    self.selectedRestaurants = ko.observableArray(restaurantList);

    // filtering the restaurant list
    self.searchTerm = ko.observable();
    self.searchTerm.subscribe(function (term) {
        const lastCharOfSearchTerm = term[term.length -1].toLowerCase();
        self.selectedRestaurants().forEach(function (restaurant) {
            if(restaurant.name.toLowerCase()[term.length -1] != lastCharOfSearchTerm)
                self.selectedRestaurants.remove(restaurant);
            });
    });

    // if the user clicks a restaurant name, the corresponding map marker will bounce
    self.clickRestaurant = function (restaurant) {
        restaurant.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
    self.resetList = function () {
        ko.observableArray(restaurantList);
    }
}


function getInfoWindowContent(restaurant) {
    let contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + restaurant.name + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' +
        '<img src=\"' + restaurant.fsPhoto + '\" alt="Restaurant Photo" />' +
        '</p>' +
        '<p>Source: <a href="https://foursquare.com/">' +
        'https://foursquare.com/</a>'+
        '</p>' +
        '</div>' +
        '</div>';
    return contentString;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.052731, lng: -114.196777},
        zoom: 14
    });

    //Add a marker for each restaurant
    restaurantList.forEach(restaurant => {
        restaurant.mapMarker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
        let infowindow = new google.maps.InfoWindow();
        restaurant.mapMarker.addListener('click', function() {
            infowindow.setContent(getInfoWindowContent(restaurant));
            infowindow.open(map, restaurant.mapMarker);
        });
    });
}

function getFourSquarePhotos(restaurantList) {

    const fsEndPoint = 'https://api.foursquare.com/v2/venues/';
    const fsClientID = 'client_id=SFCIUOIIWV2VCYEHDNZJM2YZBDFKB0TIMPUNNL5ILGYLU1AQ';
    const fsSecret = '&client_secret=OYLZC4ZLIAK2E1MHEJ0C5ETO1Y0EJKCOYRECPLY4RFYD2L42';
    const fsVersionID = '&v=20161507';

    restaurantList.forEach(restaurant => {
        const fsVenueID = restaurant.fsID + '/?';
        const fsURL = fsEndPoint + fsVenueID + fsClientID + fsSecret + fsVersionID;

        $.ajax({
            type: "GET",
            url: fsURL,
            dataType: "json",
            cache: false,
            success: function(data) {
                let response = data.response ? data.response : "";
                let venue = response.venue ? data.venue : "";
                restaurant.fsPhoto = response.venue.bestPhoto["prefix"] + "height150" +
                    response.venue.bestPhoto["suffix"];
            }
        });

    });
}

getFourSquarePhotos(restaurantList);
ko.applyBindings(new RestaurantListViewModel());