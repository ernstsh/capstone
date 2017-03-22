<!DOCTYPE HTML>
<!--Need to populate the first dropdown menu with what camps are 
going on based on the current date. The second one needs to be students
enrolled in that camp--> 
<html>
	<head>
	</head>
	<body>
		<form action="" method="post">
			<p>Select your name </p>
			<select name="student">
				<option selected="selected">--Select</option>
                                <?php
                                        //Connect to database 
                                        $dbhost = 'oniddb.cws.oregonstate.edu';
                                        $dbname = 'nichokyl-db';
                                        $dbuser = 'nichokyl-db';
                                        $dbpass = 'ZlpiHLTMmA44Z0tg';
                                        $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                                            or die("Error connecting to database server");

                                        mysql_select_db($dbname, $mysql_handle)
                                            or die("Error selecting database: $dbname");
                                        //Get first name and last name from Responder table 
                                        $query = "SELECT first_name, last_name FROM Responder";
                                        $result = mysql_query($query);  
                                        
                                        //Fills dropdown list with the name and last name of each student 
                                        while ($row = mysql_fetch_array($result)) 
                                        {
                                                echo "<option>" . $row{'first_name'} . " " .$row{'last_name'}. "</option>";
                                        }
                                        
                                        //Close connection to database 
                                        mysql_close($mysql_handle);
                                ?>
			</select><br>
			<p>Find your camp</p>
			<select name="camp">
				<option selected="selected">--Select</option>
                                  <?php
                                        //Connect to database 
                                        $dbhost = 'oniddb.cws.oregonstate.edu';
                                        $dbname = 'nichokyl-db';
                                        $dbuser = 'nichokyl-db';
                                        $dbpass = 'ZlpiHLTMmA44Z0tg';
                                        $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                                            or die("Error connecting to database server");

                                        mysql_select_db($dbname, $mysql_handle)
                                            or die("Error selecting database: $dbname");
                                        //Get first name and last name from Responder table 
                                        $query = "SELECT title FROM Camp";
                                        $result = mysql_query($query);  
                                        
                                        //Fills dropdown list with the name and last name of each student 
                                        while ($row = mysql_fetch_array($result)) 
                                        {
                                                echo "<option>" . $row{'title'} . "</option>";
                                        }
                                        
                                        //Close connection to database 
                                        mysql_close($mysql_handle);
                                ?>
			</select><br>
			<input type="submit" value="Submit">
		</form>
	</body>
</html>
