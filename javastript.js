var user = "";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function initMap(){
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

  var marker_origin;
	var marker_destination;

	async function Calculate(){
		if(marker_origin != null && marker_destination != null){
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
				if(user != "" && origin_enter.value != "" && destination_enter.value != ""){
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
		}
    else {
      console.log("Calculate: Both markers are null");
    }
	}


	var destination_value;
	var origin_value;
  google.maps.event.addListener(origin, 'place_changed', function () {
    if(document.getElementById('origin').value != "")
    {
      var place = origin.getPlace();
  		origin_value = document.getElementById('origin').value;

  		if(marker_origin == null)
  			marker_origin = new google.maps.Marker({map: map, visible: false});
    	marker_origin.setPosition(place.geometry.location);
  		marker_origin.setVisible();

    	map.setCenter(place.geometry.location);
    }
  });

	google.maps.event.addListener(destination, 'place_changed', function () {
    if(document.getElementById('destination').value != "")
    {
      var place = destination.getPlace();
    	destination_value = document.getElementById('destination').value;

    	if(marker_destination == null)
    		marker_destination = new google.maps.Marker({map: map, visible: false});
    	marker_destination.setPosition(place.geometry.location);
    	marker_destination.setVisible();

    	map.setCenter(place.geometry.location);
    }
	});

	var origin_enter = document.getElementById("origin");
	var destination_enter = document.getElementById("destination");
  var cars = document.getElementById("avti");

	origin_enter.addEventListener("keyup", async function(event) {
		if(event.keyCode === 13)
			event.preventDefault();
    if(document.getElementById('origin').value != "" && document.getElementById('destination').value != "" && cars.options[cars.selectedIndex] != undefined)
    {
  		await sleep(300);

  		if (document.getElementsByClassName("pac-container")[0].style.display == "none" && document.getElementsByClassName("pac-container")[1].style.display == "none" && event.keyCode === 13 && marker_destination != null && destination_enter.value != "") {
  			Calculate();
  			if(user != "" && liters != null)
  			{
  				document.getElementById('calculation').style.display="block";
          Path();
          History();
  			}
    	}
    }
    else {
      console.log("Value of markers not defined or car is not selected.");
    }
	});
	destination_enter.addEventListener("keyup", async function(event) {
		if(event.keyCode === 13)
			event.preventDefault();
    if(document.getElementById('origin').value != "" && document.getElementById('destination').value != "" && cars.options[cars.selectedIndex] != undefined)
    {
  		await sleep(300);

      if (document.getElementsByClassName("pac-container")[0].style.display == "none" && document.getElementsByClassName("pac-container")[1].style.display == "none" && event.keyCode === 13 && marker_origin != null && origin_enter.value != "") {
  			Calculate();
  			if(user != "" && liters != null)
  			{
  				document.getElementById('calculation').style.display="block";
          Path();
          History();
  			}
    	}
    }
    else {
      console.log("Value of markers not defined or car is not selected.");
    }
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
  document.getElementById('btn_del_car').onclick= function () {
		if(confirm("Are you sure?"))
    {
      DeleteUserCars();
    }
	}
	document.getElementById('btn_cal').onclick= function () {
    if(document.getElementById('origin').value != "" && document.getElementById('destination').value != "" && cars.options[cars.selectedIndex] != undefined)
    {
      Calculate();
  		if(user != "" && liters != null)
  		{
  			document.getElementById('calculation').style.display="block";
  			Path();
        History();
  		}
    }
    else {
      console.log("Value of markers not defined or car is not selected.");
    }
	}
	document.getElementById('btn_history').onclick= function () {
    ImportHistory();
		if(document.getElementById('btn_history').innerHTML == "Open history"){
			$(document.getElementById('sidebar')).animate({
	        left:'0px'
				})
			$(document.getElementById('mapContainer')).animate({
	        paddingLeft:'500px'
				})
      $(document.getElementById('title')).animate({
	        paddingLeft:'0px'
				})
			document.getElementById('btn_history').innerHTML = "Close history";
		}
		else {
			$(document.getElementById('sidebar')).animate({
	        left:'-250px'
				})
			$(document.getElementById('mapContainer')).animate({
	        paddingLeft:'250px'
				})
      $(document.getElementById('title')).animate({
	        paddingLeft:'250px'
				})
			document.getElementById('btn_history').innerHTML = "Open history";
		}
	}

	$('#regForm').submit(function () {
		Register();
		return false;
	});

	$('#logForm').submit(function () {
		Login(document.getElementById("logUsr").value, document.getElementById("logPsw").value);
		return false;
	});

	$('#vnoForm').submit(function () {
		Add_Update();
		return false;
	});
}

function Round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function ReadHistory(naziv, zacetna_lokacija, koncna_lokacija){
  document.getElementById("origin").value = zacetna_lokacija;
  document.getElementById("destination").value = koncna_lokacija;
  for(var i =  0; i < document.getElementById("avti").options.length; i++){
    if (document.getElementById("avti").options[i].text == naziv)
    {
      document.getElementById("avti").selectedIndex = i;
    }
  };
  document.getElementById('btn_cal').click(); //potrebno dopovedati textboxema, da mora besedilo vzeti kot autocomplete... da bosta markerja delala
}

function Register(){
	var username = document.getElementById("regUsr").value;
	var password = document.getElementById("regPsw").value;

	$.ajax({
    'url': './php/register.php',
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
            Login(username, password);
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


function Login(username, password){
	//var username = document.getElementById("logUsr").value;
	//var password = document.getElementById("logPsw").value;

	$.ajax({
    'url': './php/login.php',
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
            ImportHistory();
					}
					else
					{
						console.log("User not logged in.")
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Logging in...")
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

function Add_Update(){
	var name = document.getElementById("carName").value;
	var consumption = document.getElementById("consumption").value;

	console.log("Username: " + user);
	console.log("Name: " + name);
	console.log("Consumption: " + consumption);

	$.ajax({
    'url': './php/add_updateCar.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user, name: name, consumption: consumption},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.added == true && data.updated == false)
					{
						console.log("Car added.");
						document.getElementById('vnosForm').style.display = "none";
						ImportUserCars();
					}
					else if(data.added == false && data.updated == true)
					{
            console.log("Car updated.");
						document.getElementById('vnosForm').style.display = "none";
					}
          else {
            console.log("Something went wrong.");
          }
				}
			},
    'beforeSend': function()
			{
				console.log("Adding/Updating car.");
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
    'url': './php/importCar.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user},
    'success': function(data)
			{
        if (data[0] != undefined) {
          document.getElementById("avti").options[0] = new Option(data[0].naziv, data[0].poraba, true, false);

  				for(var i =  1; i < data.length; i++){
  					document.getElementById("avti").options[i] = new Option(data[i].naziv, data[i].poraba, false, false);
  				}

  				console.log("Cars fetched.");
        }
        else {
          console.log("No cars to fetch.");
        }

			},
    'beforeSend': function()
			{
				console.log("Fetching cars...");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function DeleteUserCars(){
  var name = document.getElementById("avti").options[document.getElementById("avti").selectedIndex].text;

	$.ajax({
    'url': './php/deleteCar.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user, name},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.deleted)
					{
						console.log("Car deleted."); //mora se osvežiti !!! - ne izbriše vizualno avta in zgodovine!
            ImportUserCars();
            ImportHistory();
					}
					else
					{
						console.log("Car not deleted.");
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Deleting car...");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function History(){
	var name = document.getElementById("avti").options[document.getElementById("avti").selectedIndex].text;
	var origin = document.getElementById("origin").value;
	var destination = document.getElementById("destination").value;

	console.log("Username: " + user);
	console.log("Name: " + name);
	console.log("Origin: " + origin);
	console.log("Destination: " + destination);

	$.ajax({
    'url': './php/history.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username:user, name, origin, destination},
    'success': function(data)
			{
				if(data.status)
				{
					if(data.added)
					{
						console.log("History added.");
            ImportHistory();
					}
					else
					{
						console.log("History not added.");
					}
				}
			},
    'beforeSend': function()
			{
				console.log("Adding history.");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function Path(){
	var origin = document.getElementById("origin").value;
	var destination = document.getElementById("destination").value;
	$.ajax({
    'url': './php/path.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username:user, origin, destination},
    'success': function(data)
			{
				if(data.pot_added)
				{
          console.log("Path was added.");
        }
        else {
          console.log("Path was not added.");
        }
        if (data.status_ori) {
          console.log("Origin: TRUE");
        }
        else {
          console.log("Origin: FALSE");
        }
        if (data.status_des) {
          console.log("Destination: TRUE");
        }
        else {
          console.log("Destination: FALSE");
        }
			},
    'beforeSend': function()
			{
				console.log("Adding path.");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}

function ImportHistory(){
	$.ajax({
    'url': './php/importHistory.php',
    'type': 'POST',
    'dataType': 'json',
    'data': {username: user},
    'success': function(data)
			{
        /*document.getElementById("avti").getElementsByTagName('option')[data[0].id_avtomobila].selected = 'selected'; !!! selecta pravilni avto*/
        var ul = document.getElementById("history");
        ul.innerHTML = "";
				for(var i =  0; i < data.length; i++){
          var li = document.createElement("li");
          var span = document.createElement("span");
          span.appendChild(document.createTextNode(data[i].naziv + ":   " +  (data[i].zacetna_lokacija).replace(", Slovenia", "") + " -> " + (data[i].koncna_lokacija).replace(", Slovenia", "")));
          span.setAttribute("class", "historySpan");
          li.appendChild(span);
          li.setAttribute("class", "historyEntry");
          li.setAttribute("onclick", "ReadHistory('" + data[i].naziv + "','" + data[i].zacetna_lokacija + "','" +data[i].koncna_lokacija + "');");
          ul.appendChild(li);
				}

				console.log("History fetched.");
			},
    'beforeSend': function()
			{
				console.log("Fetching history...");
			},
    'error': function(data)
      {
      // this is what happens if the request fails.
      	console.log(data);
    	}
	});
}
