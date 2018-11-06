<?php
  session_start();

  if(isset($_POST["username"]) && isset($_POST["origin"]) && isset($_POST["destination"])) {
    $conn = new mysqli("localhost", "root", "", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false));
    }
    $sql = sprintf("SELECT naslov FROM ShranjeneLokacije WHERE username='%s'", $_POST["username"]);
    $result = $conn->query($sql);

    $origin_exist = false;
    $destination_exist = false;

    if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
        if($_POST["origin"] == $row["naslov"])
        {
          $origin_exist = true;
        }
        if($_POST["destination"] == $row["naslov"])
        {
          $destination_exist = true;
        }
	    }
		}
    $status_ori = false;
    if(!$origin_exist)
    {
      $sql = sprintf(
         "INSERT INTO ShranjeneLokacije (naslov, username)
          VALUES ('%s', '%s')",
            $_POST["origin"],
            $_POST["username"]);
      if ($conn->query($sql) === TRUE) {
        $status_ori = true;
        $add_ori = true;
      }
      else {
        $status_ori = true;
        $add_ori = false;
      }
    }
    $status_des = false;
    if(!$destination_exist)
    {
      $sql = sprintf(
         "INSERT INTO ShranjeneLokacije (naslov, username)
          VALUES ('%s', '%s')",
            $_POST["destination"],
            $_POST["username"]);
      if ($conn->query($sql) === TRUE) {
        $status_des = true;
        $add_des = true;
      }
      else {
        $status_des = true;
        $add_des = false;
      }
    }
    if ($status_ori && $status_des && $add_ori && $add_des) {
      $conn->close();
      echo json_encode(array("status" => true, "added" => true));
    }
    else {
      $conn->close();
      echo json_encode(array("status" => true, "added" => false));
    }
  }
  else {
    echo json_encode(array("status" => false, "added" => false));
  }
?>
