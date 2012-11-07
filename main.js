//Google Maps Module
var points = {
	myLocation:[36.05178307933835, 42.49737373046878]

};

var currentLocation = new google.maps.LatLng(points.myLocation[0], points.myLocation[1]);

var myOptions = {
	zoom:5,
	center: currentLocation,
	mapTypeId: google.maps.MapTypeId.ROADMAP // Can also do SATELLITE
};
var map = new google.maps.Map(document.getElementById('map'), myOptions);

var marker = new google.maps.Marker({
	position: currentLocation,
	title: 'Start Position',
	icon: 'http://www.google.com/gmm/images/blue_dot_circle.png'
});
marker.setMap(map);

//Twitter Module
(function() {
$('#tweets').html('<img src="ajax-loader.gif">');
	
	$.ajax({
		url: 'load_tweets.php',
		success: function(response) {
			$('#tweets').html(response);
		},
		error: function(err1, err2, err3) {
			console.log(err1, err2, err3);
		}
	});

})();

//Concert List Module
var script = document.createElement('script');
script.src = "http://api.eventful.com/json/events/search?c=music&app_key=NdJkBjd49xZrQ4Fs&page_number=1&date=Future&keywords=linkin+park&callback=processJSONP";
//var key = "NdJkBjd49xZrQ4Fs";
document.getElementsByTagName('head')[0].appendChild(script);

function processJSONP(data) {
	//Handlebars is a global object when using handlebars
	var templateString = document.getElementById('concertList-template').innerHTML;
	var template = Handlebars.compile(templateString);
	var html = "";
	var markerd;
	
	for( var i = 0; i < data.events.event.length; i++ ) {
		console.log("Latitude: " + data.events.event[i].latitude);
		console.log("Longtitude: " + data.events.event[i].longitude);
		markerd = new google.maps.Marker({
				position: new google.maps.LatLng(data.events.event[i].latitude, data.events.event[i].longitude),
				title: data.events.event[i].venue_name,
			});
		//console.log(markerd);
			// To add the marker to the map, call setMap() on the marker object;
		markerd.setMap(map);
		html += template(data.events.event[i]);
	}

	document.getElementById('showConcert').innerHTML = html;

};