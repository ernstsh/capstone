<!DOCTYPE HTML>
<!--Need to populate the first dropdown menu with what camps are 
going on based on the current date. The second one needs to be students
enrolled in that camp--> 
<html>
	<head>
		<script src="../public_html/js/surveyTaking.js"></script>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <link rel="stylesheet" href="../public_html/css/style1.css">
	</head>
	<body onload="pop_camp();">
		
		
			<label>Select Your Camp</label><select onmousedown="this.value='';" onchange="load_enrollment(this.value);"></select><br>
			<label>Select Your Name</label><select></select><br>
			
			<button onclick="get_survey();">Submit</button>
		
	</body>
</html>
