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
      
        
        $sql="SELECT * FROM Report";
        $result=mysqli_query($dbc,$sql);

        //Creates an array for storing each report's information 
        $ArrayInfo = array();       
        while($row=mysqli_fetch_array($result,MYSQLI_NUM)){                   
                        //Creates an array containing the report's title, arr_results, and report_id
                        array_push($ArrayInfo, array($row[0], $row[1], $row[2]));
        }
        //Returns a string representation of the 2-D array 
        echo json_encode($ArrayInfo);
        
        //Free result set
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc);       
?>
