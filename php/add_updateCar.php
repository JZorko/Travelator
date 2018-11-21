<?php
  session_start();

  if(isset($_POST["name"]) && isset($_POST["consumption"])) {
    $conn = new mysqli("localhost", "user", "user", "travelator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      echo json_encode(array("status" => false, "added" => false, "updated" => false));
    }
    $sql = sprintf("SELECT id_avtomobila, naziv FROM Avtomobili WHERE username='%s'", $_POST["username"]);
    $result = $conn->query($sql);

    $naziv_exist = false;
    if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
        if($_POST["name"] == $row["naziv"])
        {
          $naziv_exist = true;
          $naziv_exist_id = $row["id_avtomobila"];
        }
	    }
		}
    if($naziv_exist) {
      $sql = sprintf("UPDATE Avtomobili SET poraba =%s WHERE id_avtomobila ='%s'AND username='%s';", $_POST["consumption"], $naziv_exist_id, $_POST["username"]);
      if ($conn->query($sql) === TRUE) {
        $conn->close();
        echo json_encode(array("status" => true, "added" => false, "updated" => true));
      }
      else {
        $conn->close();
        echo json_encode(array("status" => true, "added" => false, "updated" => false));
      }
    }
    else {
      $sql = sprintf(
         "INSERT INTO Avtomobili (naziv, poraba, username)
          VALUES ('%s', %s, '%s')",
            $_POST["name"],
            $_POST["consumption"],
            $_POST["username"]);

      if ($conn->query($sql) === TRUE) {
        $conn->close();
        echo json_encode(array("status" => true, "added" => true, "updated" => false));
      }
      else {
        $conn->close();
        echo json_encode(array("status" => true, "added" => false, "updated" => false));
      }
    }
  }
  else {
    echo json_encode(array("status" => false, "added" => false, "updated" => false));
  }
?>
