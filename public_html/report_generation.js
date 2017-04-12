//For keeping track of the # of query templates and for ID purposes 
var count = 0;

//For keeping track of # of query result templates and ID purposes
var count2 = 0; 

//To keep track the ID of a saved report and to save edits of the current report 
var SavedReportID; 

//Deletes all query children of the parent 
function DeleteAllQueries(){
        //document.getElementById("dummy").innerHTML = "Deleting all";
        
        //Gets the ID of the parent that contains all of the children 
        Element = document.getElementById("query");
        //Loop for deleting all of the query children 
        while (count > 0) {
                //Removes last child that was recently created 
                Element.removeChild(Element.lastChild);
                //Decrements the number of children 
                count--;
        }
        //Testing purposes for displaying the number of children that are on the page 
        //document.getElementById("dummy").innerHTML = count;
}


function AddQuery()
{
//Regular query
        if(document.getElementById("Regular").checked)
        {               
                count++;
                
                //Output to check if correct 
                var id = 'Reg' + count; 
                //document.getElementById("dummy").innerHTML = id;
                
                
        //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'Reg' + count);
           
        //This is for selecting a survey question to query 
                var dropDown1 = document.createElement("select");
                //dropDown1.onClick = function(){dispQuestions();}
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.appendChild(text100);
                dropDown1.appendChild(option100);
                //document.getElementById("dummy").innerHTML = "Testing getting value";
                var e = document.getElementById("select2");
                var choice = e.options[e.selectedIndex].value;
                //document.getElementById("dummy").innerHTML = "testing";
                
                //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
                var request= new XMLHttpRequest();
                request.open("POST", "GetQuestionsDropDown.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");;
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){
                                        //alert(request.responseText);
                                        //document.getElementById("dummy").innerHTML = request.responseText;
                                     
                                        //Get the response json for the array of questions
                                        var recArrQues = request.responseText;
                                        //converts the javascript value to a JSON string
                                        var recArrQues2 = JSON.stringify(recArrQues);
                                        //parses the JSON string to construct the object of the string 
                                        var recArrQues3 = JSON.parse(recArrQues2);
                                        //parses the JSON string to construct the object of the string 
                                        var json = JSON.parse(recArrQues3);
                                        //for iterating through the JSON array of questions 
                                        //document.getElementById("dummy").innerHTML = json.length;
                                        for (var i = 0; i < json.length; i++) {
                                                //Creates each question for the dropdown 
                                                //alert(json[i].Q_id);
                                                
                                                
                                                var QuestionType = json[i].type;
                                                //Checks to see if the question is a matrix 
                                                if(QuestionType == "matrix"){
                                                        /*var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;
                                                    
                                                        //dropDown1.onClick = function(){dispQuestions();}
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        
                                                        var textQues = document.createTextNode(questionText);
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);*/
                                                        
                                                        
                                                        //Gets matrix question and id 
                                                        var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;
                                                        
                                                        //option group element created for matrix question 
                                                        var optionQues = document.createElement("OPTGROUP");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        optionQues.label = questionText;

                                                        //Gets each sub question of the matrix 
                                                        var SubQuestions = json[i].questions;
                                                        var LengthSubQues = SubQuestions.length;
                                                        for(var j =0; j < LengthSubQues; j++){
                                                                var SubText = document.createTextNode(SubQuestions[j]);
                                                                var SubQuestion = document.createElement("option");
                                                                SubQuestion.appendChild(SubText);
                                                                optionQues.appendChild(SubQuestion);
                                                                
                                                                
                                                        }
                                                        dropDown1.appendChild(optionQues);

                                                        //document.getElementById("dummy6").innerHTML = SubQuestions[0];
                                                }
                                                //else it is a text or a multiple choice question 
                                                else{
                                                        
                                                        var questionText = json[i].Q_text;
                                                        var questionID = json[i].Q_id;
                                                        //dropDown1.onClick = function(){dispQuestions();}
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        
                                                        var textQues = document.createTextNode(questionText);
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);
                                                }
                                                                                           
                                        }
                                        
                                                                                                                                                        
                                }	
                        }	
                }        
                         
        //This is for selecting a response for the question that was chosen 
                var dropDown2 = document.createElement("select");
                dropDown2.onclick = function(){dispResponses(id);}   
                var option200 = document.createElement("option");
                var text200 = document.createTextNode("Select Question Response");
                option200.appendChild(text200);
                dropDown2.appendChild(option200);
                   
                
        //This is for deleting the query 
                var button4 = document.createElement("button");      
                button4.onclick = function(){removeElement('query', id);}
                var text4 = document.createTextNode("-");
                button4.appendChild(text4);

        //Adds the drop downs and delete button to the div element for making the new query 
                queryNew.appendChild(dropDown1);
                queryNew.appendChild(dropDown2);
                queryNew.appendChild(button4);
                
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
//Change in response query        
        if(document.getElementById("ChangeResponse").checked && document.getElementById("Both").checked)
        {                                            
                count++;
                
                //Output to check if correct 
                var id = 'ChangeRes' + count; 
                //document.getElementById("dummy").innerHTML = id;
                
        //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'ChangeRes' + count);
           
        //This is for selecting a survey question to query 
                var dropDown1 = document.createElement("select");
                //dropDown1.onClick = function(){dispQuestions();}
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.appendChild(text100);
                dropDown1.appendChild(option100);
                
        //For getting the questions 
                //Gets the surveyID
                var e = document.getElementById("select2");
                var choice = e.options[e.selectedIndex].value;
                //document.getElementById("dummy").innerHTML = "testing";
                
                //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
                var request= new XMLHttpRequest();
                request.open("POST", "GetQuestionsDropDown.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){
                                        //alert(request.responseText);
                                        //document.getElementById("dummy").innerHTML = request.responseText;
                                     
                                        //Get the response json for the array of questions
                                        var recArrQues = request.responseText;
                                        //converts the javascript value to a JSON string
                                        var recArrQues2 = JSON.stringify(recArrQues);
                                        //parses the JSON string to construct the object of the string 
                                        var recArrQues3 = JSON.parse(recArrQues2);
                                        //parses the JSON string to construct the object of the string 
                                        var json = JSON.parse(recArrQues3);
                                        //for iterating through the JSON array of questions 
                                        //document.getElementById("dummy").innerHTML = json.length;
                                        //Iterates through each question JSON 
                                        for (var i = 0; i < json.length; i++) {
                                                //Creates each question for the dropdown 
                                                //alert(json[i].Q_id);
                                                            
                                                //Gets the question type            
                                                var QuestionType = json[i].type;
                                                //Checks to see if the question is a matrix 
                                                if(QuestionType == "matrix"){
                                                        /*var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;                                                       
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        
                                                        var textQues = document.createTextNode(questionText);
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);*/
                                                        
                                                        //Gets matrix question and id 
                                                        var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;
                                                        
                                                        //option group element created for matrix question 
                                                        var optionQues = document.createElement("OPTGROUP");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        optionQues.label = questionText;

                                                        //Gets each sub question of the matrix 
                                                        var SubQuestions = json[i].questions;
                                                        var LengthSubQues = SubQuestions.length;
                                                        for(var j =0; j < LengthSubQues; j++){
                                                                var SubText = document.createTextNode(SubQuestions[j]);
                                                                var SubQuestion = document.createElement("option");
                                                                SubQuestion.appendChild(SubText);
                                                                optionQues.appendChild(SubQuestion);
                                                                
                                                                
                                                        }
                                                        dropDown1.appendChild(optionQues);
                                                        
                                                        
                                                }
                                                //else it is a text or a multiple choice question 
                                                else{
                                                        
                                                        var questionText = json[i].Q_text;
                                                        var questionID = json[i].Q_id;                                                        
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                      
                                                        var textQues = document.createTextNode(questionText);
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);
                                                }
                                                                                           
                                        }
                                        
                                                                                                                                                        
                                }	
                        }	
                }
                                           
                
        //This is for creating the dropdown for change in response from 
                var dropDown2 = document.createElement("select");
                dropDown2.onclick = function(){dispResponses(id);}   
                var option200 = document.createElement("option");
                var text200 = document.createTextNode("Response changed from");
                option200.appendChild(text200);
                dropDown2.appendChild(option200);
                
        //This is for creating the dropdown for response changed to
                var dropDown3 = document.createElement("select");
                dropDown3.onclick = function(){DisplayResponses2(id);}   
                var option3 = document.createElement("option");
                var text3 = document.createTextNode("Response changed from");
                option3.appendChild(text3);
                dropDown3.appendChild(option3);
                        
              
        
        //This is for deleting the query 
                var button4 = document.createElement("button");      
                button4.onclick = function(){removeElement('query', id);}
                var text4 = document.createTextNode("-");
                button4.appendChild(text4);

        //Adds the drop downs and delete button to the div element for making the new query 
                queryNew.appendChild(dropDown1);
                queryNew.appendChild(dropDown2);
                queryNew.appendChild(dropDown3);
                queryNew.appendChild(button4);
                
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
}


//Code for creating the query JSON for returning the query results 
function QueryJSON(){

        //JSON for storing the query information entered by the user 
        var queryJSON = {};
  
        var SurveyDropDown = document.getElementById("select2");   
        //Gets the survey ID 
        var SurveyID = SurveyDropDown.options[SurveyDropDown.selectedIndex].value;
        //Gets the survey title 
        var SurveyName = SurveyDropDown.options[SurveyDropDown.selectedIndex].text;
        //document.getElementById("dummy").innerHTML = SurveyID;
        queryJSON.SurveyName = SurveyName;
        queryJSON.SurveyID = SurveyID;
  
        //Gets the survey type selected 
        var SurveyTypeSelected;
        var SurveyTypes = document.getElementById("SurveyType");
        //Loops through the radio buttons to find the selected survey type 
        for(var i = 0; i < SurveyTypes.length; i++) {
           if(SurveyTypes[i].checked == true) {
               SurveyTypeSelected = SurveyTypes[i].value;
           }
        }     
        queryJSON.SurveyType = SurveyTypeSelected;
        
        //Gets the return type which is count or percentage
        if (document.getElementById('Count').checked) {
                queryJSON.ReturnType = document.getElementById('Count').value;
        }
        if (document.getElementById('Percent').checked) {
                queryJSON.ReturnType = document.getElementById('Percent').value;
        }
        
        
        
        //Gets the gender that was selected
        queryJSON.Gender = document.getElementById("Gender").value;
        
        //Gets the grade level chosen
        queryJSON.StudentGradeLvl = document.getElementById("SelectGrade").value;
        
        //Gets the parent's highest level of education
        queryJSON.ParentEducation = document.getElementById("SelectEducation").value;
        
        //Gets the race that was selected
        queryJSON.Race = document.getElementById("SelectRace").value;
        
        //Gets the ethnicity that was selected
        queryJSON.Ethnicity = document.getElementById("SelectEthinicity").value;
        
        //Gets the free reduced lunch option that was selected
        queryJSON.LunchOption = document.getElementById("SelectLunchType").value;
        
        //JSON array for storing the query template options that were produced 
        queryJSON.queries = [];
        
        //Gets the query parent div that contains the query templates 
        Parent = document.getElementById("query");   
        //iterates each query template 
        for(var x = 1; x < Parent.childNodes.length; x=x+1){
                //Beginning string ID of regular query temp
                var RegularTemp = "Reg";
                //Beginning string ID of change response temp
                var ChangeResponse = "ChangeRes";

                //Creates a query template JSON
                var queryTempJSON = {};
                //Gets the query template 
                childID = Parent.childNodes[x].id;
                
                                             
                var parentTemplate = document.getElementById(childID);                
                //Gets the first drop down menu of the query template 
                var child = parentTemplate.getElementsByTagName("select")[0];
                //Gets the choice selected from the first drop down 
                var choice1 = child.options[child.selectedIndex].text;
                queryTempJSON.Drop1 = choice1;  
                
                //Gets the ID of the question
                queryTempJSON.ID = child.options[child.selectedIndex].value;
                        
                //Gets the second drop down menu of the query template
                var child2 = parentTemplate.getElementsByTagName("select")[1];
                //Gets the choice selected from the second drop down menu
                var choice2 = child2.options[child2.selectedIndex].value;
                queryTempJSON.Drop2 = choice2;
                        
                //alert(choice1);
                //alert(choice2);
                        
                //Checks to see if its a change response template to get the third drop down selected value 
                if(childID.includes(ChangeResponse)){
                        //Gets the third drop down menu of the change response query template
                        var child3 = parentTemplate.getElementsByTagName("select")[2];
                        //Gets the choice selected from the third drop down menu
                        var choice3 = child3.options[child3.selectedIndex].value;
                        queryTempJSON.Drop3 = choice3;
                                
                        //alert(choice3);
                }
                        
                //Adds the query template JSON to the JSON that contains all of the query information
                var ArrayPos = x - 1;
                queryJSON.queries[ArrayPos] = queryTempJSON;
                            
        }
        
        //outputs the JSON to the webpage for testing purposes
        //document.getElementById("reportJSON").innerHTML = JSON.stringify(queryJSON);
        
        //Converts the query JSON into a string
        var str_JSON = JSON.stringify(queryJSON);
        //Sends the query JSON to PHP to return the query results
        var request= new XMLHttpRequest()
        request.open("POST", "ReportQuerying.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(str_JSON)
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
				//alert(request.responseText);	
                                //document.getElementById("dummy").innerHTML = request.responseText;
                                
                                //Gets the Query JSON containing the survey and responses 
                                var QueryJSON = JSON.parse(request.responseText);
                                
                                //Gets the survey
                                var Survey = QueryJSON.Survey;
                                //document.getElementById("dummy").innerHTML = Survey;
                                                     
                                //Gets the student responses
                                var StudentResponses = QueryJSON.StudentResponses;
                                // document.getElementById("currentChoice").innerHTML = JSON.stringify(StudentResponses);  

                                
                                
        //Querying Result starts here
                                //Gets the query template objects
                                var ArrayQueries = JSON.stringify(queryJSON.queries);
                                //document.getElementById("reportJSON").innerHTML = ArrayQueries;
                                ArrayQueries = JSON.parse(ArrayQueries);
                                //document.getElementById("reportJSON").innerHTML = ArrayQueries;
                                
                                //Keeps track of the # of students that the query temps applied to 
                                var TotCount = 0;
                                
                                //Loops through the query templates 
                                var LengthQueries = ArrayQueries.length;
                                //document.getElementById("dummy").innerHTML = LengthQueries; 
                                for(var x = 0; x < LengthQueries; x++){
                                        
                                        //Gets the ID of the query temp question 
                                        var QueryID = ArrayQueries[x].ID;
                                        //alert(QueryID);
                                        
                                        //Gets the value of the query temp
                                        var Drop2Val = ArrayQueries[x].Drop2;
                                        //alert(Drop2Val);
                                        
                                        
                                        
                                        //Determines if there are more than one query temps with the same question
                                        //Returns an array containing all of the values 
                                        var ArrayVals = OccurenceQuestion(QueryID, ArrayQueries, LengthQueries);
                                        document.getElementById("dummy6").innerHTML = ArrayVals;
                                          


                                          
                                        //Loops through students 
                                        var LengthStudResponse = StudentResponses.length;
                                        //document.getElementById("dummy").innerHTML = LengthStudResponse;
                                        //document.getElementById("dummy").innerHTML = LengthStudResponse;                                       
                                        for(var x = 0; x < LengthStudResponse; x++){
                                                //Gets the student's survey
                                                var SurveyJSON = StudentResponses[x];
                                                //document.getElementById("dummy2").innerHTML = SurveyJSON;
                                                //alert(SurveyJSON);
                                                
                                                //Gets the array that contains object responses  
                                                var SurveyAnswers = JSON.parse(SurveyJSON);
                                                SurveyAnswers = SurveyAnswers.ans;
                                                //document.getElementById("dummy3").innerHTML = JSON.stringify(SurveyAnswers);

                                                //# of question responded the same as the query temp 
                                                var CountCorrect = 0;
                                                
                                                //Loops through each response object 
                                                var LengthSurveyQues = SurveyAnswers.length;
                                                //document.getElementById("dummy4").innerHTML = LengthSurveyQues;                                                                                                                                              
                                                for(var y = 0; y < LengthSurveyQues; y++){
                                                     
                                                        
                                                        //Gets the response question obj                                                       
                                                        var ResponseObj = JSON.stringify(SurveyAnswers[y]);
                                                        ResponseObj = JSON.parse(ResponseObj);
                                                        //document.getElementById("dummy").innerHTML = JSON.stringify(ResponseObj);
                                                        
                                                        //Gets the ID of the obj
                                                        var ObjID = ResponseObj.Q_id;
                                                        ObjID = JSON.stringify(ObjID);
                                                        //document.getElementById("dummy2").innerHTML = JSON.stringify(ObjID);
                                                        ObjID = JSON.parse(ObjID);
                                                        //document.getElementById("dummy2").innerHTML = ObjID;
                                                        
                                                        //Gets the Q_type of the obj 
                                                        var ObjType = ResponseObj.type;
                                                        ObjType = JSON.stringify(ObjType);
                                                        //document.getElementById("dummy3").innerHTML = ObjType;
                                                        ObjType = JSON.parse(ObjType);
                                                       
                                                        //document.getElementById("dummy3").innerHTML = ObjType;
                                                        
                                                        if(ObjType == 'multic' || ObjType == 'text'){
                                                                //document.getElementById("dummy3").innerHTML = "We got a non matrix";
                                                                //Gets the answer of the multiple choice or a text question
                                                                var ObjAnswer = ResponseObj.ans;
                                                                ObjAnswer = JSON.stringify(ObjAnswer);
                                                                ObjAnswer = JSON.parse(ObjAnswer);
                                                                //document.getElementById("dummy3").innerHTML = ObjAnswer;
                                                                
                                                                
                                                                //document.getElementById("dummy").innerHTML = QueryID;
                                                                //document.getElementById("dummy2").innerHTML = ObjID;
                                                                //document.getElementById("dummy3").innerHTML = Drop2Val;
                                                                //document.getElementById("dummy4").innerHTML = ObjAnswer;
                                                                
                                                                //if query temp question is equal to student question responded....
                                                                /*if(QueryID == ObjID &&  Drop2Val == ObjAnswer ){                                                                 
                                                                        CountCorrect++;
                                                                }*/
                                                                
                                                                
                                                                if(QueryID == ObjID){
                                                                       
                                                                        if(ArrayVals.includes(ObjAnswer)){
                                                                                CountCorrect++;
                                                                        }
                                                                        if(ArrayVals.length > 1){
                                                                                CountCorrect = CountCorrect + (ArrayVals.length - 1);
                                                                        }
                                                                }
                                                                
                                                        }
                                                        else{
                                                                //Gets the ans which is either answer(s) of the obj 
                                                                //var QuestionAnswer = JSON.stringify(SurveyAnswers[0].ans);
                                                                //QuestionAnswer = JSON.parse(QuestionAnswer);
                                                                //document.getElementById("dummy3").innerHTML = QuestionAnswer[0];

                                                        }

                                                }
                                                //alert(CountCorrect);
                                                //Check to see if the all the query temps applied to the student 
                                                if(CountCorrect == LengthQueries){
                                                        TotCount++;
                                                }
                                        }

                                }
                                //Output the answer to a query result
                                AddQueryResult(TotCount, queryJSON.ReturnType, LengthStudResponse);
                                //document.getElementById("dummy5").innerHTML = TotCount;
                                
                             
			}	
		}	
	}      
}

//Returns the occurrence of a question incase there are multiple query temps of the same question
function OccurenceQuestion(QueryID, ArrayQueries, LengthQueries){
        //Loops through the query templates 
        //document.getElementById("dummy").innerHTML = LengthQueries;
        //document.getElementById("dummy6").innerHTML = "Entered occurrence";
        //Array for storing the vals for repeated question query temps 
        var ArrayVals = [];
       // var count = 0;
        for(var x = 0; x < LengthQueries; x++){                                        
                //Gets the ID of the query temp question 
                var QueryID2 = ArrayQueries[x].ID;                 
                //Gets the value of the query temp
                var Drop2Val = ArrayQueries[x].Drop2;  
                //If the IDs are the same..
                if(QueryID == QueryID2){
                        //Store the value of the response to the array 
                        alert("We got an occurence!!!");
                        //ArrayVals[count];
                        //count++;
                        ArrayVals.push(Drop2Val);
                }
        }
        return ArrayVals;
}

//Creates a queryResult template 
function AddQueryResult(TotCount, ReturnType, NumStuds){                  
        count2++;
                
        //Output to check if correct 
        var id = count2; 
                 
        //Creates a div for creating a new query 
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", count2);
        
        //Creates a text box for the result of the query
        var label = document.createElement("input");
        label.setAttribute("id", 'label' + count2)

        //To make label input textbox longer and to make the font larger 
        label.style.width="640px";
        label.style.fontSize="12pt";
        label.style.fontFamily="Times New Roman";
        //Restricts the number of characters for the label to 95
        label.setAttribute("maxLength", '95');      
        //shifts the label to the left for aligning purposes
        label.style.marginLeft="22px"
        
        //Creates a break tag
        var break1 = document.createElement("br");
        
        //Creates a text box for the query result 
        var input = document.createElement("input");
        input.setAttribute("id", 'input' + count2);
        //To make input textbox longer with larger font 
        input.style.width="640px";
        input.style.fontSize="12pt";
        input.style.fontFamily="Times New Roman";
        //restricts the number of characters for the input result to 95
        input.setAttribute("maxLength", '95');
        
        //Inserts the result into the text box
        //document.getElementById('input' + count2).innerHTML = TotCount;   
        //Return type is a count 
        if(ReturnType == "Count"){
                input.value = TotCount; 
        }
        //Return type is a percent 
        else{
                input.value = (TotCount / NumStuds)  * 100; 
        }
        //input.value  = TotCount;
        
        //Creates a break tag
        var break2 = document.createElement("br");
        
        //This is for deleting the query 
        var button1 = document.createElement("button");      
        button1.onclick = function(){removeElement('QueryResult', id);}
        var textDelete = document.createTextNode("-");
        button1.appendChild(textDelete);

        //Adds the drop downs and delete button to the div element for making the new query 
        queryResultNew.appendChild(label);
        queryResultNew.appendChild(button1);
        queryResultNew.appendChild(break1);
        queryResultNew.appendChild(input);
        queryResultNew.appendChild(break2);
        
        
        element = document.getElementById("QueryResult");
        element.appendChild(queryResultNew);
        
        //document.getElementById("reportJSON").innerHTML = document.getElementById('label' + count2).id;
}


//functions for removing a query template when its delete button is clicked 
//It also deletes query results when their delete button  is clicked 
function removeElement(parentDiv, childDiv){
        //document.getElementById("dummy").innerHTML = "deleting query or a result";
        if(parentDiv!="QueryResult"){
             if (childDiv == parentDiv) 
             {
                  alert("The parent div cannot be removed.");
             }
             //deletes the query template child 
             else if (document.getElementById(childDiv)) 
             {     
                  //Gets the parent and child using their IDs 
                  var child = document.getElementById(childDiv);
                  var parent = document.getElementById(parentDiv);
                  //Parent removes the child 
                  parent.removeChild(child);
                  //decrement count for keeping track the # of children 
                  count--;
                  //For displaying the number of children that remain 
                  document.getElementById("dummy").innerHTML = count;
             }
             else 
             {
                  alert("Child div has already been removed or does not exist.");
                  return false;
             }
        }
        //For deleting the query result that was selected 
        else{
           //deletes the query template child 
             if (document.getElementById(childDiv)) 
             {     
                  //Gets the parent and child using their IDs 
                  var child = document.getElementById(childDiv);
                  var parent = document.getElementById(parentDiv);
                  //Parent removes the child 
                  parent.removeChild(child);
                  //decrement count for keeping track the # of children 
                  count2--;
                  document.getElementById("dummy").innerHTML = "Deleting Query Result";
             }        
        }
}



function Report_JSON(){
        //Create a json for the report 
	var report_json = {};          
        
        //Sets the report ID of the report JSON
        report_json.ReportID = SavedReportID;
        
        //Sets the title of the report JSON
        report_json.title = document.getElementById("TitleReport").value; 
        
        //Create an array JSON for all the query results 
	report_json.queryResults = [];
        
        //Stores all of the query label and results into the array 
        var x = 0;
        //Iterates all of the query results 
        while(x != count2) {
            x++;
            //Creates a JSON for a query result 
            var query_json = {};
            //Gets the query label and query result 
            var label = document.getElementById('label' + x).value;
            var query = document.getElementById('input' + x).value;
            query_json.label = label;
            query_json.query = query;
            report_json.queryResults[x-1] = query_json;
        }
        //document.getElementById("reportJSON").innerHTML = JSON.stringify(report_json);
        var str_json = JSON.stringify(report_json);
        //document.getElementById("reportJSON").innerHTML = str_json;
        
        var request= new XMLHttpRequest()
        request.open("POST", "SaveReport.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(str_json)
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
				//alert(request.responseText);
                                //document.getElementById("dummy").innerHTML = request.responseText;
                                SavedReportID = request.responseText;
			}	
		}	
	}
        
}

//For deleting change in response queries if the user chose Post or Pre for the survey type to query 
function RemoveChangeResponse(){
        //Gets all of the child div tags   
        var childDivs = document.getElementById('query').getElementsByTagName('div');
        //Gets the number of children div tags 
        var NumDelete = childDivs.length;
        
        var tot = 0;
        //loop is for deleting only the change in response query templates 
        while(tot != NumDelete){
                //gets the child div tag 
                var childDiv = childDivs[tot];
                var ID = childDiv.id;
                //if the child is a change in respons child delete it  
                if(ID.includes("ChangeRes")==true){
                        removeElement("query", ID);    
                }
                //else the child is a regular query delete 
                else{
                        tot++;
                }
                //updates the number of children div tags that remain 
                NumDelete = childDivs.length;   
        }       
}


//Function for displaying the responses for the change in response template 
function DisplayResponses2(id){
        //Gets the parent template 
        parentTemplate = document.getElementById(id);
        //document.getElementById("dummy").innerHTML = "Hello" + parentTemplate.getAttribute("id");
        //Get the drop dop element that displays the questions 
        child = parentTemplate.getElementsByTagName("select")[0];
        //Gets the drop down element that displays the responses
        child2 = parentTemplate.getElementsByTagName("select")[2];
        NumChildren = child2.length;
        //document.getElementById("dummy").innerHTML = NumChildren;
        for(var x = 0; x < NumChildren-1; x++){
                child2.removeChild(child2.lastChild); 
        }
        
        //NumChildResponse = child2.children().length;
        //document.getElementById("dummy").innerHTML = NumChildResponse;
                                
        //Gets the question that was selected 
        var choiceQues = child.options[child.selectedIndex].value;
        //document.getElementById("dummy").innerHTML = choiceQues;
            
        //Gets the surveyID 
        var e = document.getElementById("select2");
        var choice = e.options[e.selectedIndex].value;
        document.getElementById("dummy").innerHTML = choice;
//        
//        //Gets the selected camp from 1st drop down
//        var  e2 = document.getElementById("select1");
//        var choice2 = e2.options[e2.selectedIndex].value;
//               
        //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
        var request= new XMLHttpRequest();
        request.open("POST", "GetQuestionsDropDown.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(choice);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){
                                        //alert(request.responseText);
                                        //document.getElementById("dummy").innerHTML = request.responseText;
                                        
                                        //Get the response json for the array of questions
                                        var recArrQues = request.responseText;
                                        //converts the javascript value to a JSON string
                                        var recArrQues2 = JSON.stringify(recArrQues);
                                        //parses the JSON string to construct the object of the string 
                                        var recArrQues3 = JSON.parse(recArrQues2);
                                        //parses the JSON string to construct the object of the string 
                                        var json = JSON.parse(recArrQues3);
                                        
                                        //Loop iterates through the JSON questions                                                                          
                                        for (var i = 0; i < json.length; i++) {
                                                //If we found the selected question 
                                                if(choiceQues == json[i].Q_id){
                                                        //Gets the type of the question 
                                                        var QuestionType = json[i].type;
                                                        //The question type is text 
                                                        if(QuestionType == "text"){
                                                                //fill drop down with responses made by students 
                                                                //alert("text question fill drop down with student responses");
                                                                                                                               
                                                        }
                                                        //The question is multiple choice 
                                                        else if(QuestionType == "multic"){
                                                                //Fill the drop down with the multiple choice options 
                                                                for(var j = 0; j < json[i].ans.length; j++){
                                                                        //alert(json[i].answer[j]);
                                                                        var optionQues = document.createElement("option");
                                                                        //optionQues.setAttribute("id", questionID);
                                                                        var textQues = document.createTextNode(json[i].ans[j]);
                                                                        optionQues.appendChild(textQues);
                                                                        child2.appendChild(optionQues); 
                                                                }  
                                                        }
                                                        //The question is a matrix 
                                                        else{
                                                                //Do nothing for now until we fix the issue
                                                                //alert("matrix can't do anything for now");
                                                        }
                                                }                                                                                                                                                                                         
                                        }
                                                                  
                                                                                                                                                        
                                }	
                        }	
                }               
}





//Function for displaying the responses for a regular query template 
function dispResponses(id){
        //Gets the parent template 
        parentTemplate = document.getElementById(id);
        //document.getElementById("dummy").innerHTML = "Hello" + parentTemplate.getAttribute("id");
        //Get the drop dop element that displays the questions 
        child = parentTemplate.getElementsByTagName("select")[0];
        //Gets the drop down element that displays the responses
        child2 = parentTemplate.getElementsByTagName("select")[1];
        NumChildren = child2.length;
        for(var x = 0; x < (NumChildren - 1); x++){
                child2.removeChild(child2.lastChild); 
        }
        
        // NumChildResponse = child2.children().length;
        //document.getElementById("dummy").innerHTML = NumChildResponse;
                                
        //Gets the question that was selected 
        var choiceQues = child.options[child.selectedIndex].value;
        document.getElementById("dummy").innerHTML = choiceQues;
            
        //Gets the surveyID 
        var e = document.getElementById("select2");
        var choice = e.options[e.selectedIndex].value;
        //document.getElementById("dummy").innerHTML = choice;
         
         
        //Gets the selected camp from 1st drop down
        var  e2 = document.getElementById("select1");
        var choice2 = e2.options[e2.selectedIndex].value; 

         
        //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
        var request= new XMLHttpRequest();
        request.open("POST", "GetQuestionsDropDown.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(choice);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){
                                        //alert(request.responseText);
                                        //document.getElementById("dummy").innerHTML = request.responseText;
                                        
                                        //Get the response json for the array of questions
                                        var recArrQues = request.responseText;
                                        //converts the javascript value to a JSON string
                                        var recArrQues2 = JSON.stringify(recArrQues);
                                        //parses the JSON string to construct the object of the string 
                                        var recArrQues3 = JSON.parse(recArrQues2);
                                        //parses the JSON string to construct the object of the string 
                                        var json = JSON.parse(recArrQues3);
                                        
                                        //Loop iterates through the JSON questions                                                                          
                                        for (var i = 0; i < json.length; i++) {
                                                //If we found the selected question 
                                                if(choiceQues == json[i].Q_id){
                                                        //Gets the type of the question 
                                                        var QuestionType = json[i].type;
                                                        //The question type is text 
                                                        if(QuestionType == "text"){
                                                                //fill drop down with responses made by students 
                                                                //alert("text question fill drop down with student responses");
                                                                var TextAnswers = TextEntryResponses(choice ,choice2);
                                                                document.getElementById("dummy4").innerHTML = TextAnswers;
                                                                
                                                                
                                                        }
                                                        //The question is multiple choice 
                                                        else if(QuestionType == "multic"){
                                                                //Fill the drop down with the multiple choice options 
                                                                for(var j = 0; j < json[i].ans.length; j++){
                                                                        //alert(json[i].answer[j]);
                                                                        var optionQues = document.createElement("option");
                                                                        //optionQues.setAttribute("id", questionID);
                                                                        var textQues = document.createTextNode(json[i].ans[j]);
                                                                        optionQues.appendChild(textQues);
                                                                        child2.appendChild(optionQues); 
                                                                }  
                                                        }
                                                        //The question is a matrix 
                                                        else{
                                                                //Do nothing for now until we fix the issue
                                                                //alert("matrix can't do anything for now");
                                                        }
                                                }                                                                                                                                                                                         
                                        }
                                                                                                                                                        
                                }	
                        }	
                }               
}

//Returns an array of unique student responses for a text entry question
function TextEntryResponses(SurveyID, CampID){
        
        //Array for storing all of the unique text entry responses
        var TextArray = [];
        
        
        //JSON object for storing the campd and survey IDs 
        var jsonObj = {};
        jsonObj.camp_id = CampID;
        jsonObj.survey_id = SurveyID;
        jsonObj = JSON.stringify(jsonObj);
        var request= new XMLHttpRequest();
        request.open("POST", "GetTextResponses.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(jsonObj);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){
                                //alert(request.responseText);
                                //document.getElementById("dummy2").innerHTML = request.responseText;
                                
                                //Gets the JSON containing the responses 
                                var QueryJSON = JSON.parse(request.responseText);
                                                    
                                //Gets the student responses
                                var StudentResponses = QueryJSON.StudentResponses;
                                document.getElementById("currentChoice").innerHTML = JSON.stringify(StudentResponses);  
                                
                                //Loops through students 
                                var LengthStudResponse = StudentResponses.length;
                                
                                //document.getElementById("dummy6").innerHTML = LengthStudResponse;
                                //document.getElementById("dummy").innerHTML = LengthStudResponse;                                       
                                for(var x = 0; x < LengthStudResponse; x++){
                                        //Gets the student's survey responses 
                                        var SurveyJSON = StudentResponses[x];
                                        //document.getElementById("dummy3").innerHTML = SurveyJSON;                                            
                                        var Survey = JSON.parse(SurveyJSON);
                                        
                                        //Loops through each response object 
                                        var LengthSurveyQues = Survey.length;
                                        //document.getElementById("dummy4").innerHTML = LengthSurveyQues;                                                                                                                                              
                                        for(var y = 0; y < LengthSurveyQues; y++){
                                        
                                                //Gets the response question obj                                                       
                                                var ResponseObj = JSON.stringify(Survey[y]);
                                                ResponseObj = JSON.parse(ResponseObj);
                                                //document.getElementById("dummy").innerHTML = JSON.stringify(ResponseObj);
                                                        
                                                //Gets the ID of the obj
                                                var ObjID = ResponseObj.Q_id;
                                                ObjID = JSON.stringify(ObjID);
                                                //document.getElementById("dummy2").innerHTML = JSON.stringify(ObjID);
                                                ObjID = JSON.parse(ObjID);
                                                //document.getElementById("dummy2").innerHTML = ObjID;
                                                        
                                                //Gets the Q_type of the obj 
                                                var ObjType = ResponseObj.type;
                                                ObjType = JSON.stringify(ObjType);
                                                //document.getElementById("dummy3").innerHTML = ObjType;
                                                ObjType = JSON.parse(ObjType);
                                                
                                                //If its a text question...
                                                if(ObjType == 'text'){
                                                        //document.getElementById("dummy").innerHTML = "Text response!!!";
                                                        //Gets the answer of the text question
                                                        var ObjAnswer = ResponseObj.ans;
                                                        ObjAnswer = JSON.stringify(ObjAnswer);
                                                        ObjAnswer = JSON.parse(ObjAnswer);
                                                        //document.getElementById("dummy2").innerHTML = ObjAnswer;
                                                        TextArray.push(ObjAnswer); 
                                                        document.getElementById("dummy2").innerHTML = TextArray;
                                                        

                                                }
                                                
                                        }
                                }
                        }
                }
        }
        document.getElementById("dummy3").innerHTML = TextArray;
        return TextArray;
}



//Fills the dropdown for selecting a camp for querying a survey
function GetCamps(){
        xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				//var doc = document.getElementsByTagName("SELECT")[0];
                                var doc = document.getElementById("select1");
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "GetCamps.php", false);
	xmlhttp.send();
        
}

//Fills the dropdown for selecting a survey based on camp selection
function GetSurveys(){
        //Gets the selected camp from 1st drop down
        var  e = document.getElementById("select1");
        var choice = e.options[e.selectedIndex].value;
        
        //document.getElementById("dummy").innerHTML = choice;
        
        
        var request= new XMLHttpRequest();
        request.open("POST", "GetSurveys.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(choice);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){ 
                                //alert(request.responseText);
                                var doc = document.getElementById("select2");
				doc.innerHTML = request.responseText;                                             
                        }
                }
        }                                                                                             
}










