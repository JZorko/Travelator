<?php
  session_start();
  if(isset($_POST["username"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT id_avtomobila, zacetna_lokacija, koncna_lokacija FROM Zgodovina WHERE username='%s'", $_POST["username"]);
    $result = $conn->query($sql);

    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data);

    $conn->close(); 
  }

  /*$data = $result->fetch_all(MYSQLI_ASSOC);

  echo json_encode($data);

  $conn->close();
  if(isset($_POST["username"]) && isset($_POST["name"]) && isset($_POST["origin"]) && isset($_POST["destination"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false));
    }
    $sql = sprintf("SELECT id_avtomobila FROM Avtomobili WHERE username='%s' AND naziv='%s'", $_POST["username"], $_POST["name"]);

    $data = mysqli_fetch_assoc($conn->query($sql));

    $sql = sprintf(
       "INSERT INTO Zgodovina (datum_vpogleda, id_avtomobila, username, zacetna_lokacija, koncna_lokacija)
        VALUES ('%s', %s, '%s', '%s', '%s')",
          date("Y-m-d H:i:s"),
          $data["id_avtomobila"],
          $_POST["username"],
          $_POST["origin"],
          $_POST["destination"]);

    if ($conn->query($sql) === TRUE) {
      $conn->close();
      echo json_encode(array("status" => true, "added" => true));
    }
    else {
      $conn->close();
      echo json_encode(array("status" => true, "added" => false));
    }
  }
  else {
    echo json_encode(array("status" => false, "added" => false));
  }*/
?>
