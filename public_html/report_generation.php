<script>
var count = 0;
</script>

<html>

<head>
    	<script src="report_generation.js"></script>
        <link rel="stylesheet" href="ReportPrintStyleSheet.css" type="text/css" media="print" />
        <link rel="stylesheet" href="ReportStyleSheet.css" type="text/css" />
        
        <!--<link rel="stylesheet" href="TopNav.css" type="text/css" />-->
       
</head>

<body>

<?php
session_start();
//include_once('TopNav.php');
?>


<!--This is the navigation bar of the page
<div class="topnav" id="myTopnav">
        <a href="AddAdmin.html" id="AddAdmin">Add Admin</a>
        <a href="DeleteAdmin.html" id="DeleteAdmin">Delete Admin</a>
	<a href="addCamp.php" id="AddCamp">Add Camp</a>
        <a href="edit_create.php" id="SurveyGen">Edit/create a Survey</a>
        <a href="SelectReportChoice.html" id="ReportGen">Edit/Create a Report</a>
        <a href="adminLogOut.php" id="LogOut">Log Out</a>
</div>
This is the navigation bar of the page-->

<h3 id="PageTitle"> Report Generation </h3>


<!--Drop down for selecting a camp-->  
<h4 id="label-1">Select a camp: </h4>       
<!--Calls GetCamps() function to fill drop down with the camp names-->
<div id="SelectCamp">
<select id="select1" name="select1" onclick="GetCamps()">
                
</select>       
</div>
  
  
<!--Drop down for selecting a survey based on camp selection-->
<h4 id="label-2">Select a survey: </h4>
<div id="SelectSurvey">     
<select id="select2" name="select2" onclick="GetSurveys()">
             
</select>    
</div>


<!--Radio buttons for selecting the survey type-->        
<h4 id="label-3">Select the survey type: </h4>            
<form id="SurveyType">
        <input type="radio" name="Pre/Post" id="Pre" value="Pre" onClick="RemoveChangeResponse()" checked> Pre-survey<br>
        <input type="radio" name="Pre/Post" id="Post" value="Post" onClick="RemoveChangeResponse()"> Post-survey<br>
        <input type="radio" name="Pre/Post" id="Both" value="Both"> Both
</form>
   
   
<!--Radio buttons for selecting the query type-->
<h4 id="label-4">Select the query type: </h4>
<form id="QueryType">
        <input type="radio" name="QueryChoice" value="Regular" id="Regular" checked>Regular Query<br>
        <input type="radio" name="QueryChoice" value="ChangeResponse" id="ChangeResponse">Change in response
</form>


<!--Radio buttons for selecting the result type-->
<h4 id="label-5">Select the result type: </h4>
<form id="ResultType">
        <input type="radio" name="ResultChoice" value="Count" id="Count" checked> Count <br>
        <input type="radio" name="ResultChoice" value="Percent" id="Percent"> Percentage 
</form>


<!--Demographic information starts here-->
<h4 id="Demographics">Demographic information:</h4>

<!--Gender option-->
<div id="GenderDiv">
<label id="label-6">Gender:</label>
<select id="Gender">
        <option>--Select--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
</select>
</div>

<br>

<!--Grade level option-->
<div id="GradeDiv">
<label id="label-7">Student grade level:</label>
<select id="SelectGrade">
        <option value="select">--Select--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
</select>
</div>

<br>

<!--Parent's highest level of education-->
<div id="ParentEducationDiv">
<label id="label-8">Parent's highest education:</label>
<select id="SelectEducation">
        <option>--Select--</option>
        <option>Did not complete high school</option>
        <option>High school diploma or GED</option>
        <option>Some college but no degree</option>
        <option>Associate degree or technical degree</option>
        <option>Bachelor's degree</option>
        <option>Master's degree, PHD, or professional degree</option>
        <option>Decline to answer</option>
</select>
</div>

<br>

<!--Student's Race-->
<div id="RaceDiv">
<label id="label-9">Student Race:</label>
<select id="SelectRace">
        <option>--Select--</option>
        <option>African American</option>
        <option>White</option>
        <option>Asian</option>
        <option>American Indian or Alaskan Native</option>
        <option>Native Hawaiian or Other Pacific Islander</option>
        <option>Decline to answer</option>
</select>
</div>

<br>

<!--Student's ethnicity-->
<div id="EthnicityDiv">
<label id="label-10">Student Ethnicity</label>
<select id="SelectEthinicity">
        <option>--Select--</option>
        <option>Hispanic or Latino</option>
        <option>Not Hispanic or Latino</option>
</select>
</div>

<br>

<!--Free or reduced lunch-->
<div id="LunchDiv">
<label id="label-11">Free or Reduced Lunch</label>
<select id="SelectLunchType">
        <option>--Select--</option>
        <option>Yes</option>
        <option>Eligible but did not participate</option>
        <option>Not eligible</option>
        <option>Decline to answer</option>
</select>
</div>

<!--This is where the queries are appended to-->
<h4 id="QueryText">Queries will appear here:</h4>
<div class="query" id="query">
       
</div>

<br>

<!--Buttons for adding a query template, resetting, submitting, saving, exiting, and printing-->
<form id="Buttons">
        <button type="button" class="addQuery" id="addQuery" onclick="AddQuery()">Add Query</button>
        <button type="button" class="DeleteAll" id="DeleteAll" onclick="DeleteAllQueries()">Reset</button>
        
        <!--<button type="button" class="submit" id="submit2" onclick="AddQueryResult()"> Submit </button>-->
        <button type="button" class="submit" id="submit2" onclick="QueryJSON()"> Submit </button>
        
        <button type="button" class="save" id="save" onClick="Report_JSON()"> Save </button>
        <button type="button" class="exit" id="exit"><a href="dashboard.php" id="ExitLink"> Exit </a></button>
        <button type="button" id="print"><a href="javascript:window.print()" id="PrintLink"> Print  </a></button> <br>
</form>


<!--This is where the query results will go!!!!-->
<h4 id="QueryResultsText">Query Results</h4>
<form class="QueryResult" id="QueryResult">
        <!--For the adding a title to the form-->
        <input type="text" id="TitleReport" value="" style="width=640px;"/><br>
</form>


<!--Elements for verifying if the page is functioning properly-->
<p id="dummy" value="0"></p>
<p id="currentChoice"></p>
<p id="reportJSON"></p>

</body>

<footer>

</footer>

</html>
