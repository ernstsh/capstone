<html>

<head>
<title>Database testing</title>
</head>

<body>

<?php

$survey->id = -1;
$survey->title = "Example";

$q_ids = array(-1, -1);
$questions = array("What is your quest?", "What is your favorite color?");
$num = 2;

$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
$result = $conn->query("INSERT INTO `nichokyl-db`.`Survey` (`survey_id`, `title`) VALUES (NULL, '".$survey->title."');");

if ($result) {
   echo "Successfully added survey. <br>";
   echo "ID: ".$conn->insert_id." <br>";
   $survey->id = $conn->insert_id;
} else {
   echo "Error: ".$conn->error." <br>";
}

for ($i = 0; $i < 2; $i++) {
   $result = $conn->query("INSERT INTO `nichokyl-db`.`Question` (`question_id`, `text`) VALUES (NULL, '".$questions[$i]."');");

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

$conn->close();
?>

</body>
</html>
