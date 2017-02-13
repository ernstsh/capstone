<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = '1hvHqfNBEOL6iwL9';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
 
if ((isset($_GET['userName'])) && (isset($_GET['password'])) ){

	//$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	
	$userName = mysqli_real_escape_string($dbc, trim($_GET['userName']));
	$password = mysqli_real_escape_string($dbc, trim($_GET['password']));
	//echo $userName;
	//echo $password;
    
	if (!$dbc) {
		die('Could not connect: ');
	}

	$query = "SELECT * FROM Admin WHERE UserName='$userName' and Password = '$password'";

	$result = mysqli_query($dbc, $query);
	
	if (mysqli_num_rows($result) == 1) {
	//echo "<p> logged in";
        // The log-in is OK so set the user ID and username session vars (and cookies), and redirect to the home page
        $row = mysqli_fetch_array($result);
       // The log-in is OK so set the user ID and username session vars (and cookies), and redirect to the home page
	$_SESSION['firstName'] = $row['FirstName'];
	$_SESSION['valid_user'] = $row['UserName'];
       // echo "success";
	header('Location: dashboard.php');
        exit;
         /* Redirect browser */
		//header("Location: ProjectAboutPage.html");
 
		/* Make sure that code below does not get executed when we redirect. */
		//exit;
        }
    else 
	{
          // The username/password are incorrect so set an error message
         // echo "Enter a valid password ";
		  header('Location: adminLogin.html');
	//	  echo "Invalid password";
		  exit;
    }
	mysqli_free_result($result);
	mysqli_close($dbc);
}  
?>






