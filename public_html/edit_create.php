<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Second Chance Association</title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta http-equiv="refresh" content="60" />
        <link rel="stylesheet" href="./css/style1.css">
    </head>
    <? include 'navbar.php' ?>
    <body>
        <div id="page" class="bodypage">
            <div id="content">
	    <div><h3>Edit/Create</h3></div>
	    	<label>Title</label><input type="text" name="surveyTitle"><br>
		<label>Camp</label><select name="camp"></select><br>
		<p>We could do a check all that apply from the camp drop down</p>
		<label>Survey Type</label><br>
			<input type="radio" name="surveyType" value="pre">Pre<br>
			<input type="radio" name="surveyType" value="post">Post<br>
                <p>
                This is the editing and creation page for STEM Academy Database Solution.		   
		   </p>
		<div id="sandbox">
			<div style="border-style: solid">
				<button>Add Answer</button>
				<button>Change Question Type</button>
				<button>Save</button><br> 
				<input type="text" value="Enter Question Here"></input><br>
			     	<input type="radio"><span contenteditable="true">Add Answer</span></input>
			</div>
		</div>
                <div id="nav" class="link">
                    <button><a href="add_question.php">Add Question</button><!--this will be a function call-->
                    <button><a href="save.php">Save</button><!-- this will be a function call-->
		    <button><a href="preview.php">Preview</button><!-- this should launch a modal window-->
                    <button><a href="index.php">Exit</button>
                </div>
            </div>
        </div>
    </body>
    <footer>
        <? include 'bottom.php'?>
    </footer>
</html>
