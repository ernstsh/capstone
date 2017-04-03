<!DOCTYPE html>
<html>
    <head>
		<script src="../public_html/js/jquery-3.1.1.min.js"></script>
    	<script src="../public_html/js/questionGeneration.js"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <link rel="stylesheet" href="../public_html/css/style1.css">
    </head>
    <? include 'navbar.php' ?>
    <body onload="load()">
        <div id="page" class="bodypage">
            <div id="content">
				<div>
					<h3>Edit/Create</h3>
				</div>
				<form name="create_survey">
					<label>Load Preexisting Survey</label><select onmousedown="this.value='';" onchange="load_survey(this.value);"></select><br>
					<label>Title</label><input type="text" name="surveyTitle"><br>
					<label>Camp</label><select name="camp">
					</select><br>
					<p>We could do a check all that apply from the camp drop down</p>
					<label>Survey Type</label><br>
						<input type="radio" name="surveyType" value="pre">Pre<br>
						<input type="radio" name="surveyType" value="post">Post<br>
				</form>	
                <p>This is the editing and creation page for STEM Academy Database Solution.</p>
				<div id="sandbox">
					<!--This is where the content goes-->
				</div>
                <div id="nav" class="link">
					Add a New Question
                    <select onmousedown="this.value='';" onchange="choose_question_type(this.value);">
						<option value="text">Text Entry</option>
						<option value="multi">Multiple Choice</option>
						<option value="matrix">Matrix</option>
					</select>	
					Add Frequently Used Question
                    <select onmousedown="this.value='';" onchange="choose_freq_q(this.value);">
					</select>
                    <button onclick="save()"><a href="dashboard.php">Save</a></button><!-- this will be a function call-->
					<button onclick="generate_html()">Preview</button><!-- this should launch a modal window-->
                    <button><a href="dashboard.php">Exit</a></button>
                </div>
				
            </div>
        </div>
    </body>
    <footer>
        <? include 'bottom.php'?>
    </footer>
</html>
