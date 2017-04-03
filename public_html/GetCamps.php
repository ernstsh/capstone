<?php
                //Connect to database  
                $dbhost = 'oniddb.cws.oregonstate.edu';
                $dbname = 'nichokyl-db';
                $dbuser = 'nichokyl-db';
                $dbpass = 'ZlpiHLTMmA44Z0tg';
                
                $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                        or die("Error connecting to database server");
                //Checks to see if the connection was successful or not 
                mysql_select_db($dbname, $mysql_handle)
                        or die("Error selecting database: $dbname");
                
                //Gets all of the information from the camp table 
                $query = "SELECT * FROM Camp";
                $result = mysql_query($query);  
                
                //Fills dropdown list with the name and last name of each student 
                while ($row = mysql_fetch_array($result)) 
                {
                        $value = $row['camp_id'];
                        echo "<option value='$value'>" . $row{'title'}. "</option>";
                        //echo "<option value='".htmlspecialchars($row{'camp_id'])."'>".htmlspecialchars($row['title'])."</option>";

                }
                                   
                //Close connection to database 
                mysql_close($mysql_handle);
?>