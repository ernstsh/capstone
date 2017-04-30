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
      
        //Gets the array of questions JSON objects contained in a survey table
        $sql="SELECT arr_questions FROM Survey WHERE survey_id='$str_json'";
        $result=mysqli_query($dbc,$sql);
        
        //Returns the questions of the survey to PHP
        $row=mysqli_fetch_array($result,MYSQLI_NUM);
        echo $row[0];

        // Free result set
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc);       
?>
