<?php
session_start();
		
//Checks if the user is logged in 
if(isset($_SESSION['valid_user'])){
     
        $dbhost = 'oniddb.cws.oregonstate.edu';
        $dbname = 'nichokyl-db';
        $dbuser = 'nichokyl-db';
        $dbpass = 'ZlpiHLTMmA44Z0tg';
        
        $dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
        if (!$dbc){
		echo "Error connecting to database."
	}
        
        $admin_json = file_get_contents('php://input');

        $data = json_decode($admin_json); 
        
        $LastName = json_encode($data->lastName);
        //Removes quotations 
        $LastName = str_ireplace('"', '', $LastName);
      
        $FirstName = json_encode($data->firstName);
        $FirstName = str_ireplace('"', '', $FirstName);
        
        $UserName = json_encode($data->userName);
        $UserName = str_ireplace('"', '', $UserName);
              
        $Password = json_encode($data->passWord);
        $Password = str_ireplace('"', '', $Password);
        
        //Checks to see if the admin that is logged in is Catherine Law or Carole Rodriguez 
        if($_SESSION['valid_user'] == 'CaroleR' Or $_SESSION['valid_user'] == 'CatherineL'){
                $sql = "INSERT INTO Admin (FirstName, LastName, UserName, Password) VALUES ('$FirstName', '$LastName', '$UserName', '$Password')";
                if (mysqli_query($dbc, $sql)) 
                {
                        echo "Created an admin account for ".$FirstName." ".$LastName." and their user name is ".$UserName."\n";
                } 
                else 
                {
                        echo "Error creating record: " . mysqli_error($dbc);
                }                                                               
        }
        else{
                echo "Your admin account cannot add new admins only Carole Rodriguez and Catherine Law are allowed!!!";
        }
        
        mysqli_close($dbc);
              
}
?>
