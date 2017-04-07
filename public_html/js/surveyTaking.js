
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
				location.href = "active_survey.php";
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
	//var form = doc.getElementById("test");
	var question = document.createElement("DIV");
	question.id = question_data.Q_id;
	question.className = "question";
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label><br><input type='text' placeholder='Put your answer here'></input>";
	doc.appendChild(question);
}

function generate_multi_question(question_data, doc){
	//var form = doc.getElementsById("test");
	var question = document.createElement("DIV");
	question.id = question_data.Q_id;
	question.className = "question";
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label>";
	for(var i=0; i<question_data.ans.length; i++){
		question.innerHTML += "<br><input type='radio' value="+question_data.ans[i]+">"+question_data.ans[i]+"";
	}
	doc.appendChild(question);
}

function generate_matrix_question(question_data, doc){
	//var form = doc.getElementsById("test");
	var question = document.createElement("DIV");
	question.id = question_data.Q_id;
	question.className = "question";
	question.innerHTML = "<br><label>"+question_data.Q_topic+"</label><br>";
	if(question_data.Q_scale === "agree"){
		var string = "";
		for(var i=0; i<question_data.questions.length; i++){
			string += "<tr id='matrix_q'><td>"+question_data.questions[i]+"</td><td><input type='radio' value='SD'></td><td><input type='radio' value='D'></td><td><input type='radio' value='A'></td><td><input type='radio' value='SA'></td></tr><br>";
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
	doc.appendChild(question);
	
}

function send_response(id_json){
	id_json = JSON.stringify(id_json);
	console.log(id_json);
	var str = "x=" + encodeURIComponent(id_json);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "insert_response.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				//var doc = document.getElementsByTagName("SELECT")[1];
				console.log(xmlhttp.responseText);
				//location.href="preview.php";
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}

function collect_response(id_json){
	id_json.ans = [];
	var doc = document.getElementById("test");
	var qs = doc.getElementsByClassName("question");
	for(var i = 0; i<qs.length; i++){
		var answer = {};
		console.log(i);
		if(qs[i].id.substring(0,2) === "QT"){
			answer.type = "text";
			answer.Q_id = qs[i].id;
			//id_json.ans.push(qs[i].getElementsByTagName("INPUT")[0].value);
			answer.ans = qs[i].getElementsByTagName("INPUT")[0].value;
		}
		else if(qs[i].id.substring(0,3) === "QMC"){
			answer.type = "multic";
			answer.Q_id = qs[i].id;
			var els = qs[i].getElementsByTagName("INPUT");
			for(var k=0; k<els.length; k++){
				if(els[k].checked){
					//id_json.ans.push(els[k].value);
					answer.ans = els[k].value;
				}
			}
		}
		else if(qs[i].id.substring(0,2) === "QM"){
			answer.type = "matrix";
			answer.Q_id = qs[i].id;
			answer.ans = [];
			var els = qs[i].getElementsByTagName("tr");
			for(var k=0; k<els.length; k++){
				var inputs = els[k].getElementsByTagName("INPUT");
				for(var j=0; j<inputs.length; j++){
					if(inputs[j].checked){
						//id_json.ans.push(inputs[j].value);
						answer.ans.push(inputs[j].value);
					}
				}
			}
		}
		id_json.ans.push(answer);
	}
	console.log(id_json);
	send_response(id_json);
	/*id_json = JSON.stringify(id_json);
	str = "x=" + encodeURIComponent(id_json);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "insert_response.php", false);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				//var doc = document.getElementsByTagName("SELECT")[1];
				console.log(xmlhttp.responseText);
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);*/
	
}

function add_submit(doc, id_json){
	//var doc = doc.getElementById("test");
	var submit_button = document.createElement("DIV");
	submit_button.innerHTML = "<button onclick='collect_response("+JSON.stringify(id_json)+");'>Submit</button>";
	doc.appendChild(submit_button);
}

function generate_html(data){
	//data = JSON.parse(data);
	//var external = window.open("", "external", "width=500, height=600");
	//document.write("<head><link rel='stylesheet' href='../public_html/css/style1.css'></head><body><div id='test'></div></body>");
	var doc = document.getElementById("test");
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
