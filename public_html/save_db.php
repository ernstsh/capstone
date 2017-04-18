<?php
error_reporting(-1);

$obj = $_POST['x'];
$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

# To avoid possible scoping issues later, init now
$survey_id = 0;
$question_id = 0;

# ADD SURVEY
$sql = "INSERT INTO Survey(survey_id, title, arr_questions, survey_type) VALUES (?,?,?,?)";
//do {
   $survey_id = rand(1000, 5000);
  // $result = $conn->query("SELECT * FROM Survey WHERE survey_id='".$survey_id."'");
//} while (!$result);
if($statement = $conn->prepare($sql)){
	// $survey_id = rand(1000, 5000);
	$title = $ar->title;
	$type = $ar->type;

	// Generate the array of questions string
	$arr_questions = json_encode($ar->questions);

	$statement->bind_param('isss', $survey_id, $title, $arr_questions, $type);
	$statement->execute();
	$statement->close();
}
else {
	printf("Error: %s\n", $conn->error);
}

# ADD PRE/POST TO CAMP
if ($ar->type == "pre") {
   $sql = "UPDATE Camp SET pre='?' WHERE Camp.camp_id='?'";
   echo "Survey_id: " . $survey_id;
   if ($statement = $conn->prepare($sql)) {
      $camp_id = $ar->camp;

      $statement->bind_param('ii', $survey_id, $camp_id);
      $statement->execute();
      $statement->close();
   } else {
      printf("Error: %s\n", $conn->error);
   }
} else if ($ar->type == "post") {
   $sql = "UPDATE Camp SET post='?' WHERE Camp.camp_id='?'";
   echo "Survey_id: " . $survey_id;

   if ($statement = $conn->prepare($sql)) {
      $camp_id = $ar->camp;

      $statement->bind_param('ii', $survey_id, $camp_id);
      $statement->execute();
      $statement->close();
   } else {
      printf("Error: %s\n", $conn->error);
   }
} else {
   echo "Error in pre/post type in JSON.\n";
}

$conn->close();
?>
