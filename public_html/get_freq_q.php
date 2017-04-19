<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
$sql = "SELECT question_id, obj_string FROM Question";
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		$res = json_decode($obj->obj_string);
		//echo $res->Q_text;
		if($res->Q_topic){
			echo "<option value='".htmlspecialchars($obj->question_id)."'>".htmlspecialchars($res->Q_topic)."</option>";
		}
		else{
			echo "<option value='".htmlspecialchars($obj->question_id)."'>".htmlspecialchars($res->Q_text)."</option>";
		}
	}
	$result->close();
}
$conn->close();
?>
