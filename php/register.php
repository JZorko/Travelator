<?php
  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      return json_encode(array("status" => false, "added" => false));
    }

    $sql = sprintf(
       "INSERT INTO Uporabniki (username, password, admin)
        VALUES ('%s', '%s', 0)",
          $_POST["username"],
          password_hash($_POST["password"], PASSWORD_DEFAULT));

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
