function initMap() {
	var options = {
		zoom: 12,
		disableDefaultUI: true,
		zoomControl: true,
	}
	var directionService = new google.maps.DirectionsService;
	var directionDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('map'), options);
	directionDisplay.setMap(map);
	var acOptions = {
  	types: ['establishment']
  };
  var origin = new google.maps.places.Autocomplete(document.getElementById('origin'));
	var destination = new google.maps.places.Autocomplete(document.getElementById('destination'));
  origin.bindTo('bounds', map);
	destination.bindTo('bounds', map);
  var infoWindow = new google.maps.InfoWindow();
  var marker_origin = new google.maps.Marker({
  	map: map
  });
	var marker_destination = new google.maps.Marker({
  	map: map
  });
  google.maps.event.addListener(origin, 'place_changed', function () {
  	infoWindow.close();
  	var place = origin.getPlace();
  	marker_origin.setPosition(place.geometry.location);
  	map.setCenter(place.geometry.location);
  });
	google.maps.event.addListener(destination, 'place_changed', function () {
  	infoWindow.close();
  	var place = destination.getPlace();
  	marker_destination.setPosition(place.geometry.location);
  	map.setCenter(place.geometry.location);
	});
  if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(
    		function(position) {
            var pos = {
              	lat: position.coords.latitude,
              	lng: position.coords.longitude
            };
            map.setCenter(pos);
          	},
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        }
  	);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  // This event listener calls addMarker() when the map is clicked.
  var modal_reg = document.getElementById('registerForm');
	var modal_log = document.getElementById('loginForm');
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal_reg) {
	        modal_reg.style.display = "none";
	    }
	    else if (event.target == modal_log) {
	        modal_log.style.display = "none";
	    }
	}

	document.getElementById('btn_reg').onclick= function () {
		document.getElementById('registerForm').style.display="block";
		modal_log.style.display = "none";
	}
	document.getElementById('btn_log').onclick= function () {
		document.getElementById('loginForm').style.display="block";
		modal_reg.style.display = "none";
	}
	document.getElementById('btn_cal').onclick= function () {
		var request = {
			origin: marker_origin.getPosition(),
			destination: marker_destination.getPosition(),
			travelMode: 'DRIVING'
		};
		directionService.route(request, function(result, status){
			if (status == "OK"){
				directionDisplay.setDirections(result);
			}
		});
	}
}
