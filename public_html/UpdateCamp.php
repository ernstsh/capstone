<?php
	session_start();

	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
	$str_json = $_POST['x']; 
	echo $str_json;
	$data = json_decode($str_json); 

	$enrollment_arr = array();       
	$str = 'UPDATE Camp SET ';
	if ($data->CampID) {
		if ($data->Name) {
			str = str . "title = $data->Name, ";
		}
		if ($data->StartDate) {
			str = str . "start_date = $data->StartDate, ";
		}
		if ($data->EndDate) {
			str = str . "end_date = $data->EndDate, ";
		}
		if ($data->enrollment) {
			$enrollment = $_FILES['enrollment']['tmp_name'];
			
			$row = 1;
			if (($handle = fopen($enrollment, "r")) !== FALSE) {
				while (($enroll_data = fgetcsv($handle, 1000, ",")) !== FALSE) {
					
					if ($row > 4) {
						$name = preg_split("/[\s,]+/", $enroll_data[1]);
						
						do {
							$responder_id = rand(1000, 5000);
						} while (!mysqli_query("SELECT * FROM Responder WHERE responder_id='".$responder_id."'"));
						array_push($enrollment_arr, "$responder_id");
						
						$sql = "INSERT INTO Responder (responder_id, first_name, last_name) VALUES ('$responder_id','$name[1]','$name[0]')";
						
						if (mysql_query($sql)) {
							echo "Added student" . $data[1] . "<br />\n";
						} else {
							echo "Error in adding student" . $enroll_data[1] . "<br />\n";
						}
					}
					
					$row++;
				}
				
				$enrollment_str = $enrollment_str . "] }";
				fclose($handle);
			}
		}
		
			
		$enrollment_str = serialize($enrollment_arr);

		str = str . "WHERE camp_id = $data->CampID";
		
		if (mysql_query($query)) {
			echo "New record created successfully";
		} else {
			echo "Error: " . mysql_error($query);
		}
	}
        
	mysqli_close($dbc);
                             
?>

