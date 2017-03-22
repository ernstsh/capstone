<?php
error_reporting(-1);
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
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");

# ADD SURVEY
$sql = "INSERT INTO Survey(survey_id, title, arr_questions, survey_type) VALUES (?,?,?,?)";
$survey_id = rand(1000, 5000);
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

/*
# ADD S_USE
$sql = "INSERT INTO S_Use (`camp_id`, `survey_id`) VALUES ('".$obj->$camp."', '".$survey_id."');";
$result = $conn->query($sql);

if ($result) {
   echo "Successfully added survey-camp relation. <br>";
} else {
   echo "Error: ".$conn->error." <br>";
}
*/
 
# ADD PRE/POST TO CAMP
if ($ar->type == "pre") {
   $sql = "UPDATE Camp SET pre='?' WHERE Camp.camp_id='?'";
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

/*
if ($ar->type == "pre" || $ar->type == "post") {
   if ($result) {
      echo "Successfully updated Camp row.\n";
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

      echo "Question_id: $question_id\n";
      echo "Text: $text\n";
      echo "Type: $type\n";
      echo "Answers: $arr_answers\n";

      $statement->bind_param('isss', $question_id, $text, $type, $arr_answers);
      $statement->execute();
      $statement->close();

   } else {
      printf("Error: %s\n", $conn->error);
   }

}
$conn->close();
?>
