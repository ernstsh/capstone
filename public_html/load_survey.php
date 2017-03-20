<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
$obj = $_POST['x'];
$sql = "SELECT * FROM Survey WHERE survey_id=".$obj; //Where certain date
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		$res = array('survey_id'=>$obj->survey_id, 'title' => $obj->title, 'questions' => $obj->arr_questions, 'type' => $obj->survey_type);
		echo json_encode($res);
	}
	$result->close();
}
$conn->close();

?>
