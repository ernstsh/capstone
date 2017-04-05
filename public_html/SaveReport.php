<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $str_json = file_get_contents('php://input');
      
        //echo "We got: ".$str_json."\n";
        
        $data = json_decode($str_json); 

        //Gets the ID of the report 
        $ReportSavedID = json_encode($data->ReportID);        
        //Gets the query results array and converts the JSON to a string 
        $queryResults = json_encode($data->queryResults);
        //Gets the title of the report JSON
        $title = json_encode($data->title);
        //Inserts the report into the Report table 
        $sql = "INSERT INTO Report (arr_results, title) VALUES ('$queryResults', '$title')";
        //Saves the report for the first time in the database 
        if($ReportSavedID == "null"){
                if (mysqli_query($dbc, $sql)) {
                        //echo "Your new report was saved successfully";                                                
                        $sql2 = "SELECT * FROM Report WHERE arr_results='$queryResults' AND title='$title'";
                        $result = mysqli_query($dbc, $sql2);

                        if (mysqli_num_rows($result) > 0) {
                            //Return the ID of the saved report 
                            while($row = mysqli_fetch_assoc($result)) {
                                //echo "The report id is:".$row['report_id']."\n";
                                echo $row['report_id'];
                                //$obj = new stdClass();
                                //$obj->ReportID = $row['report_id'];
                                //echo json_encode($obj);
                            }
                        } else {
                            echo "0 results";
                        }                                              
                } else {
                        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
        }
        //The report exists in the database for saved the edited report 
        else{
                //Converts the string report ID value to a php variable 
                $ReportSavedID = json_decode($ReportSavedID);                 
                $sql3 = "UPDATE Report SET arr_results = '$queryResults', title = '$title' WHERE report_id = '$ReportSavedID'";         
                //Checks if the report was saved into the database 
                if (mysqli_query($dbc, $sql3)) {
                        echo $ReportSavedID;
 
                } else {
                        echo "Error: " . $sql3 . "<br>" . mysqli_error($dbc);
                }
        }
        
        //closes the database connection  
	mysqli_close($dbc);
                             
?>

