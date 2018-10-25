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
  	map: map,
		visible: true
  });
	var marker_destination = new google.maps.Marker({
  	map: map,
		visible: true
  });
	function Calculate(){
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
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		    {
		        origins: [marker_origin.getPosition()],
		        destinations: [marker_destination.getPosition()],
		        travelMode: google.maps.TravelMode.DRIVING,
		        avoidHighways: false,
		        avoidTolls: false
		    },
		    callback
		);
		/* 1.35 cena goriva*/
		function callback(response, status) {
				var cars = document.getElementById("avti");
				var selected_car_consumption = cars.options[cars.selectedIndex].value;
		    var liters = document.getElementById("liters");
		    var euros = document.getElementById("euros");
		    if(status=="OK") {
		        var distance = (response.rows[0].elements[0].distance.value) / 1000;
						var kilo = response.rows[0].elements[0].distance.text;
						liters = (selected_car_consumption * distance) / 100;
						euros = liters * 1.35;
						document.getElementById("distance").innerHTML = "Distance: " + kilo;
						document.getElementById("liters").innerHTML = "Consumption: " + Round(liters, 2) + " l";
						document.getElementById("euros").innerHTML = "Est. cost: " + Round(euros, 2) + " €";
		    } else {
		        alert("Error: " + status);
		    }
		}
	}
	var destination_value;
	var origin_value;
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
/* fix kdaj se aktivira in zdaj ne !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
	/*var origin_enter = document.getElementById("origin");
	var destination_enter = document.getElementById("destination");
	origin_enter.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && marker_destination.getVisible() == true) {
			document.getElementById('calculation').style.display="block";
			Calculate();
    }
	});
	destination_enter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 && marker_origin.getVisible() == true) {
			document.getElementById('calculation').style.display="block";
			Calculate();
  }
});*/
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
	var modal_vno = document.getElementById('vnosForm');
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal_reg) {
	        modal_reg.style.display = "none";
	    }
	    else if (event.target == modal_log) {
	        modal_log.style.display = "none";
	    }
			else if (event.target == modal_vno) {
	        modal_vno.style.display = "none";
	    }
	}

	document.getElementById('btn_reg').onclick= function () {
		document.getElementById('registerForm').style.display="block";
		modal_log.style.display = "none";
		modal_vno.style.display = "none";
	}
	document.getElementById('btn_log').onclick= function () {
		document.getElementById('loginForm').style.display="block";
		modal_reg.style.display = "none";
		modal_vno.style.display = "none";
	}
	document.getElementById('btn_vnos').onclick= function () {
		document.getElementById('vnosForm').style.display="block";
		modal_log.style.display = "none";
		modal_reg.style.display = "none";
	}
	document.getElementById('btn_cal').onclick= function () {
		document.getElementById('calculation').style.display="block";
		Calculate();
	}

	$('#regForm').submit(function () {
		Register();
		return false;
	});

	$('#logForm').submit(function () {
		Login();
		return false;
	});

	$('#vnoForm').submit(function () {
		Vnos();
		return false;
	});
}

function Round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function Register(){
	var username = document.getElementById("regUsr").value;
	var password = document.getElementById("regPsw").value;

	$.ajax({
    'url': 'php/register.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: username, password: password},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.added)
					{
						console.log("User registered.")
						document.getElementById('registerForm').style.display = "none";
					}
					else
					{
						console.log("User not registered.")
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Registering user.")
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

var user = "";

function Login(){
	var username = document.getElementById("logUsr").value;
	var password = document.getElementById("logPsw").value;

	$.ajax({
    'url': 'php/login.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: username, password: password},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.accepted)
					{
						console.log("User logged in.")
						var loginElements = document.getElementsByClassName("login");
						var i;
						for(i = 0; i < loginElements.length; i++){
							loginElements[i].style.display = "block";
						}
						var noLoginElements = document.getElementsByClassName("noLogin");
						var i;
						for(i = 0; i < noLoginElements.length; i++){
							noLoginElements[i].style.display = "none";
						}
						document.getElementById('loginForm').style.display = "none";

						user = data.username;

						ImportUserCars();
					}
					else
					{
						console.log("User not logged in.")
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Logging in.")
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function Logout(){
	console.log("User logged out.");
	document.getElementById('calculation').style.display="none";
	var loginElements = document.getElementsByClassName("login");
	var i;
	for(i = 0; i < loginElements.length; i++){
		loginElements[i].style.display = "none";
	}
	var noLoginElements = document.getElementsByClassName("noLogin");
	var i;
	for(i = 0; i < noLoginElements.length; i++){
		noLoginElements[i].style.display = "block";
	}
}

function Vnos(){
	var name = document.getElementById("carName").value;
	var consumption = document.getElementById("consumption").value;

	console.log("Username: " + user);
	console.log("Name: " + name);
	console.log("Consumption: " + consumption);

	$.ajax({
    'url': 'php/vnos.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user, name: name, consumption: consumption},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.added)
					{
						console.log("Car added.");
						document.getElementById('vnosForm').style.display = "none";
						ImportUserCars();
					}
					else
					{
						console.log("Car not added.");
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Adding car.");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function ImportUserCars(){
	$.ajax({
    'url': 'php/avti.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user},
    'success': function(data)
			{
				document.getElementById("avti").options[0] = new Option(data[0].naziv, data[0].poraba, true, false);

				console.log(data);

				for(var i =  1; i < data.length; i++){
					document.getElementById("avti").options[i] = new Option(data[i].naziv, data[i].poraba, false, false);
				}
			},
    'beforeSend': function()
			{
				console.log("Adding car.")
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});


}
