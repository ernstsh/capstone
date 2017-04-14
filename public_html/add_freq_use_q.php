<?php 
        # Init now to avoid possible scope issues
	$question_id = 0;

	$obj = $_POST['x'];
	$ar = json_decode($obj);
	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
	$sql = "INSERT INTO Question (question_id, type, obj_string) VALUES (?,?,?)";
	for($i = 0; $i < count($ar); $i++){
		if($statement = $conn->prepare($sql)){
		   	do {
			   $question_id = rand(1000,5000);
			   $result = $conn->query("SELECT * FROM Question WHERE question_id='".$question_id."'");
			} while (!$result);
			$type = $ar[$i]->type;
			$objects = json_encode($ar[$i]);
		}else {
		  printf("Error: %s\n", $conn->error);
		}
		$statement->bind_param('iss', $question_id, $type, $objects);
		$statement->execute();
		$statement->close();
	}

	if($result = $conn->query("SELECT * FROM Question")){
		while($obj = $result->fetch_object()){
			echo $obj->question_id;
			echo $obj->type;
			echo "START";
			echo $obj->obj_string;
			echo "END";
		}
		$result->close();
	}

	$conn->close();
?>
