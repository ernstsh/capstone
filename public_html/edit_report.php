<script>
var count = 0;
</script>

<html>
<head>
    	<script src="edit_report.js"></script>
        <link rel="stylesheet" href="ReportPrintStyleSheet.css" type="text/css" media="print" />
</head>
<body>
<?php
session_start();
?>
<h3 id="PageTitle"> Report Generation </h3>
<form method="post" onsubmit="return checkForm2(this);" enctype="multipart/form-data" >
        <label id="label-1">Select a camp: </label>
        <select id="select1" name="select1">
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
<label id="label-2">Select a survey: </label>
        <select id="select2" name="select2">
                <?php
                if (isset($_POST['submit1'])) 
                {
                        //Connect to database 
                        $dbhost = 'oniddb.cws.oregonstate.edu';
                        $dbname = 'nichokyl-db';
                        $dbuser = 'nichokyl-db';
                        $dbpass = 'ZlpiHLTMmA44Z0tg';
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
        <label id="label-3">Select the survey type: </label>
        <div><br>
        <input type="radio" name="Pre/Post" id="Pre" value="Pre" checked onClick="RemoveChangeResponse()"> <label id="PreText"> Pre-survey</label><br>
        <input type="radio" name="Pre/Post" id="Post" value="Post" onClick="RemoveChangeResponse()"> <label id="PostText">Post-survey</label> <br>
        <input type="radio" name="Pre/Post" id="Both" value="Both"> <label id="BothText">Both</label> <br>
        </div>
        <!--<input type="submit" value="submit" name="submit2" id="submit2"/> <br> -->
        <?php 
               if(isset($_POST['submit2'])) 
               {
                        $_SESSION['surveyID'] = $_POST['select2'];
                        $_SESSION['surveyType'] = $_POST['Pre/Post'];
               }
        ?>
        
</form> 
<label id="label-4">Query type </label>
<div id="QueryType">
<input type="radio" name="QueryChoice" value="ChangeResponse" id="ChangeResponse" checked> Change in response <br>
<input type="radio" name="QueryChoice" value="Regular" id="Regular"> Regular Query <br>
</div>

<label id="label-5">Result type</label>
<div id="ResultType">
<input type="radio" name="ResultChoice" value="Count" id="Count" checked> Count <br>
<input type="radio" name="ResultChoice" value="Percent" id="Percent"> Percentage <br>
</div>

<h4 id="Demographics">Demographic options:</h4>

<label id="label-6">Gender:</label>

<select id="Gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
</select>

<br>

<label id="label-7">Student grade level</label>
<select id="SelectGrade">
        <option value="1Grade">1</option>
        <option value="2Grade">2</option>
        <option value="3Grade">3</option>
        <option value="4Grade">4</option>
        <option value="5Grade">5</option>
        <option value="6Grade">6</option>
        <option value="7Grade">7</option>
        <option value="8Grade">8</option>
        <option value="9Grade">9</option>
        <option value="10Grade">10</option>
        <option value="11Grade">11</option>
        <option value="12Grade">12</option>
</select>

<br>

<label id="label-8">Parent's highest education</label>
<select id="SelectEducation">
        <option>Middle school</option>
        <option>High School</option>
        <option>2yr. College degree</option>
        <option>4yr. College degree</option>
        <option>4+yr. College degree</option>
</select><br>
<h4 id="QueryText">Queries will appear here:</h4>
<!--This is where the queries are appended to-->
<div class="query" id="query">
        <!--<button type="button" class="question">Select question</button>
        <button type="button" class="operator">Select operator</button>
        <button type="button" class="operand">Select operand</button>
        <button type="button" class="delete">-</button>
        <button type="button" class="add">+</button>-->
</div>
<!--
<input type="checkbox" id="cbox2" value="second_checkbox"> <label for="cbox2">This is the second checkbox</label>
-->

<form>
<button type="button" class="addQuery" id="addQuery" onclick="AddQuery()">Add Query</button>
<button type="button" class="DeleteAll" id="DeleteAll" onclick="DeleteAll()">Reset</button>
<button type="button" class="submit" id="submit2" onclick="AddQueryResult()"> Submit </button>
<button type="button" class="save" id="save" onClick="Report_JSON()"> Save </button>
<button type="button" class="exit" id="exit"><a href="dashboard.php"> Exit </a></button> <br>
</form>


<button type="button" id="print"><a href="javascript:window.print()"> Print </a></button> <br>


<!--The purpose of dummy is to keep track of count to give a unique id-->
<p id="dummy" value="0"></p>
<p id="currentChoice"></p>

<!--This is where the query results will go!!!!-->
<h4 id="QueryResultsText">Query Results</h4>
<form class="QueryResult" id="QueryResult" method="post" onsubmit="SaveReport.php">

</form>
<!--<div class="QueryResult" id="QueryResult">
</div>
-->

<p id="reportJSON"></p>
</body>
</html>
