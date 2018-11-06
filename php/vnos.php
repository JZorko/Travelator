<?php
  session_start();

  if(isset($_POST["name"]) && isset($_POST["consumption"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false));
    }

    $sql = sprintf(
       "INSERT INTO Avtomobili (username, naziv, poraba)
        VALUES ('%s', '%s', %s)",
          $_POST["username"],
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
  else {
    echo json_encode(array("status" => false, "added" => false));
  }
?>
