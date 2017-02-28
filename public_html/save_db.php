<?php

/*if(isset($_POST['x'])){
	echo "we got something\n";
	echo $_POST['x']."\n";
	$obj = $_POST['x'];
	$ar = json_decode($obj);
	echo json_encode($ar->questions);
	echo $ar->questions[0]->Q_text;
}*/

$obj = $_POST['x'];
$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");

# ADD SURVEY
$sql = "INSERT INTO Survey(survey_id, title, arr_questions, survey_type) VALUES (?,?,?,?)";
if($statement = $conn->prepare($sql)){
	$survey_id = rand(1000, 5000);
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

/*
# ADD S_USE
$sql = "INSERT INTO S_Use (`camp_id`, `survey_id`) VALUES ('".$obj->$camp."', '".$survey_id."');";
$result = $conn->query($sql);

if ($result) {
   echo "Successfully added survey-camp relation. <br>";
} else {
   echo "Error: ".$conn->error." <br>";
}
 
# ADD PRE/POST TO CAMP
if ($obj->$type == "PRE") {
   $sql = "UPDATE Camp SET pre='".$survey_id."' WHERE Camp.camp_id='".$obj->$camp."'";
   $result = $conn->query($sql);
} else if ($obj->$type == "POST") {
   $sql = "UPDATE Camp SET post='".$survey_id."' WHERE Camp.camp_id='".$obj->$camp."'";
   $result = $conn->query($sql);
} else {
   echo "Error in pre/post type in JSON. <br>";
}

if ($obj->$type == "PRE" || $obj->$type == "POST") {
   if ($result) {
      echo "Successfully updated Camp row. <br>";
   } else {
      echo "Error: ".$conn->error." <br>";
   }
}
 */

# ADD QUESTIONS
foreach ($ar->questions as $question) {
   $sql = "INSERT INTO Question (question_id, text, type, arr_answers) VALUES (?,?,?,?)";
   if($statement = $conn->prepare($sql)) {
      $question_id = rand(1000,5000);
      $text = $question->Q_text;
      $type = $question->text;

      // Generate array of answers
      $str = "";
      if ($type != "text") {
	 foreach ($question->ans as $answer) {
	    $str = $str + $answer + ", ";
	 }
         $arr_answers = rtrim($str, " ,");
      } else {
         $arr_answers = $str;
      }

   $statement->bind_param('isss', $question_id, $text, $type, $arr_answers);
   $statement->execute();
   $statement->close();

   } else {
      printf("Error: %s\n", $conn->error);
   }

}
$conn->close();
?>
