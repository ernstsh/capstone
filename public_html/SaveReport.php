<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = '1hvHqfNBEOL6iwL9';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $str_json = file_get_contents('php://input');
      
        echo "We got: ".$str_json."\n";
        
        $data = json_decode($str_json);
        
        /*foreach ( $data->queryResults as $query )
        {
            //echo "{$query->label}\n";
            echo "The label is: ".$query->label."\n";
            echo "The query is: ".$query->query."\n";
            $sql = "INSERT INTO Report (title, arr_results) VALUES ('$query->label', '$query->query')";
                if (mysqli_query($dbc, $sql)) {
                    echo "New record created successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
            
        }*/
        
        /*$arr_results = "[";
        foreach ( $data->queryResults as $query )
        {
            //echo "{$query->label}\n";
            echo "The label is: ".$query->label."\n";
            echo "The query is: ".$query->query."\n";
            
            $arr_results = $arr_results + "{label:" + json_encode($query->label) + "," + "query:" + json_encode($query->query) + "}";   
        }
        $arr_results = $arr_results + "]";*/
        
        
        
        //gets the query results array and converts the json to a string 
        $queryResults = json_encode($data->queryResults);
        //Inserts the report into the Report table 
        $sql = "INSERT INTO Report (arr_results) VALUES ('$queryResults')";
        //Checks if the report was saved into the database 
        if (mysqli_query($dbc, $sql)) {
                echo "New record created successfully";
        } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        
        //closes the database connection  
	mysqli_close($dbc);
        
        
        
        
    
        
?>

