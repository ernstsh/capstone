function uuid(prefix){
	var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var id = prefix;
	for(var i = 0; i<15; i++){
		id+=options[Math.floor((Math.random()*62)+1)];
	}
	return id;
}
function pop_camps(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[1];
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "pop_camp.php", false);
	xmlhttp.send();
}

function load_surveys(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[0];
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "get_surveys.php", false);
	xmlhttp.send();
	
}

function load_fuqs(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[3];
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "get_freq_q.php", false);
	xmlhttp.send();
}

function load() {
	load_surveys();
	pop_camps();
	load_fuqs();
	
}

function remove_question(id) {
	var node = document.getElementById(id);
	node.parentNode.removeChild(node);
}
function add_text_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = uuid("QT_"); //fix
	question.name = uuid("QT_");
	question.className = "question";
	question.style ="border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML="Provide your text entry question <input type='text' placeholder='Enter Question Here'></input><button class='delete' onclick='remove_question(\""+question.id+"\")'>X</button><input class='fuq' type='checkbox'>Frequent Question</input>";
	node.appendChild(question);
}

function freq_text_question(info){
	console.log(info);
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = info.Q_id; //fix
	question.name = info.Q_id;
	question.className = "question";
	question.style ="border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML="Provide your text entry question <input type='text' value='"+info.Q_text+"'></input><button class='delete' onclick='remove_question(\""+question.id+"\")'>X</button><input class='fuq' type='checkbox'>Frequent Question</input>";
	node.appendChild(question);
}

function add_answer(id) {
	var node = document.getElementById(id);
	var ans = document.createElement("INPUT");
	ans.type = "text";
	ans.name = "atext";
	ans.placeholder = "Enter answer here";
	node.appendChild(ans);	
}

function add_question(id) {
	var node = document.getElementById(id);
	var ans = document.createElement("INPUT");
	ans.type = "text";
	ans.name = "qtext";
	ans.placeholder = "Enter question here";
	node.appendChild(ans);	
}

function add_multi_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = uuid("QMC_"); //fix
	question.name = uuid("QMC_");
	question.className = "question";
	question.style ="border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML="<button onclick='add_answer(\""+question.id+"\")'>Add Answer</button><br>Question<input type='text' name='qtext' placeholder='Enter Question Here'></input><input class='fuq' type='checkbox'>Frequent Question</input><br><input type='text' name='atext' placeholder='Enter answer here'></input><button class='delete' onclick='remove_question(\""+question.id+"\")'>X</button>";
	node.appendChild(question); 	
}

function freq_multi_question(info){
	console.log("In freq_multi");
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.id = info.Q_id; //fix
	question.name = info.Q_id;
	question.className = "question";
	question.style ="border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML="<button onclick='add_answer(\""+question.id+"\")'>Add Answer</button><br>Question<input type='text' name='qtext' value='"+info.Q_text+"'></input><input class='fuq' type='checkbox'>Frequent Question</input><br>";
	for(var i=0; i<info.ans.length; i++){
		question.innerHTML += "<input type='text' name='atext' value='"+info.ans[i]+"'></input><br>";
	}
	question.innerHTML += "<button id='delete' onclick='remove_question(\""+question.id+"\")'>X</button>";
	node.appendChild(question); 	
}

function freq_matrix_question(info) {
	console.log("In the freq_matrix");
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	var id = info.Q_id;
	question.id = id;
	question.name = id;
	question.className = "question";
	question.style = "border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML = "Select a scale<select><option value='agree'>Agree - Disagree</option><option value='not-deal'>Not at All - Great Deal</option></select><br>What is the topic of the matrix?<input type='text' name='topic' value='"+info.Q_text+"'><input class='fuq' type='checkbox'>Frequent Question</input><br>";
	for(var i=0; i<info.questions.length; i++){
		question.innerHTML += "<input type='text' name='qtext' value='"+info.questions[i]+"'></input><br>";
	}
	question.innerHTML += "<button onclick='add_question(\""+question.id+"\")'>Add Question</button><button class='delete' onclick='remove_question(\""+question.id+"\")'>X</button>";
	node.appendChild(question);
	
}

function add_matrix_question() {
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	var id = uuid("QM_");
	question.id = id;
	question.name = id;
	question.className = "question";
	question.style = "border-bottom: solid; padding-bottom: 10px;";
	question.innerHTML = "Select a scale<select><option value='agree'>Agree - Disagree</option><option value='not-deal'>Not at All - Great Deal</option></select><br>What is the topic of the matrix?<input type='text' name='topic' placeholder='Enter the topic text'><input class='fuq' type='checkbox'>Frequent Question</input><br><button onclick='add_question(\""+question.id+"\")'>Add Question</button><input type='text' name='qtext' placeholder='Enter question here'><button class='delete' onclick='remove_question(\""+question.id+"\")'>X</button>";
	node.appendChild(question);
	
}

function choose_question_type(value){
	if(value === "text"){
		add_text_question();	
	}
	else if(value === "multi"){
		add_multi_question();	
	}
	
	else if(value === "matrix"){
		add_matrix_question();	
	}
	else{}
}

function load_survey(value){
	str = "x=" + encodeURIComponent(value);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "load_survey.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				//alert(xmlhttp.responseText);
				var res = JSON.parse(xmlhttp.responseText);
				console.log(JSON.stringify(res));
				var el = document.getElementById("sandbox");
				while(el.firstChild){
					el.removeChild(el.firstChild);
				}
				document.forms["create_survey"]["surveyTitle"].value = res.title;
				document.forms["create_survey"]["surveyType"].value = res.type;
				var questions = JSON.parse(res.questions);
				console.log(questions.length);
				for(var i=0; i<questions.length; i++){
					if(questions[i].type === "text"){
						freq_text_question(questions[i]);	
					}
					else if(questions[i].type === "multic"){
						freq_multi_question(questions[i]);	
					}
					else if(questions[i].type === "matrix"){
						freq_matrix_question(questions[i]);	
					}
				}
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);	
}

function choose_freq_q(value){
	str = "x=" + encodeURIComponent(value);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "choose_freq_q.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var res = JSON.parse(xmlhttp.responseText);
				if(res.type === "text"){
					freq_text_question(res);	
				}
				else if(res.type === "multic"){
					freq_multi_question(res);	
				}
				else if(res.type === "matrix"){
					freq_matrix_question(res);	
				}	
			}	
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}

function add_fuqs(questions_array){
	str = JSON.stringify(questions_array);
	str = "x=" + encodeURIComponent(str);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "add_freq_use_q.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
			}	
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
	
}

function create_survey_json(){
	var title = document.forms["create_survey"]["surveyTitle"].value;
	var camp = document.getElementsByTagName("SELECT")[0].value;
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
			question.Q_text = input_elements[0].value;
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
	question.innerHTML = "<br><label>"+question_data.Q_text+"</label><br>";
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

function save() {
	var res = create_survey_json();
	console.log(res.fuqs);
	add_fuqs(res.fuqs);
	var json = res.survey;
	var str = JSON.stringify(json);
	console.log(str);
	str = "x=" + encodeURIComponent(str);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "save_db.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
			}	
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}
