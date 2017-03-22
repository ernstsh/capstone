<?php
session_start();
		
//Checks if the user is logged in 
if(isset($_SESSION['valid_user'])){
       //Checks if the userName, password, firstName, lastName fields are set 
        if ((isset($_GET['userName'])) && (isset($_GET['password'])) && (isset($_GET['firstName'])) && (isset($_GET['lastName']))){
                //information needed for making the database connection
                $dbhost = 'oniddb.cws.oregonstate.edu';
                $dbname = 'nichokyl-db';
                $dbuser = 'nichokyl-db';
                $dbpass = 'ZlpiHLTMmA44Z0tg';
        
                //Create a connection to the database
                $dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
                if (!$dbc) {
                        die('Could not connect: ');
                }
        
                //Gets the values for the userName, firstName, lastName, and password fields 
                $userName = $_GET['userName'];
                $password = $_GET['password'];
                $firstName = $_GET['firstName'];
                $lastName = $_GET['lastName'];
                echo $userName;
                echo $password;
                echo $firstName;
                echo $lastName;
                //Checks to see if the admin that is logged in is Carol or Kathy 
                if($_SESSION['valid_user'] == 'francoj'){
                        $sql = "INSERT INTO Admin (FirstName, LastName, UserName, Password) VALUES ('$firstName', '$lastName', 
                                                  '$userName', '$password')";
                        if (mysqli_query($dbc, $sql)) 
                        {
                                echo "You were able to create a new admin";
                        } 
                        else 
                        {
                                //echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                echo "Error could not create new admin";
                        }
                        mysqli_query($dbc);                                            
                }
                else{
                        echo "You are not allowed to create new admins only francoj is allowed!";
                }
                mysqli_close($dbc);
        }       
}
?>





