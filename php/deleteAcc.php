<?php
  session_start();
  if(isset($_POST["delitingAcc"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "deleted" => false));
    }
    $sql = sprintf("DELETE FROM Uporabniki WHERE username='%s'", $_POST["delitingAcc"]);

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
