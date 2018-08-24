// TODO:create KO observables:query string and selected restaurant(more than one selected at one time??)

class Restaurant{
    constructor(name, lat, lng, fsID) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.fsID = fsID;
        this.fsPhoto = null;
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

    self.searchTerm; //text entered by user for filter list
    self.restaurants = restaurantList;
    self.filterRestaurants = function() {};
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

    // let infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });

    //Add a marker for each restaurant
    restaurantList.forEach(restaurant => {
        let marker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
        let infowindow = new google.maps.InfoWindow();
        marker.addListener('click', function() {
            infowindow.setContent(getInfoWindowContent(restaurant));
            infowindow.open(map, marker);
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
                var venue = response.venue ? data.venue : "";
                restaurant.fsPhoto = response.venue.bestPhoto["prefix"] + "height150" +
                    response.venue.bestPhoto["suffix"];
            }
        });

    });
}

getFourSquarePhotos(restaurantList);
ko.applyBindings(new RestaurantListViewModel());