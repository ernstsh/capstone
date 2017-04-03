<?php
session_start();
		
//Checks if the user is logged in 
if(isset($_SESSION['valid_user'])){
     
        //information needed for making the database connection
        $dbhost = 'oniddb.cws.oregonstate.edu';
        $dbname = 'nichokyl-db';
        $dbuser = 'nichokyl-db';
        $dbpass = 'ZlpiHLTMmA44Z0tg';
        
        //Create a connection to the database
        $dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
        if (!$dbc){
                die('Could not connect: ');
        }
        
        //Receives the JSON containing the first and last name of the admin that is going to be deleted 
        $admin_json = file_get_contents('php://input');

        //echo $admin_json;
        
        //Decodes the JSON string 
        $data = json_decode($admin_json); 
        
        //Gets the last name from the JSON object 
        $LastName = json_encode($data->lastName);
        //Removes quotations 
        $LastName = str_ireplace('"', '', $LastName);
      
        //Gets the first name from the JSON object 
        $FirstName = json_encode($data->firstName);
        //Removes quotations
        $FirstName = str_ireplace('"', '', $FirstName);
        
        //Gets the user name from the JSON object 
        $UserName = json_encode($data->userName);
        //Removes quotations
        $UserName = str_ireplace('"', '', $UserName);
              
        //Gets the password from the JSON object
        $Password = json_encode($data->passWord);
        //Removes the quotations
        $Password = str_ireplace('"', '', $Password);
        
        //echo $FirstName;
        //echo $LastName;
        //echo $UserName;
        //echo $Password;

      
        //Checks to see if the admin that is logged in is Catherine Law or Carole Rodriguez 
        if($_SESSION['valid_user'] == 'CarolR' Or $_SESSION['valid_user'] == 'CatherineL'){
                $sql = "INSERT INTO Admin (FirstName, LastName, UserName, Password) VALUES ('$FirstName', '$LastName', '$UserName', '$Password')";
                if (mysqli_query($dbc, $sql)) 
                {
                        //echo "The account for ".$FirstName." ".$LastName." was created and their user name is ".$UserName."\n";
                        echo "Created an admin account for ".$FirstName." ".$LastName." and their user name is ".$UserName."\n";
                } 
                else 
                {
                        //echo "Error could not create an account for ".$FirstName." ".$LastName."\n";
                        echo "Error creating record: " . mysqli_error($dbc);
                }                                                               
        }
        else{
                echo "Your admin account cannot add new admins only Carole Rodriguez and Catherine Law are allowed!!!";
        }
        
        //Closes database connection 
        mysqli_close($dbc);
              
}
?>





