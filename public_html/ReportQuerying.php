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
      
        echo "We got: ".$str_json."\n";
        
        /*$data = json_decode($str_json);                    
        
        //gets the query results array and converts the JSON to a string 
        $queryResults = json_encode($data->queryResults);
        //gets the title of the report JSON
        $title = json_encode($data->title);
        //Inserts the report into the Report table 
        $sql = "INSERT INTO Report (arr_results, title) VALUES ('$queryResults', '$title')";
        //Checks if the report was saved into the database 
        if (mysqli_query($dbc, $sql)) {
                echo "New record created successfully";
        } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }*/
        
        //closes the database connection  
	mysqli_close($dbc);
                             
?>