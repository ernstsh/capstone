<?php 
	$obj = $_POST['x'];
	$ar = json_decode($obj);
	echo $ar[0]->Q_text;
	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
	$sql = "INSERT INTO Question (question_id, type, object) VALUES (?,?,?)";
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
			echo htmlspecialchars($obj->question_id);
			echo htmlspecialchars($obj->type);
			//echo $obj->objects;
		}
		$result->close();
	}

	$conn->close();
?>
