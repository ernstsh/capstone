function add_text_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.innerHTML="Provide your text entry question <input type='text' name='q1' value='Enter Question Here'></input>";
	node.appendChild(question);
}

/*function add_answer(id) {
	var node = document.getElementById(id);
	var ans = document.createElement("INPUT");
	ans.type = "text";
	ans.name = "a";
	ans.value = "Enter answer here";
	node.appendChild(ans);	
}*/

function add_multi_question(){
	var node = document.getElementById("sandbox");
	var question = document.createElement("DIV");
	question.style.border-style="solid";
	question.innerHTML="<button onclick='add_answer('q1')'>Add Answer</button><br><input type='text' name='q1' value='Enter Question Here'></input><br><input type='text' name='a1' value='Enter answer here'></input>";
	node.appendChild(question); 	
}

function choose_question_type(value){
	if(value === "text"){
		add_text_question();	
	}
	else if(value === "multi"){
		add_multi_question();	
	}
	else{
			
	}
}
