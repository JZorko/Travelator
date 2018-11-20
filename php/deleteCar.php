<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["name"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "deleted" => false));
    }
    $sql = sprintf("DELETE FROM Avtomobili WHERE username='%s' AND naziv='%s'", $_POST["username"], $_POST["name"]); // need fix - foreign key problems
    echo $sql;

    if ($conn->query($sql) === TRUE) {
      $conn->close();
      echo json_encode(array("status" => true, "deleted" => true));
    }
    else {
      $conn->close();
      echo json_encode(array("status" => true, "deleted" => false));
    }
  }
  else {
    echo json_encode(array("status" => false, "deleted" => false));
  }
?>
