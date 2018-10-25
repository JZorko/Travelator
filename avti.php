<?php
  session_start();

  $conn = new mysqli("localhost", "root", "", "travelator");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = sprintf("SELECT naziv, poraba FROM Avtomobili WHERE username='%s'", $_POST["username"]);

  $result = $conn->query($sql);

  $data = $result->fetch_all(MYSQLI_ASSOC);

  echo json_encode($data);

  $conn->close();
?>
