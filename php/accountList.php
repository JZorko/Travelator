<?php
  session_start();
  if(isset($_POST["username"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT username FROM Uporabniki WHERE username='%s' OR admin<>%s ORDER BY admin DESC, username",
                    $_POST["username"],
                    $_POST["admin"]);
    $result = $conn->query($sql);

    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data);

    $conn->close();
  }
?>
