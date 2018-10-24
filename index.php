<html>
	<head>
		<title>Geolocation</title>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<script
		  src="https://code.jquery.com/jquery-3.3.1.js"
		  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
		  crossorigin="anonymous">
		</script>
		<script src="javastript.js"></script>
		<script async defer
			src="https://maps.googleapis.com/maps/api/js?&libraries=places&language=en&key=AIzaSyAgzg9aHr0OQsdnBoL2KmlB80b7rKQD7CU&callback=initMap">
		</script>
	</head>
	<body>
	<div id="register">
		<div id="registerForm" class="modal">
		  <form id="regForm" class="modal-content" method="post">
		    <div class="container">
		      <h1>Register</h1>
		      <p>Please fill in this form to create an account.</p>
		      <hr>
		      <label for="email"><b>Username</b></label>
		      <input type="text" placeholder="Enter Username" name="regUsr" id="regUsr" required>

		      <label for="psw"><b>Password</b></label>
		      <input type="password" placeholder="Enter Password" name="regPsw" id="regPsw" required>

					<input type="submit" value="Register">
				</div>
				<div class="container" style="background-color:#f1f1f1">
					<button type="button" onclick="document.getElementById('registerForm').style.display='none'"
						class="cancelbtn">Cancel</button>
		    </div>
		  </form>
		</div>
	</div>

	<div id="login">
		<div id="loginForm" class="modal">
		  <form id="logForm" class="modal-content" onsubmit="Login()" method="post">
		    <div class="container">
		    	<h1>Login</h1>
		    	<p>Please fill in this form to login.</p>
					<hr>
					<label for="uname"><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="logUsr" id="logUsr" required>

					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="logPsw" id="logPsw" required>

					<button type="submit">Login</button>
		    </div>
		    <div class="container" style="background-color:#f1f1f1">
		      <button type="button" onclick="document.getElementById('loginForm').style.display='none'"
					class="cancelbtn">Cancel</button>
		    </div>
		  </form>
		</div>
	</div>

	<div id="vnos">
		<div id="vnosForm" class="modal">
		  <form id="vnoForm" class="modal-content" onsubmit="AddCar()" method="post">
		    <div class="container">
		    	<h1>Add a car</h1>
		    	<p>Please fill in this form to add a car.</p>
					<hr>
					<label for="name"><b>Name</b></label>
					<input type="text" placeholder="Enter name for your car" name="name" id="name" required>

					<label for="consum"><b>Consumption</b></label>
					<input type="text" placeholder="Enter consumption of your car (l/km)" name="consum" id="consum" pattern="[0-9]+([.,][0-9])*[0-9]*"required>

					<button type="submit">Add</button>
		    </div>
		    <div class="container" style="background-color:#f1f1f1">
		      <button type="button" onclick="document.getElementById('vnosForm').style.display='none'"
					class="cancelbtn">Cancel</button>
		    </div>
		  </form>
		</div>
	</div>

		<aside id="sidebar">
      <p id="title">
        Travelator
			  <?php
					/*
					$conn = new mysqli("localhost", "root", "", "travelator");

			    if ($conn->connect_error) {
			      die("Connection failed: " . $conn->connect_error);
			    }

					$sql = sprintf(
			       "INSERT INTO Uporabniki (username, password)
			        VALUES ('%s', '%s')",
			          "jan",
			          password_hash("zorko", PASSWORD_DEFAULT));

			    if ($conn->query($sql) === TRUE) {
			      $conn->close();
			      print("SQL success.");
			    }
			    else {
			      $conn->close();
			      print("SQL error.");
			    }
					*/
				?>
      </p>
      <div>
        <h4 class="header"> Distance </h4>
					<ul>
						<h5 class="header">Origin</h5>
						<li class="noPadding">
							<input type="text" placeholder="Enter a location" name="origin" id="origin" required>
						</li>

						<h5 class="header">Destination</h5>
						<li class="noPadding">
							<input type="text" placeholder="Enter a location" name="destination" id="destination" required>
						</li>

						<li id="btn_cal">Calculate</li>
					</ul>

      </div>
			<div>
        <h4 class="header"> Account </h4>
        <ul>
          <li id="btn_log">Login</li>
          <li id="btn_reg">Register</li>
					<li id="btn_vnos">Add a Car</li>
        </ul>
      </div>
    </aside>
		<div id="mapContainer">
			<div id="map"></div>
		</div>
	</body>
</html>


<!--
	Key: AIzaSyAgzg9aHr0OQsdnBoL2KmlB80b7rKQD7CU
 -->
