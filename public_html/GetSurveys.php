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
        
        //Gets camp choice 
        $campID = file_get_contents('php://input');
        //echo "We got: ".$campID."\n";
        
        
        $query = "SELECT * FROM Camp WHERE camp_id='$campID'";
        $result = mysql_query($query);   
        while ($row = mysql_fetch_array($result)) {
                $PreSurveyID = $row['pre'];
                $query2 = "SELECT * FROM Survey WHERE survey_id='$PreSurveyID'";
                
                $PostSurveyID = $row['post'];
                $query3 = "SELECT * FROM Survey WHERE survey_id='$PostSurveyID'";
                
                $result2 = mysql_query($query2);
                $result3 = mysql_query($query3);
                
                while($row2 = mysql_fetch_array($result2)){
                        $value = $row2['survey_id'];
                        echo "<option value='$value'>" .$row2{title}. "</option>";                                 
                } 
                
                while($row3 = mysql_fetch_array($result3)){
                        $value = $row3['survey_id'];
                        echo "<option value='$value'>" .$row3{title}. "</option>";                                 
                } 
                
                
                
        }       
        
        
        
        //Close connection to database 
        mysql_close($mysql_handle);
                                                
?>