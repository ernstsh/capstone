<html>

<head>
<title>Database testing</title>
</head>

<body>

<?php

$myObj->title = "Example survey 1";

$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
$result = $conn->query("SELECT * FROM Survey");

if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      echo "ID: " . $row["survey_id"] . "<br>Title: " . $row["title"] . "<br><br>";
   }
}

$conn->close();
?>

</body>
</html>
