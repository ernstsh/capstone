<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>STEM Academy Database Solution</title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta http-equiv="refresh" content="60" />
        <link rel="stylesheet" href="dashboard.css">
    </head>
    <? include 'navbar.php' ?>
    <body>
        <div id="page" class="bodypage">
            <div id="content">
	    <div><h3>Main Page</h3></div>                
                <h4>This is the main page for STEM Academy Database Solution.</h4>		   		  
                <div id="nav" class="link">
                    <ul><li><a href="AddAdmin.html" id="AddAdmin">Add Admin</a></li></ul>
                    <ul><li><a href="DeleteAdmin.html" id="DeleteAdmin">Delete Admin</a></li></ul>
		    <ul><li><a href="addCamp.php" id="AddCamp">Add Camp</a></li></ul>
                    <ul><li><a href="edit_create.php" id="SurveyGen">Edit/create a Survey</a></li></ul>
                    <ul><li><a href="SelectReportChoice.html" id="ReportGen">Edit/Create a Report</a></li></ul>
                    <ul><li><a href="adminLogOut.php" id="LogOut">Log Out</a></li></ul>
                </div>
            </div>
        </div>
    </body>
    <footer>
        <? include 'bottom.php'?>
    </footer>
</html>
