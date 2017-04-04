
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
	xmlhttp.open("POST", "get_active_survey.php", false);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				console.log(xmlhttp.responseText);
				data = JSON.parse(xmlhttp.responseText);
				data.camp_id = camp;
				data.responder_id = student;
				console.log(data);
				generate_html(data);
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
	
}


function generate_text_question(question_data, doc) {
	var form = doc.getElementById("test");
	var question = document.createElement("DIV");
	question.id = "QT"+question_data.Q_id;
	question.className = "question";
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label><br><input type='text' placeholder='Put your answer here'></input>";
	form.appendChild(question);
}

function generate_multi_question(question_data, doc){
	var form = doc.getElementById("test");
	var question = document.createElement("DIV");
	question.id = "QMC"+question_data.Q_id;
	question.className = "question";
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label>";
	for(var i=0; i<question_data.ans.length; i++){
		question.innerHTML += "<br><input type='radio' value="+question_data.ans[i]+">"+question_data.ans[i]+"";
	}
	form.appendChild(question);
}

function generate_matrix_question(question_data, doc){
	var form = doc.getElementById("test");
	var question = document.createElement("DIV");
	question.id = "QM"+question_data.Q_id;
	question.className = "question";
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
			string += "<tr id='matrix_q'><td>"+question_data.questions[i]+"</td><td><input type='radio' value='NA'></td><td><input type='radio' value='S'></td><td><input type='radio' value='M'></td><td><input type='radio' value='GD'></td></tr><br>";
		}
		question.innerHTML += "<table><tr>      <th>Question</th><th>Not at All</th><th>Slightly</th><th>Moderately</th><th>A Great Deal</th></tr>"+string+"</table>";
	}
	form.appendChild(question);
	
}
function collect_response(id_json){
	id_json.ans = [];
	var doc = document.getElementById("test");
	var qs = doc.getElementsByClassName("question");
	for(var i = 0; i<qs.length; i++){
		if(qs[i].Q_id.substring(0,2) === "QT"){
			id_json.ans[i] = qs[i].getElementsByTagName("INPUT")[0].value;
		}
		else if(qs[i].Q_id.substring(0,3) === "QMC"){
			var els = qs[i].getElementsByTagName("INPUT");
			console.log(els);
			for(int k=0; k<els.length; k++){
				if(els[k].checked){
					id_json.ans[i] = els[k].value;
				}
			}
		}
		else if(qs[i].Q_id.substring(0,2) === "QM"){
			var els = qs[i].getElementsById("matrix_q");
			console.log(els);
			for(int k=0; k<els.length; k++){
				var inputs = els[k].getElementsByTagName("INPUT");
				for(int j=0; j<inputs.length; j++){
					if(inputs[j].checked){
						id_json.ans[i] = inputs[j].value;
					}
				}
			}
		}
	}
	console.log(id_json);
}

function add_submit(doc, id_json){
	var doc = doc.getElementById("test");
	var submit_button = document.createElement("DIV");
	submit_button.innerHTML = "<button onclick='collect_response("+id_json+")'>Submit</button>";
	doc.appendChild(submit_button);
}

function generate_html(data){
	//data = JSON.parse(data);
	var external = window.open("", "external", "width=500, height=600");
	external.document.write("<head><link rel='stylesheet' href='../public_html/css/style1.css'></head><div id='test'></div>");
	var doc = external.document.getElementById("test");
	//var form = doc.getElementsByTagName("FORM")[0];
	doc.innerHTML = "<h3>"+data.title+"</h3>";
	//doc.appendChild(form);
	data.questions = JSON.parse(data.questions);
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
	var id_json = {};
	id_json.camp = data.camp_id;
	id_json.survey = data.survey_id;
	id_json.responder = data.responder_id;
	id_json.type = data.type;
	add_submit(doc, id_json);

}
