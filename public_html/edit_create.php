<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="SurveyPrintStyleSheet.css" type="text/css" media="print" />
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
					<h3 id="h3-1">Edit/Create</h3>
				</div>
				<form name="create_survey" id="create_survey">
					<label id="label-1">Load Preexisting Survey</label><select id= "LoadSurvey" onmousedown="this.value='';" onchange="load_survey(this.value);"></select><br>
					<label id="label-2">Title</label><input type="text" name="surveyTitle" id="SurveyTitle"><br>
					<label id="label-3">Camp</label><select name="camp" id="Camp">
					</select><br>
					<p id="CheckApply">We could do a check all that apply from the camp drop down</p>
					<label id="label-4">Survey Type</label><br>
						<input type="radio" name="surveyType" value="pre" id="Pre">Pre<br>
						<input type="radio" name="surveyType" value="post" id="Post">Post<br>
				</form>	
                <p id="PageType">This is the editing and creation page for STEM Academy Database Solution.</p>
				<div id="sandbox">
					<!--This is where the content goes-->
				</div>
                <div id="nav" class="link">
					<label id="label-5">Add a New Question</label>
                    <select id="QuestionType" onmousedown="this.value='';" onchange="choose_question_type(this.value);">
						<option value="text">Text Entry</option>
						<option value="multi">Multiple Choice</option>
						<option value="matrix">Matrix</option>
					</select>	
					<label id="label-6">Add Frequently Used Question</label>
                    <select id="FrequentQuestions" onmousedown="this.value='';" onchange="choose_freq_q(this.value);">
					</select>
                    <button onclick="save()" id="SaveButton"><!--<a href="dashboard.php">-->Save<!--</a>--></button><!-- this will be a function call-->
					<button onclick="generate_html()" id="Preview">Preview</button><!-- this should launch a modal window-->
                    <button id="Exit"><a href="dashboard.php">Exit</a></button>
                    <button type="button" id="Print"><a href="javascript:window.print()" id="PrintLink">Print</a></button>

                </div>
				
            </div>
        </div>
    </body>
    <footer>
        <? include 'bottom.php'?>
    </footer>
</html>
