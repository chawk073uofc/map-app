// Set up the Google Map using the Google Maps API.
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.052731, lng: -114.196777},
        zoom: 14
    });

    //Add a marker for each restaurant.
    restaurantList.forEach(restaurant => {
        restaurant.mapMarker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
        restaurant.mapMarker.addListener('click', function(){ showPlaceInfo(restaurant); });
    });
}

//Class to encapsulate restaurant data.
class Restaurant{
    constructor(name, lat, lng, fsID) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.fsID = fsID;
        this.fsPhoto = null;
        this.mapMarker = null;
        this.infoWindow= null;
    }
}

//Raw data for the restaurants. Other data will be fetched from the internet using the FourSquare API.
let restaurantList = [
    new Restaurant('Treasures of Saigon', 51.060816, -114.179903, '4b6cce3cf964a520b3552ce3'),
    new Restaurant('Cafe MoMoKo', 51.063519, -114.194769, '4b6b7cacf964a520e50b2ce3'),
    new Restaurant('A Ladybug Bakery and Cafe', 51.04134019638049, -114.21250662761257, '4b0586e9f964a520937422e3'),
    new Restaurant('Diner Delux Aspen', 51.039878, -114.209179, '5393e8ae498e14bd1c94c3df'),
    new Restaurant('Edo Japan', 51.041403, -114.210483, '4ba690e8f964a520e45e39e3')
    ];

//The view model for this web app. Uses the KnockoutJS framework.
function RestaurantListViewModel() {
    let self = this;
    self.selectedRestaurants = ko.observableArray(restaurantList);
    let jsArray = self.selectedRestaurants();//debug
    // list filtering
    self.searchTerm = ko.observable();
    self.searchTerm.subscribe(function (term) {
        if (term.length >= 1) {
            const termIndex = term.length - 1; // used for matching
            const lastCharOfSearchTerm = term[termIndex].toLowerCase();
            const unmatchedRestaurants = self.selectedRestaurants.remove(function (r) {
                return lastCharOfSearchTerm != r.name[termIndex].toLowerCase();
            });
            hideMapPlaces(unmatchedRestaurants);
        } else {
            $("#clear-button").click();
        }
    });

    // If the user clicks a restaurant name, the corresponding map marker will bounce and the info window will open
    self.clickRestaurant = showPlaceInfo;
    self.resetList = function () {
        self.selectedRestaurants = ko.observableArray(restaurantList);
    };
}

//Apply the Knockout.js bindings.
ko.applyBindings(new RestaurantListViewModel());


//Build an info window displaying the restaurant's name and a photo from Four Square.
// Adapted from code found on the Google Maps Platform developer site (https://developers.google.com/maps/documentation/).
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

//Get restaurant photos using the Four Square API.

getFourSquarePhotos(restaurantList);

function getFourSquarePhotos(restaurantList) {

    const fsEndPoint = 'https://api.foursquare.com/v2/venues/';
    const fsClientID = 'client_id=SFCIUOIIWV2VCYEHDNZJM2YZBDFKB0TIMPUNNL5ILGYLU1AQ';
    const fsSecret = '&client_secret=OYLZC4ZLIAK2E1MHEJ0C5ETO1Y0EJKCOYRECPLY4RFYD2L42';
    const fsVersionID = '&v=20161507';

    let fsErrorMsgAdded = false;

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
            },
            error: function () {
                if(!fsErrorMsgAdded) {
                    $("<p>Unable to load FourSquare photos. Please check your internet connection and try again later.</p>").insertAfter("h1");
                    fsErrorMsgAdded = true;
                }
            }
        });

    });
}

/*
HELPER FUNCTIONS FOR MANIPULATING THE INFORMATION SHOWN ABOUT RESTAURANTS
*************************************************************************
*/

//Display info window for the given restaurant when selected. Close all other windows.
function showPlaceInfo(restaurant) {
    hideInfoWindows(restaurantList);
    stopMapMarkerAnimations(restaurantList);
    restaurant.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
    if (restaurant.infoWindow == null) {
        restaurant.infoWindow = new google.maps.InfoWindow();
        restaurant.infoWindow.setContent(getInfoWindowContent(restaurant));
    }
    restaurant.infoWindow.open(map, restaurant.mapMarker);
}

//Hide all map markers and close all info windows for the given restaurants.
function hideMapPlaces(restaurants) {
    hideMapMarkers(restaurants);
    hideInfoWindows(restaurants);
}

//Close all info windows for the given restaurants.
function hideInfoWindows(restaurants) {
    restaurants.forEach(restaurant => {
        if (restaurant.infoWindow)
            restaurant.infoWindow.close();
    });
}

//Stops map markers for the given restaurants from bouncing.
function stopMapMarkerAnimations(restaurants) {
    restaurants.forEach(restaurant => {
        restaurant.mapMarker.setAnimation(null);
    });
}

//Hide all map markers the given restaurants.
function hideMapMarkers(restaurants) {
    restaurants.forEach(restaurant => {
        restaurant.mapMarker.setVisible(false);
    });
}