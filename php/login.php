<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT username, password, admin FROM Uporabniki WHERE username='%s'", $_POST["username"]);

    $result = $conn->query($sql);

    $data = mysqli_fetch_assoc($result);

    $conn->close();

    if(!is_null($data)){
      if(password_verify($_POST["password"], $data["password"]) && $_POST["username"] == $data["username"]) {
        echo json_encode(array("status" => true, "accepted" => true, "username" => $_POST["username"], "admin" => $data["admin"]));
      }
      else {
        echo json_encode(array("status" => true, "accepted" => false));
      }
    }
  }
  else {
    echo json_encode(array("status" => false, "accepted" => false));
  }
?>
