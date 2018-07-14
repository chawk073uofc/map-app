//TODO: get FS photo URL retrevals working again
// TODO:create KO observables:query string and selected restaurant(more than one selected and one time??)
//TODO:put restaurant data in view model object
//TODO: create KO bindings

class Restaurant{
    constructor(name, lat, lng, fsID) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.fsID = fsID;
        this.fsPhoto = null;
    this.mapMarker = null;//plain by default, null if filtered out, marker with info window (photo) if clicked
    }
}
let restaurantList = [
    new Restaurant('Treasures of Saigon', 51.060816, -114.179903, '4b6cce3cf964a520b3552ce3'),
    new Restaurant('Cafe MoMoKo', 51.063519, -114.194769, '4b6b7cacf964a520e50b2ce3'),
    new Restaurant('A&W', 51.066708, -114.216300, '54b1e0a7498e03abcc3fcbe4'),
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


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.052731, lng: -114.196777},
        zoom: 14
    });
    //Add a marker for each restaurant
    restaurantList.forEach(restaurant => {
        let marker = new google.maps.Marker({position: {lat: restaurant.lat, lng: restaurant.lng}, map: map});
        //marker.onclick = showFourSquarePhoto(restaurant, marker);
    });
}

function getFourSquarePhotos(restaurantList) {

    let fsEndPoint = 'https://api.foursquare.com/v2/venues/';
    let fsClientID = 'client_id=SFCIUOIIWV2VCYEHDNZJM2YZBDFKB0TIMPUNNL5ILGYLU1AQ';
    let fsSecret = '&client_secret=OYLZC4ZLIAK2E1MHEJ0C5ETO1Y0EJKCOYRECPLY4RFYD2L42';
    let fsVersionID = '&v=20161507';

    restaurantList.forEach(restaurant => {
        const fsVenueID = restaurant.fsID + '/?';
        console.log(fsVenueID);

        let fsURL = fsEndPoint + fsVenueID + fsClientID + fsSecret + fsVersionID;

        $.ajax({
            type: "GET",
            url: fsURL,
            dataType: "json",
            cache: false,
            success: function(data) {
                var response = data.response ? data.response : "";
                var venue = response.venue ? data.venue : "";
                restaurant.fsPhoto = response.venue.bestPhoto["prefix"] + "height150" +
                    response.venue.bestPhoto["suffix"];
            }
        });

    });
}

function showFourSquarePhoto(restaurant, marker) {
    console.log('hi');
    const img = document.createElement("<img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'>");
    //$(img).attr("src", restaurant.fsPhoto);
    $( "body" ).append(img);
}

getFourSquarePhotos(restaurantList);
ko.applyBindings(new RestaurantListViewModel());