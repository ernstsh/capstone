function uuid(prefix){
	var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var id = prefix;
	for(var i = 0; i<15; i++){
		id+=options[Math.floor((Math.random()*62)+1)];
	}
	return id;
}
function add_text_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = uuid("QT_"); //fix
	question.name = uuid("QT_");
	question.className = "question";
	question.style ="border-style: solid";
	question.innerHTML="Provide your text entry question <input type='text' name='q1' value='Enter Question Here'></input>";
	node.appendChild(question);
}

function add_answer(id) {
	var node = document.getElementById(id);
	var ans = document.createElement("INPUT");
	ans.type = "text";
	ans.name = "atext";
	ans.value = "Enter answer here";
	node.appendChild(ans);	
}

function add_question(id) {
	var node = document.getElementById(id);
	var ans = document.createElement("INPUT");
	ans.type = "text";
	ans.name = "qtext";
	ans.value = "Enter question here";
	node.appendChild(ans);	
}

function add_multi_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = uuid("QMC_"); //fix
	question.name = uuid("QMC_");
	question.className = "question";
	question.style ="border-style: solid";
	question.innerHTML="<button onclick='add_answer(\""+question.id+"\")'>Add Answer</button><br><input type='text' name='qtext' value='Enter Question Here'></input><br><input type='text' name='atext' value='Enter answer here'></input>";
	node.appendChild(question); 	
}

function add_matrix_question() {
	console.log("hit");
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	var id = uuid("M_");
	question.id = id;
	question.name = id;
	question.style = "border-style: solid";
	question.innerHTML = "Select a scale<select><option value='agree'>Agree - Disagree</option><option value='not-deal'>Not at All - Great Deal</option></select><br>What is the topic of the matrix?<input type='text' name='topic' value='Enter the topic text'><br><input type='text' name='qtext' value='Enter question here'><br><button onclick='add_question(\""+question.id+"\")'>Add Question</button>";
	node.appendChild(question);
	
}

function choose_question_type(value){
	console.log(value);
	if(value === "text"){
		add_text_question();	
	}
	else if(value === "multi"){
		add_multi_question();	
	}
	
	else if(value === "matrix"){
		console.log("hit hit");
		add_matrix_question();	
	}
	else{}
}

function create_survey_json(){
	var title = document.forms["create_survey"]["surveyTitle"].value;
	//var camp = document.forms["create_survey"]["camp"].value;
	var type = document.forms["create_survey"]["surveyType"].value;
	var survey_json = {};
	survey_json.title = title;
	//survey_json.camp = camp;
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
		}
		else if(question.Q_id.substring(0,3) === "QMC"){
			question.type = "multic";
			input_elements = qs[i].getElementsByTagName("INPUT");
			question.Q_text = input_elements[0].value;
			question.ans = [];
			for(var j=1; j<input_elements.length; j++){
				question.ans[j-1] = input_elements[j].value;
			}
		}
		else if(question.Q_id.substring(0,2) === "M_"){
			question.type = "matrix";
			input
		}
		survey_json.questions[i] = question;
	}
	return survey_json;
}

function generate_text_question(question_data, doc) {
	var form = doc.getElementsByTagName("FORM")[0];
	var question = document.createElement("DIV");
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label><br><input type='text' value='Put your answer here'></input>";
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

function generate_html(){
	var data = create_survey_json();
	var external = window.open("", "external", "width=500, height=600");
	external.document.write("<div id='test'><form></form></div>");
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
	}

}

function save() {
    console.log("saving");
	var json = create_survey_json();
	var str = JSON.stringify(json);
	console.log(str);
	str = "x=" + encodeURIComponent(str);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "save_db.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				alert(xmlhttp.responseText);	
			}	
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}
