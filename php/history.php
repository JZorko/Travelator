<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["name"]) && isset($_POST["origin"]) && isset($_POST["destination"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false));
    }
    $sql = sprintf("SELECT id_avtomobila FROM Avtomobili WHERE username='%s' AND naziv='%s'",
                    $_POST["username"],
                    $_POST["name"]);

    $avto = mysqli_fetch_assoc($conn->query($sql));
    $sql = sprintf("SELECT id_poti FROM Pot WHERE zacetna_lokacija='%s' AND koncna_lokacija='%s'",
                    $_POST["origin"],
                    $_POST["destination"]);
    $pot = mysqli_fetch_assoc($conn->query($sql));
    $sql = sprintf(
       "INSERT INTO Zgodovina (id_avtomobila, id_poti, datum_vpogleda)
        VALUES (%s, %s, '%s')",
          $avto["id_avtomobila"],
          $pot["id_poti"],
          date("Y-m-d H:i:s"));

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
  }
?>
