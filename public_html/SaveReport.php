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
        $data = json_decode($str_json); 

        //Gets the ID, query results, and title of the report  
        $ReportSavedID = json_encode($data->ReportID);        
        $queryResults = json_encode($data->queryResults);
        $title = json_encode($data->title);
        
        //SQL statement for saving the report in Report table 
        $sql = "INSERT INTO Report (arr_results, title) VALUES ('$queryResults', '$title')";
        //Checks to see if the report is being saved for the first time which means a new report entry will be made in Report table 
        if($ReportSavedID == "null"){
                if (mysqli_query($dbc, $sql)) {
                        $sql2 = "SELECT * FROM Report WHERE arr_results='$queryResults' AND title='$title'";
                        $result = mysqli_query($dbc, $sql2);
                        if (mysqli_num_rows($result) > 0) {
                            //Returns the ID of the saved report, so next time its an update when it is saved 
                            while($row = mysqli_fetch_assoc($result)) {
                                echo $row['report_id'];
                            }
                        } else {
                            echo "0 results";
                        }                                              
                } else {
                        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
        }
        //The report exists in the database for saved or edited report, so update the report 
        else{
                //Converts the string report ID value to a php variable 
                $ReportSavedID = json_decode($ReportSavedID);                 
                $sql3 = "UPDATE Report SET arr_results = '$queryResults', title = '$title' WHERE report_id = '$ReportSavedID'";
                //Returns ID of updated report, so next time it updates the report when it is saved 
                if (mysqli_query($dbc, $sql3)) {
                        echo $ReportSavedID;
 
                } else {
                        echo "Error: " . $sql3 . "<br>" . mysqli_error($dbc);
                }
        }
        
        //closes the database connection  
	mysqli_close($dbc);
                             
?>

