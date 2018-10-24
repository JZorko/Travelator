<?php
  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      return json_encode(array("status" => false, "added" => false));
    }

    $sql = sprintf(
       "INSERT INTO Avtomobili (username, naziv, poraba)
        VALUES ('%s', '%s', '%s')",
          $_SESSION["username"],
          $_POST["name"],
          $_POST["consumption"]);

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
