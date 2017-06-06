<script>
var count = 0;
</script>

<html>

<head>
    	<script src="report_generation.js"></script>
        <link rel="stylesheet" href="ReportPrintStyleSheet.css" type="text/css" media="print" />
        <link rel="stylesheet" href="../public_html/css/style2.css">
</head>


<body onload= "GetCamps()">
<div id="page" class="bodypage">

<?php
session_start();
?>

<h3 id="PageTitle"> Report Generation </h3>

<!--Drop down for selecting a camp-->  
<h4 id="label-1">Select a camp: </h4>       
<!--Calls GetCamps() function to fill drop down with the camp names-->
<div id="SelectCamp">
<select id="select1" name="select1" onchange="GetSurveys()">
                
</select>       
</div>
  
  
<!--Drop down for selecting a survey based on camp selection-->
<h4 id="label-2">Select a survey: </h4>
<div id="SelectSurvey">     
<select id="select2" name="select2">
             
</select>    
</div>

<!--Radio buttons for selecting the query type-->
<h4 id="label-4">Select the query type: </h4>
<form id="QueryType">
        <input type="radio" name="QueryChoice" value="Regular" id="Regular" checked>Query for multiple choice <br>
        <input type="radio" name="QueryChoice" value="ChangeResponse" id="ChangeResponse">Query for matrix and text questions 
</form>


<!--Radio buttons for selecting the result type-->
<!--<h4 id="label-5">Select the result type: </h4>
<form id="ResultType">
        <input type="radio" name="ResultChoice" value="Count" id="Count" checked> Count <br>
        <input type="radio" name="ResultChoice" value="Percent" id="Percent"> Percentage 
</form>-->


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
        <button type="button" class="submit" id="submit2" onclick="ReturnResult()"> Submit </button>
        
        <button type="button" class="save" id="save" onClick="Report_JSON()"> Save </button>
        <button type="button" class="exit" id="exit"><a href="SelectReportChoice.html" id="ExitLink"> Exit </a></button>
        <button type="button" id="print"><a href="javascript:window.print()" id="PrintLink"> Print  </a></button> <br>
</form>


<!--This is where the query results will go!!!!-->
<h4 id="QueryResultsText">Query Results</h4>
<form class="QueryResult" id="QueryResult">
        <!--For the adding a title to the form-->
        <input type="text" id="TitleReport" value="" class="TitleReport"/><br>
</form>

</body>

<footer>

</footer>

</html>
