//For keeping track of the # of query templates and for ID purposes 
var count = 0;

//For keeping track of # of query result templates and ID purposes
var count2 = 0; 

//To keep track the ID of a saved report and to save edits of the current report 
var SavedReportID; 

//Deletes all query children of the parent 
function DeleteAllQueries(){
        //Gets the ID of the parent that contains all of the children 
        Element = document.getElementById("query");
        //Loop for deleting all of the query children 
        while (count > 0) {
                Element.removeChild(Element.lastChild);
                count--;
        }
}

function AddQuery()
{
//Query temp for a multiple choice question 
        //Gets the survey name 
        var SurveyDropDown = document.getElementById("select2");         
        var SurveyName = SurveyDropDown.options[SurveyDropDown.selectedIndex].text;
        //Create query temp for matrix if type is sected and both surveys is not selected 
        if(document.getElementById("Regular").checked && SurveyName != "Both")
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
                //dropDown1.onchange = function(){dispQuestions();}
                dropDown1.onchange= function(){dispResponses(id);}   
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.style.fontWeight = "bold";
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
                                                var QuestionType = json[i].type;        
                                                //Multiple choice question 
                                                if(QuestionType == 'multic'){
                                                        
                                                        var questionText = json[i].Q_text;
                                                        var questionID = json[i].Q_id;
                                                        //dropDown1.onClick = function(){dispQuestions();}
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                        
                                                        var textQues = document.createTextNode(questionText);
                                                        //optionQues.style.fontWeight = "bold";
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);
                                                }
                                                                                           
                                        }
                                        
                                                                                                                                                        
                                }	
                        }	
                }                                 
        //This is for selecting a response for the question that was chosen 
                var dropDown2 = document.createElement("select");
                //dropDown2.onclick = function(){dispResponses(id);}   
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
//Query template used for text and matrix questions    
        if(document.getElementById("ChangeResponse").checked)
        {                                            
                count++;              
                var id = 'ChangeRes' + count;                 
        //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'ChangeRes' + count);          
        //This is for selecting a survey question to query 
                var dropDown1 = document.createElement("select");
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.style.fontWeight = "bold";
                option100.appendChild(text100);
                dropDown1.appendChild(option100);               
        //For getting the questions 
                //Gets the surveyID
                var e = document.getElementById("select2");
                var choice = e.options[e.selectedIndex].value;                
                //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
                var request= new XMLHttpRequest();
                request.open("POST", "GetQuestionsDropDown.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){
                                        //Get the response json for the array of questions
                                        var recArrQues = request.responseText;
                                        //converts the javascript value to a JSON string
                                        var recArrQues2 = JSON.stringify(recArrQues);
                                        //parses the JSON string to construct the object of the string 
                                        var recArrQues3 = JSON.parse(recArrQues2);
                                        //parses the JSON string to construct the object of the string 
                                        var json = JSON.parse(recArrQues3);
                                        //for iterating through the JSON array of questions 
                                        //Iterates through each question JSON 
                                        for (var i = 0; i < json.length; i++) {                                                         
                                                //Gets the question type            
                                                var QuestionType = json[i].type;
                                                //Checks to see if the question is a matrix 
                                                if(QuestionType == "matrix") {
                                                        var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;                                                        
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                      
                                                        var textQues = document.createTextNode(questionText);
                                                        //optionQues.style.fontWeight = "bold";
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);
                                                }
                                                //else it is a text question 
                                                else if(QuestionType == 'text' && SurveyName != "Both"){
                                                        
                                                        var questionText = json[i].Q_text;
                                                        var questionID = json[i].Q_id;                                                        
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);
                                                        
                                                        optionQues.value = questionID;
                                                      
                                                        var textQues = document.createTextNode(questionText);
                                                        //optionQues.style.fontWeight = "bold";
                                                        optionQues.appendChild(textQues);
                                                        dropDown1.appendChild(optionQues);
                                                }
                                                                                           
                                        }
                                        
                                                                                                                                                        
                                }	
                        }	
                }

        //This is for deleting the query 
                var button4 = document.createElement("button");      
                button4.onclick = function(){removeElement('query', id);}
                var text4 = document.createTextNode("-");
                button4.appendChild(text4);

        //Adds the drop downs and delete button to the div element for making the new query 
                queryNew.appendChild(dropDown1);
                queryNew.appendChild(button4);
                
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
}


//Code for creating the query JSON for returning the query results 
function QueryJSON(){
        //JSON for storing the query information entered by the user 
        var queryJSON = {};
        //Gets the selected camp from 1st drop down
        var CampDrop = document.getElementById("select1");
        var CampID = CampDrop.options[CampDrop.selectedIndex].value; 
        queryJSON.CampID = CampID;
        //Gets the survey name and ID 
        var SurveyDropDown = document.getElementById("select2"); 
        var SurveyName = SurveyDropDown.options[SurveyDropDown.selectedIndex].text;
        queryJSON.SurveyName = SurveyName;
        //Gets the ID of a pre or post survey or both depending on the user's selection 
        var SurveyID;
        var SurveyID2; 
        if(SurveyName == "Both" && SurveyDropDown.length == 3){
                for(var i = 0; i < SurveyDropDown.length; i++){
                        if(i == 0){
                                queryJSON.SurveyID = SurveyDropDown.options[i].value;                            
                        }
                        else if(i == 1){
                                queryJSON.SurveyID2 = SurveyDropDown.options[i].value;
                                
                        }
                }
        }       
        else{
                queryJSON.SurveyID = SurveyDropDown.options[SurveyDropDown.selectedIndex].value;
        }
        //Gets the return type which is count or percentage 
        if (document.getElementById('Count').checked) {
                queryJSON.ReturnType = document.getElementById('Count').value;
        }
        if (document.getElementById('Percent').checked) {
                queryJSON.ReturnType = document.getElementById('Percent').value;
        }
               
        var Checked = false;
        if(document.getElementById('ChangeResponse').checked) {
                Checked = true;
        }               
        
        //Gets the demographic information from drop downs 
        queryJSON.Gender = document.getElementById("Gender").value;
        queryJSON.ParentEducation = document.getElementById("SelectEducation").value;
        queryJSON.Race = document.getElementById("SelectRace").value;
        queryJSON.Ethnicity = document.getElementById("SelectEthinicity").value;
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
                 
                //If its a regular query temp get the second drop down value 
                if(childID.includes(RegularTemp)){
                        //Gets the second drop down menu of the query template
                        var child2 = parentTemplate.getElementsByTagName("select")[1];
                        //Gets the choice selected from the second drop down menu
                        var choice2 = child2.options[child2.selectedIndex].value;
                        queryTempJSON.Drop2 = choice2;
                }

                        
                //Adds the query template JSON to the JSON that contains all of the query information
                var ArrayPos = x - 1;
                queryJSON.queries[ArrayPos] = queryTempJSON;
                            
        }
                
        var CountStuds = 0;
        
        //Converts the query JSON into a string
        var str_JSON = JSON.stringify(queryJSON);
        //Sends the query JSON to PHP to return the query results
        var request= new XMLHttpRequest();
        request.open("POST", "ReportQuerying.php", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(str_JSON);
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
				//alert(request.responseText);	
                                document.getElementById("dummy").innerHTML = request.responseText;
                                //Gets the Query JSON containing the survey and responses 
                                var QueryJSON = JSON.parse(request.responseText);                                                        
                                var Index = 0;
                                var Index2 = 0;
                                var Type = '';
                                var QuestionID = '';
                                var NumMatrixSub = 0;
                                var MatrixIndexQuestion = 0;
                                
                                //For each query 
                                for(var x = 0; x < queryJSON.queries.length; x++){
                                        //For each student 
                                        for(var y = 0; y < QueryJSON.SurveyResponses.length; y++){                                              
                                                //Gets the array of the student's responses objs Note: have to do this because it treats this as text 
                                                StudentResponses = JSON.parse(QueryJSON.SurveyResponses[y].StudentResponses);
                                                for(var z = 0; z < StudentResponses.length; z++){
                                                        //If index of student response matches query temp id then...
                                                        if(queryJSON.queries[x].ID == StudentResponses[z].Q_id){
                                                                
                                                                Index = z;
                                                                Type = StudentResponses[z].type;
                                                                //if matrix get # of sub questions 
                                                                if(Type == 'matrix'){
                                                                        NumMatrixSub = StudentResponses[z].ans.length;
                                                                }
                                                                QuestionID = StudentResponses[z].Q_id;
                                                                break; 
                                                        }
                                                }
                                                var SurveyQuestions = JSON.parse(QueryJSON.SurveyQuestions);
                                                //Find the index of the question for the 
                                                for(var q = 0; q < SurveyQuestions.length; q++){
                                                        if(SurveyQuestions[q].Q_id == QuestionID){
                                                                MatrixIndexQuestion = q;
                                                                break;
                                                        }
                                                }
                                        }
                                                if(Type == 'multic'){
                                                        //Checks the student response of the multiple choice question at index 
                                                        for(var a = 0; a < QueryJSON.SurveyResponses.length; a++){
                                                                StudentResponses = JSON.parse(QueryJSON.SurveyResponses[a].StudentResponses);                                                                                                              
                                                                document.getElementById("dummy4").innerHTML = queryJSON.queries[x].Drop2;                                                                
                                                                if(StudentResponses[Index].ans == queryJSON.queries[x].Drop2){
                                                                        CountStuds = CountStuds + 1;                                                                       
                                                                }                                                               
                                                        } 
                                                        var Question = queryJSON.queries[x].Drop1 + " " + queryJSON.queries[x].Drop2;
                                                        AddQueryResult(CountStuds, queryJSON.ReturnType, QueryJSON.SurveyResponses.length, Question);
                                                        //Resets
                                                        CountStuds = 0;
                                                }
                                                else if(Type == 'text'){                                                                                                           
                                                        var table = document.createElement('table');
                                                        for(var a = 0; a < QueryJSON.SurveyResponses.length; a++){
                                                            var FullName = QueryJSON.SurveyResponses[a].FirstName + " " + QueryJSON.SurveyResponses[a].LastName;
                                                            
                                                            StudentResponses = JSON.parse(QueryJSON.SurveyResponses[a].StudentResponses);                                      
                                                            var tr = document.createElement('tr');   
                                                            var td1 = document.createElement('td');
                                                            var td2 = document.createElement('td');
                                                            var text1 = document.createTextNode(FullName);
                                                            var text2 = document.createTextNode(StudentResponses[Index].ans);

                                                            td1.appendChild(text1);
                                                            td2.appendChild(text2);
                                                            tr.appendChild(td1);
                                                            tr.appendChild(td2);

                                                            table.appendChild(tr);
                                                        }
                                                        //Creates a div for creating a new query result for the table 
                                                        count2++;
                                                        var queryResultNew = document.createElement("div");
                                                        queryResultNew.setAttribute("id", count2);
                                                        
                                                        //This button is for deleting the table 
                                                        var button1 = document.createElement("button");      
                                                        button1.onclick = function(){removeElement('QueryResult', id);}
                                                        var textDelete = document.createTextNode("-");
                                                        button1.appendChild(textDelete);
                                                        
                                                        //Adds the table and delete button to the div 
                                                        queryResultNew.appendChild(table);
                                                        queryResultNew.appendChild(button1);
                                                        
                                                        //Adds the div query result to the web page 
                                                        element = document.getElementById("QueryResult");
                                                        element.appendChild(queryResultNew);
                                                        
                                                        
                                                }                                               
                                                else if(Type == 'matrix' && SurveyName == 'Both'){
                                                        var FoundMatch = false;
                                                        //Gets the ID of the question for the matching matrix question for post                                                       
                                                        for(var x = 0; x < QueryJSON.SurveyResponses2.length; x++){
                                                                var StudentResponses2 = JSON.parse(QueryJSON.SurveyResponses2[x].StudentResponses);                                                               
                                                                for(var y2 = 0; y2 < StudentResponses2.length; y2++){
                                                                        if(StudentResponses2[y2].Q_id == QuestionID){
                                                                                Index2 = y2; 
                                                                                FoundMatch = true;
                                                                                break;
                                                                        }
                                                                        
                                                                }
                                                        }
                                                        
                                                        if(FoundMatch == true){
                                                                var table = document.createElement('table');
                                                                //Adds the main question to the table 
                                                                var Tr = document.createElement('tr');   
                                                                var Td = document.createElement('td');
                                                                var Text = document.createTextNode(SurveyQuestions[MatrixIndexQuestion].Q_topic);
                                                                Td.appendChild(Text);
                                                                Tr.appendChild(Td);
                                                                table.appendChild(Tr);
                                                                
                                                                //For each sub question 
                                                                for(var z = 0; z < NumMatrixSub; z++){  
                                                                        var CountStudsMatched = 0;

                                                                        var CountPositive = 0;
                                                                        //For each student in pre get student ID and responses 
                                                                        for(var x = 0; x < QueryJSON.SurveyResponses.length; x++){                                                                                
                                                                                var PreStudID = QueryJSON.SurveyResponses[x].StudID;
                                                                                var StudentResponses = JSON.parse(QueryJSON.SurveyResponses[x].StudentResponses);  
                                                                                //For each student in post get student ID and responses  
                                                                                for(var y = 0; y < QueryJSON.SurveyResponses2.length; y++){                                                                                        
                                                                                        var PostStudID = QueryJSON.SurveyResponses2[y].StudID;
                                                                                        var StudentResponses2 = JSON.parse(QueryJSON.SurveyResponses2[y].StudentResponses);
                                                                                        //If IDs match check change response for the question 
                                                                                        if(PreStudID == PostStudID){
                                                                                                CountStudsMatched = CountStudsMatched + 1;
                                                                                                if(PositiveResponse(StudentResponses[Index].ans[z], StudentResponses2[Index2].ans[z]) == true){
                                                                                                        CountPositive = CountPositive + 1;                                                                                                      
                                                                                                }
                                                                                        }
                                                                                }
                                                                        }
                                                                        var SurveyQuestions = JSON.parse(QueryJSON.SurveyQuestions); 
                                                                        var PositiveResult = MatrixResult(CountPositive, CountStudsMatched, queryJSON.ReturnType);
                                                                        var tr = document.createElement('tr');   
                                                                        var td1 = document.createElement('td');
                                                                        var td2 = document.createElement('td');
                                                                        //Gets the sub question text 
                                                                        var text1 = document.createTextNode(SurveyQuestions[MatrixIndexQuestion].questions[z]);
                                                                        //Gets the query result for the matrix sub question 
                                                                        var text2 = document.createTextNode(PositiveResult);                                                                                                                                            
                                                                        
                                                                        //Add question and result to a row then the table 
                                                                        td1.appendChild(text1);
                                                                        td2.appendChild(text2);
                                                                        tr.appendChild(td1);
                                                                        tr.appendChild(td2);
                                                                        table.appendChild(tr);

                                                                }
                                                                //Creates a div for creating a new query result for the table 
                                                                count2++;
                                                                var queryResultNew = document.createElement("div");
                                                                queryResultNew.setAttribute("id", count2);
                                                                
                                                                //This button is for deleting the table 
                                                                var button1 = document.createElement("button");      
                                                                button1.onclick = function(){removeElement('QueryResult', id);}
                                                                var textDelete = document.createTextNode("-");
                                                                button1.appendChild(textDelete);
                                                                
                                                                //Adds the table and button to the div  
                                                                queryResultNew.appendChild(table);
                                                                queryResultNew.appendChild(button1);
                                                                
                                                                //Adds the query result to the web page
                                                                element = document.getElementById("QueryResult");
                                                                element.appendChild(queryResultNew);
                                                                
                                                                
                                                        }                                                         
                                                }
                                                else if(Type == 'matrix' && SurveyName != 'Both'){
                                                        var table = document.createElement('table');
                                                        //Adds the primary question to the table 
                                                        var Tr = document.createElement('tr');   
                                                        var Td = document.createElement('td');
                                                        var Text = document.createTextNode(SurveyQuestions[MatrixIndexQuestion].Q_topic);
                                                        Td.appendChild(Text);
                                                        Tr.appendChild(Td);
                                                        table.appendChild(Tr);
                                                        var SurveyQuestions = JSON.parse(QueryJSON.SurveyQuestions); 
                                                        //For each sub question                                                      
                                                        for(var b = 0; b < NumMatrixSub; b++){
                                                                //For each student 
                                                                var CountPositive = 0;
                                                                for(var a = 0; a < QueryJSON.SurveyResponses.length; a++){
                                                                        var StudentResponses = JSON.parse(QueryJSON.SurveyResponses[a].StudentResponses);
                                                                        if(PositiveResponse2(StudentResponses[Index].ans[b]) == true){
                                                                                CountPositive = CountPositive + 1;
                                                                        }
                                                                }
                                                                var PositiveResult = MatrixResult(CountPositive, QueryJSON.SurveyResponses.length, queryJSON.ReturnType);
                                                                var tr = document.createElement('tr');   
                                                                var td1 = document.createElement('td');
                                                                var td2 = document.createElement('td');
                                                                var text1 = document.createTextNode(SurveyQuestions[MatrixIndexQuestion].questions[b]);
                                                                var text2 = document.createTextNode(PositiveResult);

                                                                td1.appendChild(text1);
                                                                td2.appendChild(text2);
                                                                tr.appendChild(td1);
                                                                tr.appendChild(td2);
                                                                table.appendChild(tr);                                                                
                                                        } 
                                                        //Creates a div for creating a new query result for the table 
                                                        count2++;
                                                        var queryResultNew = document.createElement("div");
                                                        queryResultNew.setAttribute("id", count2);
                                                        //table.setAttribute("id", count2);
                                                                
                                                        //This button is for deleting the table 
                                                        var button1 = document.createElement("button");      
                                                        button1.onclick = function(){removeElement('QueryResult', id);}
                                                        var textDelete = document.createTextNode("-");
                                                        button1.appendChild(textDelete);
                                                        
                                                        //document.getElementById("dummy2").appendChild(table);
                                                        queryResultNew.appendChild(table);
                                                        queryResultNew.appendChild(button1);
                                                        
                                                        element = document.getElementById("QueryResult");
                                                        element.appendChild(queryResultNew);
                                                }  
                                }
                             
                        }        
                }                
        }
}
//Checks if its a positive response for matrix with option both 
function PositiveResponse(PreAnswer, PostAnswer){
        if(PreAnswer == 'A' && PostAnswer == 'A'){
                return true;
        }
        else if(PreAnswer == 'SA' && PostAnswer == 'SA'){
                return true; 
        }
        else if(PreAnswer == 'A' && PostAnswer == 'SA'){
                return true;
        }
        else if(PreAnswer == 'SA' && PostAnswer == 'A'){
                return true;
        }
        else if(PreAnswer == 'D' && PostAnswer == 'A'){
                return true;               
        }
        else if(PreAnswer == 'D' && PostAnswer == 'SA'){
                return true;
        }
        else if(PreAnswer == 'SD' && PostAnswer == 'A'){
                return true;               
        }
        else if(PreAnswer == 'SD' && PostAnswer == 'SA'){
                return true;
        }
}

//Checks if its a positive response for pre or post survey matrix 
function PositiveResponse2(Answer){
        if(Answer == 'A'){
                return true;
        }
        else if(Answer == 'SA'){
                return true;
        }
        else if(Answer == 'SD'){
                return false;
        }
        else if(Answer == 'D'){
                return false;
        }
}
//Returns a percentage or a count for change response for a pre or post matrix
function MatrixResult(CountPositive, NumStuds, ReturnType){
        if(ReturnType == 'Count'){
                return CountPositive;
        }
        else{
                //return (((CountPositive / NumStuds) * 100) + '%');
                var result = (CountPositive /NumStuds) * 100;
                result = Math.round(result * 100) / 100;
                return (result + '%');
        }  
}

//Deletes table
function DeleteTable(TableID){
        DynaTable = document.getElementById(TableID);
        DynaTable.parentNode.removeChild(DynaTable);        
}

//Creates a queryResult template 
function AddQueryResult(TotCount, ReturnType, NumStuds, Question){                  
        count2++;        
        //Output to check if correct 
        var id = count2;                
        //Creates a div for creating a new query 
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", count2);        
        //Creates an input text box for the label for multic 
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
        label.value = Question;
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
        //Return type is a count 
        if(ReturnType == "Count"){
                input.value = TotCount; 
        }
        //Return type is a percent 
        else{
                input.value = TotCount / NumStuds; 
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
}

//functions for removing the query templates when their delete button is clicked 
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
        var childDivs = document.getElementById('query').getElementsByTagName('div');
        var NumDelete = childDivs.length;       
        var tot = 0;
        //loop is for deleting only the change in response query templates 
        while(tot != NumDelete){
                var childDiv = childDivs[tot];
                var ID = childDiv.id;
                if(ID.includes("ChangeRes")==true){
                        removeElement("query", ID);    
                }
                else{
                        tot++;
                }
                NumDelete = childDivs.length;   
        }       
}

//Function for displaying the responses for a regular query template 
function dispResponses(id){
        //Gets the parent template 
        parentTemplate = document.getElementById(id);
        //Get the drop dop element that displays the questions 
        child = parentTemplate.getElementsByTagName("select")[0];
        //Gets the drop down element that displays the responses
        child2 = parentTemplate.getElementsByTagName("select")[1];
        NumChildren = child2.length;
        for(var x = 0; x < (NumChildren - 1); x++){
                child2.removeChild(child2.lastChild); 
        }                  
        //Gets the question that was selected 
        var choiceQues = child.options[child.selectedIndex].value;
        document.getElementById("dummy").innerHTML = choiceQues;        
        //Gets the surveyID 
        var e = document.getElementById("select2");
        var choice = e.options[e.selectedIndex].value;                
        //For sending the javascript variable containing the surveyID and for receiving a JSON array of questions 
        var request= new XMLHttpRequest();
        request.open("POST", "GetQuestionsDropDown.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(choice);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){
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
                                                        //The question is multiple choice 
                                                        if(QuestionType == "multic"){
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
                                                }                                                                                                                                                                                         
                                        }
                                                                                                                                                        
                                }	
                        }	
                }               
}

//Fills the dropdown for selecting a camp for querying a survey
function GetCamps(){
        xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
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
        var  e = document.getElementById("select1");
        var choice = e.options[e.selectedIndex].value;       
        var request= new XMLHttpRequest();
        request.open("POST", "GetSurveys.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(choice);
        request.onreadystatechange=function(){
                if(request.readyState == 4){
                        if(request.status == 200){ 
                                var doc = document.getElementById("select2");
				doc.innerHTML = request.responseText; 
                        }
                }
        }                                                                                             
}









