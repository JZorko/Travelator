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
	function calculate(){
		var request = {
			origin: marker_origin.getPosition(),
			destination: marker_destination.getPosition(),
			travelMode: 'DRIVING'
		};
		directionService.route(request, function(result, status){
			if (status == "OK"){
				directionDisplay.setDirections(result);
			} else {
				alert("Something went wrong!");
			}
		});
		/*alert(origin_value + "\n" + destination_value);*/
	}
  google.maps.event.addListener(origin, 'place_changed', function () {
  	var place = origin.getPlace();
		origin_value = document.getElementById('origin').value;
  	marker_origin.setPosition(place.geometry.location);
  	map.setCenter(place.geometry.location);
  });
	google.maps.event.addListener(destination, 'place_changed', function () {
  	var place = destination.getPlace();
		destination_value = document.getElementById('destination').value;
  	marker_destination.setPosition(place.geometry.location);
  	map.setCenter(place.geometry.location);
	});
	var destination_value;
	var origin_value;
	var origin_enter = document.getElementById("origin");
	var destination_enter = document.getElementById("destination");
	origin_enter.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
			calculate();
    }
	});
	destination_enter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
			calculate();
  }
	});
	document.getElementById('origin').onchange=change;
	document.getElementById('destination').onchange=change;
	function change(e){
	    if(!e){e=window.event;}
			if(this.id == "origin" && destination_value != "undefined") {
				calculate();
			}
			else if(this.id == "destination" && destination_value != "undefined") {
				calculate();
			}
	}
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
		calculate();
	};
}
