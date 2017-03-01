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
      
        //echo "We got: ".$str_json."\n";
        
        $sql="SELECT arr_questions FROM Survey WHERE survey_id='$str_json'";
        $result=mysqli_query($dbc,$sql);

        // Numeric array works
        $row=mysqli_fetch_array($result,MYSQLI_NUM);
        echo $row[0];
        //printf ("First attempt: %s\n",$row[0]);

        // Associative array does not work!!!!
        //$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        //printf ("Second attempt: %s\n",$row['arr_questions']);

        // Free result set
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc);       
?>