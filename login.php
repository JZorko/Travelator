<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT username, password FROM Uporabniki WHERE username='%s'", $_POST["username"]);

    $result = $conn->query($sql);

    $data = mysqli_fetch_assoc($result);

    $conn->close();

    if(!is_null($data)){
      if(password_verify($_POST["password"], $data["password"]) && $_POST["username"] == $data["username"]) {
        $_SESSION["isLoggedIn"] = true;
        $_SESSION["username"] = $_POST["username"];
        echo json_encode(array("status" => true, "accepted" => true));
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
