var storage;

$(init);

function init() {

    //Third parameter has to do with event bubbling and
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady() {

    //Load the correct stylesheet, depending on device
    var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');

    if (cordova.platformid == 'ios') {
        node.setAttribute('href', 'css/park-it-ios.css');

        //prevent status bar from overlaying web view
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else {
        //Default code
        node.setAttribute('href', 'css/park-it-android.css');
        window.StatusBar.backgroundColorByHexString("#1565C0");
    }

    //What is happening here?
    $('head').appendChild(node);
}

function initMap() {
    var virginia = {lat: 37, lng: -78};
    var mapDiv = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: virginia
    });
    var marker = new google.maps.Marker({
        position: virginia,
        map: mapDiv
    });
}

$("#park").click(function() {
    setParkingLocation();
});

$("#retrieve").click(function() {
    alert('Get parking location');
});

$("#gotIt").click(function() {
    $("#instructions").hide();
});

function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(
        setParkingLocationSuccess,
        setParkingLocationError,
        { enableHighAccuracy:true }
        );
}

function setParkingLocationSuccess(position) {

    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);

    longitude = position.coords.longitude;
    storage.setItem("parkedLongitude", longitude);

    //Add statements to store the longitude

    //Display an alert that shows the latitude and longitude
    //Use navigator.notifications.alert(msg)


    showParkingLocation();
}

function setParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code
    + "\nErorr Message: " + error.message);
}

function showParkingLocation() {
    navigator.notification.alert("You are parked at Lat: "
    + storage.getItem("parkedLatitude")
    + ", Long: " + storage.getItem("parkedLongitude"));

    //hide directions and instructions
}