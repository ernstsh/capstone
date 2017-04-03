<?php 
	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
	$sql = "SELECT * FROM Survey, SUSE WHERE SUSE.camp_id =".$_POST[camp]."SUSE.survey_id = Survey.survey_id";//NEED TO MAKE COMPATIBLE WITH PRE/POST
	if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		$res = array('survey_id'=>$obj->survey_id, 'title' => $obj->title, 'questions' => $obj->arr_questions, 'type' => $obj->survey_type);
		echo json_encode($res);
	}
	$result->close();
}
$conn->close();
?>
