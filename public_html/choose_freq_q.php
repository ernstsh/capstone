<?php 
	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
	$obj = $_POST['x'];
	$sql = "SELECT type, obj_string FROM Question WHERE question_id=".$obj;
	if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		echo $obj->obj_string;
	}
	$result->close();
}
$conn->close();
?>
