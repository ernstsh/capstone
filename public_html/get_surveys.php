<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

$sql = "SELECT survey_id, title FROM Survey"; //Where certain date
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		echo "<option value='".htmlspecialchars($obj->survey_id)."'>".htmlspecialchars($obj->title)."</option>";
	}
	$result->close();
}
$conn->close();
?> 
