<?php

/*if(isset($_POST['x'])){
	echo "we got something\n";
	echo $_POST['x']."\n";
	$obj = $_POST['x'];
	$ar = json_decode($obj);
	//echo $ar->title;
}*/

$obj = $_POST['x'];
$ar = json_decode($obj);
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");

# ADD SURVEY
$sql = "INSERT INTO Survey(survey_id, title) VALUES (?,?)";
if($statement = $conn->prepare($sql)){
	$survey_id = rand(1000, 5000);
	$title = $ar->title;
	echo $title;
	$statement->bind_param('is', $survey_id, $title);
	$statement->execute();
	$statement->close();
}
else {
	printf("Error: %s\n", $conn->error);
}

if($result = $conn->query("Select * From Survey")){
	while($obje = $result->fetch_object()){
		echo $obje->survey_id;
		echo $obje->title;
	}
	$result->close();
}
else{
	echo "<h1> Things went wrong </h1>";
}

//$result = $conn->query($sql);

//if ($result) {
//  echo "Successfully added survey. <br>";
//  $survey_id = $conn->insert_id;
//} else {
 //  echo "Error: ".$conn->error." <br>";
//}

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

# ADD QUESTIONS
for ($i = 0; $i < 2; $i++) {
   $sql = "INSERT INTO Question (`question_id`, `text`, `type`, `arr_answers`) VALUES (NULL, '".$obj->$questions[$i]->$Q_text."');"
   $result = $conn->query();

   if ($result) {
      echo "Successfully added question. <br>";
      $q_ids[$i] = $conn->insert_id;

      $result = $conn->query("INSERT INTO `nichokyl-db`.`Contains` (`survey_id`, `question_id`) VALUES 
	 ((SELECT survey_id FROM Survey WHERE survey_id='".$survey->id."'),
	 (SELECT question_id FROM Question WHERE question_id='".$q_ids[$i]."'));");

      if ($result) {
	 echo "Successfully added relation. <br>";
      } else {
         echo "Error: ".$conn->error." <br>";
      }

   } else {
      echo "Error: ".$conn->error." <br>";
   }
}
*/
$conn->close();
?>
