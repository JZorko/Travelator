<?php
  if(isset($_GET["username"]) && isset($_GET["password"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      return json_encode(array("status" => false, "added" => false));
    }

    $sql = sprintf(
       "INSERT INTO Uporabniki (username, password)
        VALUES ('%s', '%s')",
          $_GET["username"],
          password_hash($_GET["password"], PASSWORD_DEFAULT));

    if ($conn->query($sql) === TRUE) {
      $conn->close();
      echo json_encode(array("status" => true, "added" => true));
    }
    else {
      $conn->close();
      echo json_encode(array("status" => true, "added" => false));
    }
  }
?>
