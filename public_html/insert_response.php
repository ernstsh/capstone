<?php 
$obj = $_POST['x'];
$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

$sql = "INSERT INTO Response(survey_id, camp_id, responder_id, answers, survey_type) VALUES (?,?,?,?,?)";
//$survey_id = rand(1000, 5000);
if($statement = $conn->prepare($sql)){
	// $survey_id = rand(1000, 5000);
	$camp = $ar->camp;
	$type = $ar->type;
	$survey = $ar->survey;
	$responder = $ar->responder;
	$ans = json_encode($ar->ans);

	// Generate the array of questions string
	//$arr_questions = json_encode($ar->questions);

	$statement->bind_param('iiiss', $survey, $camp, $responder, $ans, $type);
	$statement->execute();
	$statement->close();
}
else {
	printf("Error: %s\n", $conn->error);
}
$sql2 = "SELECT * FROM Response";
while($result = $conn-query($sql2)){
	if($obj2 = $result->fetch_object()){
		echo $obj2->survey_id;
		echo $obj2->camp_id;
		echo $obj2->responder_id;
		echo $obj2->type;
		echo json_decode($obj2->answers);
	}
	$result->close;
}
$conn->close();
?>
