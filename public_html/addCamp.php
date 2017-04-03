<!DOCTYPE HTML>
<html>
	<head>
	</head>
	<body>
		<form method="post" onsubmit="return checkForm2(this);" enctype="multipart/form-data" >
			<label>Camp Name</label><input type="text" name="campName" id="campName"/><br>
			<label>Camp Dates</label><br>
			<label>Start Date</label><input type="date" name="startDate" id="startDate"/>
			<label>End Date</label><input type="date" name="endDate" id="endDate"/><br>
			<label>Enrollment</label><input type="file" name="enrollment" accept=".csv"/><br>
			<input type="submit" value="submit" name="submit" id="submit"/>
		</form>
	</body>
		

<?php
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
                        
                if ((isset($_POST['campName'])) && (isset($_POST['endDate'])) && (isset($_POST ['startDate'])) ){
                        $campName = $_POST['campName'];
                        $endDate = $_POST['endDate'];
                        $startDate = $_POST['startDate'];
                        echo $endDate;
                        echo $startDate;     
                        echo $campName;
						$enrollment = $_FILES['enrollment']['tmp_name'];
						echo $enrollment;
						$row = 1;
						if (($handle = fopen($enrollment, "r")) !== FALSE) {
						   while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

						      if ($row > 3) {
//						         echo $data[1] . "<br />\n";//Need to add to database, not sure of structure

						         $name = preg_split("/[\s,]+/", $data[1]);
						         $responder_id = rand(1000, 5000);

						         $sql = "INSERT INTO Responder (responder_id, first_name, last_name) VALUES ('$responder_id','$name[1]','$name[0]')";

						         if (mysql_query($sql)) {
						            echo "Added student" . $data[1] . "<br />\n";
						         } else {
						            echo "Error in adding student" . $data[1] . "<br />\n";
						         }
						      }

						      $row++;
						   }
							fclose($handle);
						}
                        $campName = mysql_real_escape_string($campName);
                        $startDate = mysql_real_escape_string($startDate);                                                
                        $endDate = mysql_real_escape_string($endDate);

                }
             
                //$sql = "INSERT INTO Camp(title, start_date, end_date) VALUES ($campName, $startDate, $endDate)";
                $query = "INSERT INTO Camp (`title`, `start_date`, `end_date`) VALUES ('$campName', '$startDate', '$endDate');";
                //mysql_query($query);
                
                
                if (mysql_query($query)) {
                        echo "New record created successfully";
                } else {
                        echo "Error";
                }
        }                                   
        //Close connection to database 
        mysql_close($mysql_handle);
?>
</html>
