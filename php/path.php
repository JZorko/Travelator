<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["origin"]) && isset($_POST["destination"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status_ori" => false, "status_des" => false, "pot_added" => false));
    }
    $sql = sprintf("SELECT P.id_poti, zacetna_lokacija, koncna_lokacija
                    FROM Pot P JOIN Zgodovina Z
                    ON P.id_poti = Z.id_poti
                    JOIN Avtomobili A
                    ON Z.id_avtomobila = A.id_avtomobila
                    WHERE A.username='%s'", $_POST["username"]);
    $result = $conn->query($sql);

    $origin_exist = false;
    $destination_exist = false;

    if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
        if($_POST["origin"] == $row["zacetna_lokacija"])
        {
          $origin_exist = true;
        }
        if($_POST["destination"] == $row["koncna_lokacija"])
        {
          $destination_exist = true;
        }
	    }
		}
    if(!($origin_exist && $destination_exist))
    {
      $sql = sprintf(
         "INSERT INTO Pot (zacetna_lokacija, koncna_lokacija)
          VALUES ('%s', '%s')",
            $_POST["origin"],
            $_POST["destination"]);

      if ($conn->query($sql) === TRUE) {
        $conn->close();
        echo json_encode(array("status_ori" => $origin_exist, "status_des" => $destination_exist, "pot_added" => true));
      }
      else {
        $conn->close();
        echo json_encode(array("status_ori" => $origin_exist, "status_des" => $destination_exist, "pot_added" => false));
      }
    }
    else {
      $conn->close();
      echo json_encode(array("status_ori" => $origin_exist, "status_des" => $destination_exist, "pot_added" => false));
    }
  }
  else {
    echo json_encode(array("status_ori" => false, "status_des" => false, "pot_added" => false));
  }
?>
