
function pop_camp(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[0];
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "get_current_camps.php", false);
	xmlhttp.send();
}

function load_enrollment(value){
	str = "x=" + encodeURIComponent(value);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "get_enrollment.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[1];
				doc.innerHTML = xmlhttp.responseText;
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}
function get_survey(){
	var camp = document.getElementsByTagName("SELECT")[0].value;
	var student = document.getElementsByTagName("SELECT")[1].value;
	str = "x=" + encodeURIComponent(camp);
	console.log(str);
	var json;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "get_active_survey.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				console.log(xmlhttp.responseText);
				json = xmlhttp.responseText;
				generate_html(json);
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
	
}

function generate_text_question(question_data, doc) {
	var form = doc.getElementsByTagName("FORM")[0];
	var question = document.createElement("DIV");
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label><br><input type='text' placeholder='Put your answer here'></input>";
	form.appendChild(question);
}

function generate_multi_question(question_data, doc){
	var form = doc.getElementsByTagName("FORM")[0];
	var question = document.createElement("DIV");
	question.id = question_data.Q_id;
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label>";
	for(var i=0; i<question_data.ans.length; i++){
		question.innerHTML += "<br><input type='radio' value="+question_data.ans[i]+">"+question_data.ans[i]+"";
	}
	form.appendChild(question);
}

function generate_matrix_question(question_data, doc){
	var form = doc.getElementsByTagName("FORM")[0];
	var question = document.createElement("DIV");
	question.innerHTML = "<br><label>"+question_data.Q_topic+"</label><br>";
	if(question_data.Q_scale === "agree"){
		var string = "";
		for(var i=0; i<question_data.questions.length; i++){
			string += "<tr><td>"+question_data.questions[i]+"</td><td><input type='radio' value='SD'></td><td><input type='radio' value='D'></td><td><input type='radio' value='A'></td><td><input type='radio' value='SA'></td></tr><br>";
		}
		question.innerHTML += "<table><tr>      <th>Question</th><th>Strongly Disagree</th><th>Disagree</th><th>Agree</th><th>Strongly Agree</th></tr>"+string+"</table>";
	}
	else if(question_data.Q_scale === "not-deal"){
		var string = "";
		for(var i=0; i<question_data.questions.length; i++){
			string += "<tr><td>"+question_data.questions[i]+"</td><td><input type='radio' value='NA'></td><td><input type='radio' value='S'></td><td><input type='radio' value='M'></td><td><input type='radio' value='GD'></td></tr><br>";
		}
		question.innerHTML += "<table><tr>      <th>Question</th><th>Not at All</th><th>Slightly</th><th>Moderately</th><th>A Great Deal</th></tr>"+string+"</table>";
	}
	form.appendChild(question);
	
}

function add_submit(doc){
	var form = doc.getElementsByTagName("FORM")[0];
	var submit_button = document.createElement("DIV");
	submit_button.innerHTML = "<input type='submit' value='Submit'>";
	form.appendChild(submit_button);
}

function generate_html(data){
	
	var external = window.open("", "external", "width=500, height=600");
	external.document.write("<head><link rel='stylesheet' href='../public_html/css/style1.css'></head><div id='test'><form></form></div>");
	var doc = external.document.getElementById("test");
	var form = doc.getElementsByTagName("FORM")[0];
	form.innerHTML = "<h3>"+data.title+"</h3>";
	doc.appendChild(form);
	for(var i=0; i<data.questions.length; i++){
		if(data.questions[i].type === "text"){
			generate_text_question(data.questions[i], doc);
		}
		else if(data.questions[i].type === "multic"){
			generate_multi_question(data.questions[i], doc);
		}
		else if(data.questions[i].type === "matrix"){
			generate_matrix_question(data.questions[i], doc);
		}
	}
	add_submit(doc);

}