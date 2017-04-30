<?php
	session_start();
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
 
if ((isset($_GET['userName'])) && (isset($_GET['password'])) ){
	$userName = mysqli_real_escape_string($dbc, trim($_GET['userName']));
	$password = mysqli_real_escape_string($dbc, trim($_GET['password']));
    
	if (!$dbc) {
		die('Could not connect: ');
	}

	$query = "SELECT * FROM Admin WHERE UserName='$userName' and Password = '$password'";

	$result = mysqli_query($dbc, $query);
	
        //If the user is able to log in redirect to dashboard and set session variable to their user name
	if (mysqli_num_rows($result) == 1) {
           $row = mysqli_fetch_array($result);
	   $_SESSION['valid_user'] = $row['UserName'];
	   header('Location: dashboard.php');
           exit;
	   
        }
        //User could not login redirect to login to try again 
        else {
		  header('Location: adminLogin.html');
		  exit;
        }
	mysqli_free_result($result);
	mysqli_close($dbc);
}  
?>






