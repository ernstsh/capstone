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
        
        //Gets the ID of the edited report that is going to be saved
        $reportID = json_encode($data->ID);
        $reportID2 = str_ireplace('"', '', $reportID);
        //echo "The report ID is: ".$reportID2."\n";
        //$intID = (int)$reportID;
        //echo "The ID is: ".$intID."\n";
        
        
        
        //Gets the query results array and converts the JSON to a string 
        $queryResults = json_encode($data->queryResults);
        
        //Gets the title of the report JSON
        $title = json_encode($data->title);
        
        //Inserts the report into the Report table 
        //$sql = "INSERT INTO Report (arr_results, title) VALUES ('$queryResults', '$title') WHERE report_id = '$reportID2'";
        
        $sql = "UPDATE Report SET arr_results = '$queryResults', title = '$title' WHERE report_id = '$reportID2'";
        
        //Checks if the report was saved into the database 
        if (mysqli_query($dbc, $sql)) {
                echo "Report updated successfully";
        } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($dbc);
        }
        
        
        
        //closes the database connection  
	mysqli_close($dbc);
                             
?>
