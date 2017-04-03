<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
$camp = $_POST['x'];
$sql = "SELECT enrollment FROM Camp WHERE camp_id ='".$camp."'"; //NEEDS TO BE FOR CERTAIN CAMP
if($result = $conn->query($sql)){
	while($obj = $result->fetch_object()){
		$names = unserialize($obj->enrollment);
		foreach($names as &$value){
			$sql2 = "SELECT first_name, last_name FROM Responder WHERE responder_id='".$value."'"; 
			if($res = $conn->query($sql2)){
				while($obj2 = $res->fetch_object()){
					echo "<option value='".htmlspecialchars($value)."'>".htmlspecialchars($obj2->first_name)." ".htmlspecialchars($obj2->last_name)."</option>";
				}
			}
		}
		unset($value);
	}
	$result->close();
}
$conn->close();
?>
