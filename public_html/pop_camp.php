<?php 
//$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

$sql = "SELECT camp_id, title FROM Camp"; //Where certain date
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		echo "<option value='".htmlspecialchars($obj->camp_id)."'>".htmlspecialchars($obj->title)."</option>";
	}
	$result->close();
}
$conn->close();
?>
