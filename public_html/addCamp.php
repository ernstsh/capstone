<!DOCTYPE HTML>
<html>
	<head>
	 <link rel="stylesheet" href="../public_html/css/style1.css">
         <script src="report_generation.js"></script>

	</head>
	<body onload="GetCamps()">           
		<h3>Add Camp</h3>
                  <!--Calls GetCamps() function to fill drop down with the camp names-->
                <div id="SelectCamp">
                <select id="select1" name="select1" onchange="GetSurveys()">
                                
                </select>       
                </div>
		<form method="post" onsubmit="return checkForm2(this);" enctype="multipart/form-data" >
			<label>Camp Name</label><input type="text" name="campName" id="campName"/><br>
			<label>Camp Dates</label><br>
			<label>Start Date</label><input type="date" name="startDate" id="startDate"/>
			<label>End Date</label><input type="date" name="endDate" id="endDate"/><br>
			<label>Enrollment (must be csv) </label><input type="file" name="enrollment" accept=".csv"/><br>
			<input type="submit" value="submit" name="submit" id="submit"></input>
                        <button type="button" class="exit" id="exit"><a href="dashboard.php" id="ExitLink"> Exit </a></button>

		</form>              
	</body>
		

<?php

# In case of possible issues with scope, init here
$camp_id = 0;

        if (isset($_POST['submit'])) 
	{
                //Connect to database 
                $dbhost = 'oniddb.cws.oregonstate.edu';
                $dbname = 'nichokyl-db';
                $dbuser = 'nichokyl-db';
                $dbpass = 'ZlpiHLTMmA44Z0tg';
                $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                        or die("Error connecting to database server");

                mysql_select_db($dbname, $mysql_handle)
                        or die("Error selecting database: $dbname");
                 $enrollment_arr = array();       
                if ((isset($_POST['campName'])) && (isset($_POST['endDate'])) && (isset($_POST ['startDate'])) ){
                        $campName = $_POST['campName'];
                        $endDate = $_POST['endDate'];
                        $startDate = $_POST['startDate'];

			$enrollment = $_FILES['enrollment']['tmp_name'];
						$row = 1;
						if (($handle = fopen($enrollment, "r")) !== FALSE) {
						   while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

						      if ($row > 4) {
							 
						         $name = preg_split("/[\s,]+/", $data[1]);
							 do {
							    $responder_id = rand(1000, 5000);
							 } while (!mysql_query("SELECT * FROM Responder WHERE responder_id='".$responder_id."'"));
							 array_push($enrollment_arr, "$responder_id");

							 
						         $sql = "INSERT INTO Responder (responder_id, first_name, last_name) VALUES ('$responder_id','$name[1]','$name[0]')";

						         if (mysql_query($sql)) {
						            echo "Added student" . $data[1] . "<br />\n";
						         } else {
						            echo "Error in adding student" . $data[1] . "<br />\n";
						         }
						      }

						      $row++;
						   }

						   $enrollment_str = $enrollment_str . "] }";
							fclose($handle);
						}
                        $campName = mysql_real_escape_string($campName);
                        $startDate = mysql_real_escape_string($startDate);                                                
                        $endDate = mysql_real_escape_string($endDate);

                }


		$enrollment_str = serialize($enrollment_arr);
		do{
		   $camp_id = rand(1000, 5000);
		} while (!mysql_query("SELECT * FROM Camp WHERE camp_id='".$camp_id."'"));
                $query = "INSERT INTO Camp (`camp_id`, `title`, `start_date`, `end_date`, `enrollment` ) VALUES ('$camp_id', '$campName', '$startDate', '$endDate', '$enrollment_str');";
                
                if (mysql_query($query)) {
                        echo "New record created successfully";
                } else {
		   echo "Error: " . mysql_error($query);
                }
        }                                   
        mysql_close($mysql_handle);
?>
</html>
