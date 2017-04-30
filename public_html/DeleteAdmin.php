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
        if (!$dbc) {
                 die('Could not connect: ');
        }
        
        //Receives the JSON containing the first name, last name and user name of the admin that is going to be deleted 
        $admin_json = file_get_contents('php://input');

        
        //Decodes the JSON string 
        $data = json_decode($admin_json); 
        
        //Gets the last name, first name, and user name from the JSON object and removes quotations 
        $LastName = json_encode($data->lastName);
        $LastName = str_ireplace('"', '', $LastName);
        $FirstName = json_encode($data->firstName);
        $FirstName = str_ireplace('"', '', $FirstName);
        $UserName = json_encode($data->userName);
        $UserName = str_ireplace('"', '', $UserName);
        
        //Check to see if its a valid admin that can delete accounts 
        if($_SESSION['valid_user'] == 'CaroleR' Or $_SESSION['valid_user'] == 'CatherineL'){
                //Makes sure that Cathy and Carole do not delete each others or their own accounts 
                if( ($FirstName != 'Catherine' and $LastName != 'Law' and $UserName != 'CatherineL')
                        and ($FirstName != 'Carole' and $LastName != 'Rodriguez' and $UserName != 'CaroleR') ){
                                
                        $sql = "DELETE FROM Admin WHERE FirstName = '$FirstName' AND LastName = '$LastName' AND UserName = '$UserName'";                                                
                        if(mysqli_query($dbc, $sql)){                     
                                echo "You were able to delete ".$FirstName." ".$LastName." account\n";
                        }
                        else{
                                echo "You were NOT able to delete ".$FirstName." ".$LastName." account\n";
                        }
                        mysqli_free_result($resultQuery);
                }
                //Else attempting to delete Catherine's or Carole's account 
                else{
                        echo "Carole Rodriguez and Catherine Law accounts cannot be deleted!!!\n";
                }
        }
        //invalid admin they are not allowed to delete accounts!!!
        else{
                echo "Your admin account is not allowed to delete admins only Catherine Law and Carole Rodriguez are allowed!!!";
        }            
        
        //Closes the database connection 
        mysqli_close($dbc);
}       
?>

