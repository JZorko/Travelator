<?php
  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $conn = new mysqli("localhost", "root", "", "gasilni_aparati");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT username, password FROM Uporabniki WHERE username='%s'", $_POST["username"]);

    $result = $conn->query($sql);

    $data = mysqli_fetch_assoc($result);

    $conn->close();

      if (!is_null($data) && $_POST["username"] == $data["username"]) {

        if(password_verify($_POST["password"], $data["password"])) {
          $_SESSION["isLoggedIn"] = true;
          $_SESSION["username"] = $data["name"];
          $_SESSION["email"] = $data["email"];
          header('Location: ' . "Kmalu.php");
        }
        else {
          $error = "Geslo se ne ujema";
        }
      }
      else {
        $error = "Račun ne obstaja";
      }

    if ($conn->query($sql) === TRUE) {
      $conn->close();
      echo json_encode(array("status" => true, "accepted" => true));
    }
    else {
      $conn->close();
      echo json_encode(array("status" => true, "accepted" => false));
    }
  }
?>
