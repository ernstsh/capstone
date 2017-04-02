<?php
	/*session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';

        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $str_json = file_get_contents('php://input');
      
        //echo $str_json;
        
        $sql="SELECT arr_results FROM Report WHERE report_id='$str_json'";
        $result=mysqli_query($dbc,$sql);

        // Numeric array works
        $row=mysqli_fetch_array($result,MYSQLI_NUM);
        //json_encode(echo $row[0]);
        echo $row[0];
        // Free result set
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc); */
        
        session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';

        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        //Receives the report ID from edit_report.js 
        $str_json = file_get_contents('php://input');
      
        //echo $str_json;
        
        //Gets the arr_results and tile attributes of the Report table based on the report that was selected 
        $sql = "SELECT arr_results, title FROM Report WHERE report_id='$str_json'";       
        $result = mysqli_query($dbc,$sql);
        //Numeric array 
        $row = mysqli_fetch_array($result,MYSQLI_NUM);
                             
        //Create JSON object to store database
        $obj = new stdClass();
        $obj->title = $row[1];
        $obj->arr_results = $row[0];
        echo json_encode($obj);
        
        
        //Free result
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc); 
?>