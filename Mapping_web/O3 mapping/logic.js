// Creating map object
var myMap = L.map("map", {
  center: [41.8789, -87.6359],
  zoom: 13
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Building API query URL
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";
var proxy = "https://cors-anywhere.herokuapp.com/";


// API for o3 data
var Ourl = "https://aqs.epa.gov/api/rawData?user=kbhambi@gmail.com&pw=indigoheron89&format=DMCSV&param=44201&bdate=20180601&edate=20180608&state=17&county=031";


// Assembling API query URL
var AQIurl = proxy+Ourl;


// Grabbing the data with d3..
d3.csv(AQIurl, function(response) {
  console.log(response);
  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();
  // console.log(response.length);
  // Loop through our data...
  for (var i = 0; i < response.length-1; i++) {
    // set the data location property to a variable
    var lat = response[i].Latitude;
    var long = response[i].Longitude;
    console.log(lat,long);
    // If the data has a location property...
    if (lat && long) {
      
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, long])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
