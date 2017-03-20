<?php 
	$obj = $_POST['x'];
	$ar = json_decode($obj);
	//echo $ar[0]->Q_text;
	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
	$sql = "INSERT INTO Question (question_id, type, obj_string) VALUES (?,?,?)";
	for($i = 0; $i < count($ar); $i++){
		if($statement = $conn->prepare($sql)){
			$question_id = rand(1000,5000);
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
