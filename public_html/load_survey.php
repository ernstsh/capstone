<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
$obj = $_POST['x'];
echo $obj;
$sql = "SELECT * FROM Survey WHERE survey_id=".$obj; //Where certain date
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		echo $obj;
	}
	$result->close();
}
$conn->close();

?>
