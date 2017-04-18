<?php
error_reporting(-1);

$obj = $_POST['x'];
$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

# To avoid possible scoping issues later, init now
//$survey_id = 0;

# ADD SURVEY
$sql = "INSERT INTO Survey(survey_id, title, arr_questions, survey_type) VALUES (?,?,?,?)";
if($statement = $conn->prepare($sql)){
	do {
           $survey_id = rand(1000, 5000);
           $result = $conn->query("SELECT * FROM Survey WHERE survey_id='".$survey_id."'");
        } while (!$result);
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
   $sql = "UPDATE Camp SET pre='".$survey_id."' WHERE Camp.camp_id='".$ar->camp."'";
   $result = $conn->query($sql);

} else if ($ar->type == "post") {
   $sql = "UPDATE Camp SET post='".$survey_id."' WHERE Camp.camp_id='".$ar->camp."'";
   $result = $conn->query($sql);
} else {
   echo "Error in pre/post type in JSON.\n";
}

if ($ar->type == "pre" || $ar->type == "post") {
   if ($result) {
      echo "Successfully updated Camp row.\n";
   } else {
      echo "Error: ".$conn->error." <br>";
   }
}

$conn->close();
?>
