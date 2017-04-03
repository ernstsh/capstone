
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
	console.log(value);
	str = "x=" + encodeURIComponent(value);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "get_enrollment.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[1];
				console.log(xmlhttp.responseText);
				doc.innerHTML = xmlhttp.responseText;
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}

function create_survey_json(){
	var title = document.forms["create_survey"]["surveyTitle"].value;
	var camp = document.getElementsByTagName("SELECT")[0].value;
	//console.log(document.getElementsByTagName("SELECT")[0].value);
	var type = document.forms["create_survey"]["surveyType"].value;
	var survey_json = {};
	var fuqs = [];
	survey_json.title = title;
	survey_json.camp = camp;
	survey_json.type = type;
	var doc = document.getElementById("sandbox");
	var qs = doc.getElementsByClassName("question");
	survey_json.questions = [];
	for(var i = 0; i<qs.length; i++){
		var question = {};
		question.Q_id = qs[i].name;
		//question.Q_id = "101"
		if(question.Q_id.substring(0,2) === "QT"){
			question.type = "text";
			question.Q_text = qs[i].getElementsByTagName("INPUT")[0].value;
			if(qs[i].getElementsByTagName("INPUT")[1].checked == true){
				fuqs.push(question);
			}
		}
		else if(question.Q_id.substring(0,3) === "QMC"){
			question.type = "multic";
			var input_elements = qs[i].getElementsByTagName("INPUT");
			question.Q_text = input_elements[0].value;
			question.ans = [];
			for(var j=2; j<input_elements.length; j++){
				question.ans[j-2] = input_elements[j].value;
			}
			if(input_elements[1].checked == true){
				fuqs.push(question);
			}
		}
		else if(question.Q_id.substring(0,2) === "QM"){
			question.type = "matrix";
			var input_elements = qs[i].getElementsByTagName("INPUT");
			question.Q_topic = input_elements[0].value;
			question.Q_scale = qs[i].getElementsByTagName("SELECT")[0].value;
			question.questions = [];
			for(var j=2; j<input_elements.length; j++){
				question.questions[j-2] = input_elements[j].value;
			}
			if(input_elements[1].checked == true){
				fuqs.push(question);
			}
		}
		survey_json.questions[i] = question;
	}
	var res = {"survey": survey_json, "fuqs": fuqs};
	return res;
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

function generate_html(){
	var data = create_survey_json().survey;
	console.log(data);
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