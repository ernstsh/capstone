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
	
	if (mysqli_num_rows($result) == 1) {
           // The log-in is OK so set the user ID and username session vars (and cookies), and redirect to the home page
           $row = mysqli_fetch_array($result);
           // The log-in is OK so set the user ID and username session vars (and cookies), and redirect to the home page
	   $_SESSION['valid_user'] = $row['UserName'];
	   header('Location: dashboard.php');
           exit;
           /* Redirect browser */
	   
	   /* Make sure that code below does not get executed when we redirect. */
        }
        else {
          // The username/password are incorrect so set an error message
		  header('Location: adminLogin.html');
		  exit;
        }
	mysqli_free_result($result);
	mysqli_close($dbc);
}  
?>






