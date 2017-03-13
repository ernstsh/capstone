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
        
        $sql="SELECT * FROM Report";
        $result=mysqli_query($dbc,$sql);

        //Creates an array for storing each row 
        $ArrayInfo = array();
        
        // Numeric array works
        while($row=mysqli_fetch_array($result,MYSQLI_NUM)){
                        /*echo $row[0];
                        echo $row[1];
                        echo $row[2];*/
                        
                        //Creates an array containing the row informationn and adds it to the array 
                        array_push($ArrayInfo, array($row[0], $row[1], $row[2]));
        }
        //for the string representation of the 2-D array 
        echo json_encode($ArrayInfo);
        // Free result set
        mysqli_free_result($result);

        //closes the database connection  
	mysqli_close($dbc);       
?>