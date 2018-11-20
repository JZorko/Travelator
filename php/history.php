<?php
  session_start();
  if(isset($_POST["username"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf("SELECT id_avtomobila, zacetna_lokacija, koncna_lokacija FROM Zgodovina WHERE username='%s' ORDER BY datum_vpogleda DESC", $_POST["username"]);
    $result = $conn->query($sql);

    $data = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data);

    $conn->close();
  }
?>
