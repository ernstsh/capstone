<script>
var count = 0;
</script>

<html>
<head>
    	<script src="report_generation.js"></script>
</head>
<body>
<?php
session_start();
?>
<h3> Report Generation </h3>
<form method="post" onsubmit="return checkForm2(this);" enctype="multipart/form-data" >
        <label>Select a camp: </label>
        <select id="select1" name="select1">
                <?php
                 //Connect to database 
                $dbhost = 'oniddb.cws.oregonstate.edu';
                $dbname = 'nichokyl-db';
                $dbuser = 'nichokyl-db';
                $dbpass = '1hvHqfNBEOL6iwL9';
                $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                        or die("Error connecting to database server");

                mysql_select_db($dbname, $mysql_handle)
                        or die("Error selecting database: $dbname");
                //Get first name and last name from Responder table 
                $query = "SELECT * FROM Camp";
                $result = mysql_query($query);  
                
                //Fills dropdown list with the name and last name of each student 
                while ($row = mysql_fetch_array($result)) 
                {
                        $value = $row['camp_id'];
                        echo "<option value='$value'>" . $row{'title'}. "</option>";
                        
                        //echo "<option>" .$value. "</option>";
                }
                                   
                //Close connection to database 
                mysql_close($mysql_handle);
                ?>
        </select>
        <br>
        <input type="submit" value="submit" name="submit1" id="submit1"/>
</form> 

<!--<form method="post" onsubmit='GetSurveys.php' enctype="multipart/form-data">-->
<label>Select a survey: </label>
        <select id="select2" name="select2">
                <?php
                if (isset($_POST['submit1'])) 
                {
                        //Connect to database 
                        $dbhost = 'oniddb.cws.oregonstate.edu';
                        $dbname = 'nichokyl-db';
                        $dbuser = 'nichokyl-db';
                        $dbpass = '1hvHqfNBEOL6iwL9';
                        $mysql_handle = mysql_connect($dbhost, $dbuser, $dbpass)
                                or die("Error connecting to database server");

                        mysql_select_db($dbname, $mysql_handle)
                                or die("Error selecting database: $dbname");
                          
                        if(isset($_POST['select1']))
                        {
                                $campID = $_POST['select1'];
                                //Query the table S_Use for the rows that match the camp id 
                                $query = "SELECT * FROM S_Use WHERE camp_id='$campID'";
                                $result = mysql_query($query);   
                                while ($row = mysql_fetch_array($result)) 
                                {
                                        $surveyID = $row['survey_id'];
                                        $query2 = "SELECT * FROM Survey WHERE survey_id='$surveyID'";
                                        $result2 = mysql_query($query2);
                                        while($row2 = mysql_fetch_array($result2))
                                        {
                                              $value = $row2['survey_id'];
                                              echo "<option value='$value'>" .$row2{title}. "</option>";
                                        }
                                       
                                }        
                                
                        }
                        //Close connection to database 
                        mysql_close($mysql_handle);
                }                                   
                ?>
        </select>
        <br>
        <label>Select the survey type: <label> <br> 
        <input type="radio" name="Pre/Post" value="Pre" checked> Pre-survey<br>
        <input type="radio" name="Pre/Post" value="Post"> Post-survey <br>
        <input type="radio" name="Pre/Post" value="Both"> Both <br>
        <!--<input type="submit" value="submit" name="submit2" id="submit2"/> <br> -->
        <?php 
               if(isset($_POST['submit2'])) 
               {
                        $_SESSION['surveyID'] = $_POST['select2'];
                        $_SESSION['surveyType'] = $_POST['Pre/Post'];
               }
        ?>
        
</form> 
<h4>Queries will appear here:</h4>
<!--This is where the queries are appended to-->
<div class="query" id="query">
        <!--<button type="button" class="question">Select question</button>
        <button type="button" class="operator">Select operator</button>
        <button type="button" class="operand">Select operand</button>
        <button type="button" class="delete">-</button>
        <button type="button" class="add">+</button>-->
</div>

<label>Query type </label> <br>
<div id="QueryType">
<input type="radio" name="QueryChoice" value="ChangeResponse" id="ChangeResponse" checked> Change in response <br>
<input type="radio" name="QueryChoice" value="Regular" id="Regular"> Regular Query <br>
</div>

<label>Result type</label> <br>
<div id="ResultType">
<input type="radio" name="ResultChoice" value="Count" id="Count" checked> Count <br>
<input type="radio" name="ResultChoice" value="Percent" id="Percent"> Percentage <br>

<button type="button" class="addQuery" id="addQuery" onclick="AddQuery()">Add Query</button>
<button type="button" class="DeleteAll" id="DeleteAll" onclick="DeleteAll()">Reset</button>
<button type="button" class="submit" id="submit"> Submit </button>
<button type="button" class="save" id="save"> Save </button>
<button type="button" class="exit" id="exit"><a href="dashboard.php"> Exit </a></button> <br>

</body>

<!--The purpose of dummy is to keep track of count to give a unique id-->
<p id="dummy" value="0"></p>
<p id="currentChoice"></p>
</html>
