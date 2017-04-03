<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
//$obj = $_POST['x'];
$sql = "SELECT first_name, last_name FROM Responder"; //NEEDS TO BE FOR CERTAIN CAMP
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		echo "<option value=''>".htmlspecialchars($obj->first_name)." ".htmlspecialchars($obj->last_name)."</option>";
	}
	$result->close();
}
$conn->close();
?>
