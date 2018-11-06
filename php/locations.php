<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["origin"]) && isset($_POST["destination"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false));
    }
    $sql = sprintf("SELECT naslov FROM ShranjeneLokacije WHERE username='%s'", $_POST["username"]);

    $result = $conn->query($sql);

    $data = mysqli_fetch_assoc($result);
    $origin_exist = false;
    $destination_exist = false;
    //count tle ne dela....
    for ($i=0; $i < count($data["naslov"]); $i++) {
      if($_POST["origin"] == $data["naslov"][i])
      {
        $origin_exist = true;
      }
      if($_POST["destination"] == $data["naslov"][i])
      {
        $origin_exist = true;
      }
    }
    if(!$origin_exist)
    {
      $sql = sprintf(
         "INSERT INTO ShranjeneLokacije (naslov, username)
          VALUES ('%s', '%s')",
            $_POST["origin"],
            $_POST["username"]);

      if ($conn->query($sql) === TRUE) {
        echo json_encode(array("status_origin" => true, "added" => true));
      }
      else {
        echo json_encode(array("status_origin" => true, "added" => false));
      }
    }
    if(!$destination_exist)
    {
      $sql = sprintf(
         "INSERT INTO ShranjeneLokacije (naslov, username)
          VALUES ('%s', '%s')",
            $_POST["destination"],
            $_POST["username"]);

      if ($conn->query($sql) === TRUE) {
        echo json_encode(array("status_destination" => true, "added" => true));
      }
      else {
        echo json_encode(array("status_destination" => true, "added" => false));
      }
    }
    $conn->close();
  }
  else {
    echo json_encode(array("status" => false, "added" => false));
  }
?>
