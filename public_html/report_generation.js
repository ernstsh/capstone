//For keeping track of the # of query templates and for ID purposes 
var count = 0;
//For keeping track of # of query result templates and ID purposes
var count2 = 0; 
//To keep track of the ID of a saved report and to save edits of the current report 
var SavedReportID; 


//Creates a query template based on the selection 
function AddQuery()
{
//Query temp for a multiple choice question 
        //Gets the survey name 
        var SurveyDropDown = document.getElementById("select2");         
        var SurveyName = SurveyDropDown.options[SurveyDropDown.selectedIndex].text;
        if(document.getElementById("Regular").checked && SurveyName != "Both")
        {               
                count++;
                var id = 'Reg' + count;                            
                //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'Reg' + count);
                //Drop down for selecting a multiple choice question 
                var dropDown1 = document.createElement("select");
                dropDown1.onchange= function(){dispResponses(id);}   
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.style.fontWeight = "bold";
                option100.appendChild(text100);
                dropDown1.appendChild(option100);
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
                                        var json = JSON.parse(request.responseText);
                                        //Displays the multiple choice questions in the drop down 
                                        for (var i = 0; i < json.length; i++) {
                                                var QuestionType = json[i].type;        
                                                if(QuestionType == 'multic'){
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
                //Second drop down for selecting a response based on the question that was selected  
                var dropDown2 = document.createElement("select");
                /*var option200 = document.createElement("option");
                var text200 = document.createTextNode("Select Question Response");
                option200.appendChild(text200);
                dropDown2.appendChild(option200);*/                                
                //Button for deleting the query template 
                var button4 = document.createElement("button");      
                button4.onclick = function(){removeElement('query', id);}
                var text4 = document.createTextNode("-");
                button4.appendChild(text4);
                //Adds the drop downs and delete button to the div element for creating the template 
                queryNew.appendChild(dropDown1);
                queryNew.appendChild(dropDown2);
                queryNew.appendChild(button4);              
                //Adds template to the parent, so that it is displayed in the webpage 
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
                                        var json = JSON.parse(request.responseText);
                                        //Iterates through each question JSON 
                                        for (var i = 0; i < json.length; i++) {                                                         
                                                var QuestionType = json[i].type;
                                                //Checks to see if its a matrix question  
                                                if(QuestionType == "matrix") {
                                                        var questionText = json[i].Q_topic;
                                                        var questionID = json[i].Q_id;                                                        
                                                        var optionQues = document.createElement("option");
                                                        optionQues.setAttribute("id", questionID);                                                       
                                                        optionQues.value = questionID;                                                
                                                        var textQues = document.createTextNode(questionText);
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
                //Adds the query temp to the parent, so that it is displayed on the webpage 
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
}

//Code for creating the query JSON for returning the query results 
function ReturnResult(){
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
        /*if (document.getElementById('Count').checked) {
                queryJSON.ReturnType = document.getElementById('Count').value;
        }
        if (document.getElementById('Percent').checked) {
                queryJSON.ReturnType = document.getElementById('Percent').value;
        }*/
               
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
        
        //JSON array for storing the query templates 
        queryJSON.queries = [];        
        //Gets the query parent div that contains the query templates 
        Parent = document.getElementById("query");   
        //Creates a json for each query temp and stores them in the array 
        for(var x = 1; x < Parent.childNodes.length; x=x+1){
                var RegularTemp = "Reg";
                var ChangeResponse = "ChangeRes";
                //Creates a query template JSON
                var queryTempJSON = {};
                childID = Parent.childNodes[x].id;                                                             
                var parentTemplate = document.getElementById(childID);                
                var child = parentTemplate.getElementsByTagName("select")[0];
                var choice1 = child.options[child.selectedIndex].text;
                queryTempJSON.Drop1 = choice1;                
                queryTempJSON.ID = child.options[child.selectedIndex].value;               
                //If its a query template for a multiple choice question get the second drop down value 
                if(childID.includes(RegularTemp)){
                        var child2 = parentTemplate.getElementsByTagName("select")[1];
                        
                        MultiAnswers = [];
                        for(var z = 0; z < child2.length; z++){
                                MultiAnswers[z] = child2.options[z].value;
                        }
                        queryTempJSON.Drop2 = MultiAnswers;
                        
                        //var choice2 = child2.options[child2.selectedIndex].value;
                        //queryTempJSON.Drop2 = choice2;                       
                }                       
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
                                //document.getElementById("dummy").innerHTML = request.responseText;
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
                                                //Find the index of the question 
                                                for(var q = 0; q < SurveyQuestions.length; q++){
                                                        if(SurveyQuestions[q].Q_id == QuestionID){
                                                                MatrixIndexQuestion = q;
                                                                break;
                                                        }
                                                }
                                        }
                                        
                                        
                                        
                                        
                                                if(Type == 'multic'){
                                                        var table = document.createElement('table');
                                                        var Tr = document.createElement('tr');   
                                                        var Td = document.createElement('td');
                                                        var Text = document.createTextNode(queryJSON.queries[x].Drop1);                                                  
                                                        Td.appendChild(Text);
                                                        Tr.appendChild(Td);
                                                        table.appendChild(Tr);
                                                        
                                                        var MultiResponses = queryJSON.queries[x].Drop2;
                                                        //For each multi response 
                                                        for(var b = 0; b < queryJSON.queries[x].Drop2.length; b++){
                                                                //Checks the student response of the multiple choice question at index 
                                                                for(var a = 0; a < QueryJSON.SurveyResponses.length; a++){
                                                                        StudentResponses = JSON.parse(QueryJSON.SurveyResponses[a].StudentResponses);                                                                                                              
                                                                        if(StudentResponses[Index].ans == MultiResponses[b]){
                                                                                CountStuds = CountStuds + 1;                                                                       
                                                                        }                                                               
                                                                }
                                                                var Tr = MultiRow(MultiResponses[b], CountStuds, QueryJSON.SurveyResponses.length);
                                                                table.appendChild(Tr);
                                                                //Resets
                                                                CountStuds = 0;        
                                                        } 
                                                        //Creates a div for creating a new query result for the table 
                                                        count2++;
                                                        var queryResultNew = document.createElement("div");
                                                        queryResultNew.setAttribute("id", "Multi" + count2);
                                                        
                                                        //This button is for deleting the table 
                                                        var button1 = document.createElement("button");      
                                                        button1.onclick = function(){removeChild(queryResultNew.id);}
                                                        
                                                        var textDelete = document.createTextNode("-");
                                                        button1.appendChild(textDelete);
                                                        
                                                        //Adds the table and delete button to the div 
                                                        queryResultNew.appendChild(table);
                                                        queryResultNew.appendChild(button1);
                                                        
                                                        //Adds the div query result to the web page 
                                                        element = document.getElementById("QueryResult");
                                                        element.appendChild(queryResultNew);        
                                                }
                                                
                                                
                                                
                                                
                                                
                                                else if(Type == 'text'){                                                                                                           
                                                        var table = document.createElement('table');
                                                        var Tr = document.createElement('tr');   
                                                        var Td = document.createElement('td');
                                                        var Text = document.createTextNode(SurveyQuestions[Index].Q_text);                                                                                                             
                                                        Td.appendChild(Text);
                                                        Tr.appendChild(Td);
                                                        var Td2 = document.createElement('td');
                                                        var Text2 = document.createTextNode("Student Response");
                                                        Td2.appendChild(Text2);
                                                        Tr.appendChild(Td2);
                                                        table.appendChild(Tr);

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
                                                        queryResultNew.setAttribute("id", "Text" + count2);
                                                        
                                                        //This button is for deleting the table 
                                                        var button1 = document.createElement("button");      
                                                        button1.onclick = function(){removeChild(queryResultNew.id);}
                                                        
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
                                                                var Tr = MatrixRow(SurveyQuestions[MatrixIndexQuestion].Q_topic, SurveyQuestions[MatrixIndexQuestion].Q_scale, 'Both');
                                                                table.appendChild(Tr);
                                                                
                                                                //For each sub question 
                                                                for(var z = 0; z < NumMatrixSub; z++){  
                                                                        var CountStudsMatched = 0;
                                                                        var CountPositive = 0;
                                                                        
                                                                        //To keep track of the scale options for both pre and post question results 
                                                                        var Tot1Pre = 0, Tot2Pre = 0, Tot3Pre = 0, Tot4Pre = 0;                                                                                 
                                                                        var Tot1Post = 0, Tot2Post = 0, Tot3Post = 0, Tot4Post = 0; 
                                                                        
                                                                        //For each student in pre get student ID and responses 
                                                                        for(var x = 0; x < QueryJSON.SurveyResponses.length; x++){                                                                                
                                                                                var PreStudID = QueryJSON.SurveyResponses[x].StudID;
                                                                                var StudentResponses = JSON.parse(QueryJSON.SurveyResponses[x].StudentResponses);  
                                                                                //For each student in the post get student ID and responses 
                                                                                for(var y = 0; y < QueryJSON.SurveyResponses2.length; y++){                                                                                        
                                                                                        var PostStudID = QueryJSON.SurveyResponses2[y].StudID;
                                                                                        var StudentResponses2 = JSON.parse(QueryJSON.SurveyResponses2[y].StudentResponses);
                                                                                        //If IDs match check change response for the question 
                                                                                        if(PreStudID == PostStudID){
                                                                                                CountStudsMatched = CountStudsMatched + 1;
                                                                                                //For counting the total for each option in the scale for pre survey
                                                                                                if(StudentResponses[Index].ans[z] == 'SA' || StudentResponses[Index].ans[z] == 'GD'){
                                                                                                      Tot1Pre = Tot1Pre + 1;  
                                                                                                }
                                                                                                else if(StudentResponses[Index].ans[z] == 'A' || StudentResponses[Index].ans[z] == 'M'){
                                                                                                       Tot2Pre = Tot2Pre + 1; 
                                                                                                }
                                                                                                else if(StudentResponses[Index].ans[z] == 'D' || StudentResponses[Index].ans[z] == 'S'){
                                                                                                        Tot3Pre = Tot3Pre + 1;
                                                                                                }
                                                                                                else if(StudentResponses[Index].ans[z] == 'SD' || StudentResponses[Index].ans[z] == 'NA'){
                                                                                                        Tot4Pre = Tot4Pre + 1;
                                                                                                }
                                                                                                
                                                                                                //For counting the total for each scale option in the post survey 
                                                                                                if(StudentResponses2[Index2].ans[z] == 'SA' || StudentResponses2[Index2].ans[z] == 'GD'){
                                                                                                      Tot1Post = Tot1Post + 1;  
                                                                                                }
                                                                                                else if(StudentResponses2[Index2].ans[z] == 'A' || StudentResponses2[Index2].ans[z] == 'M'){
                                                                                                       Tot2Post = Tot2Post + 1; 
                                                                                                }
                                                                                                else if(StudentResponses2[Index2].ans[z] == 'D' || StudentResponses2[Index2].ans[z] == 'S'){
                                                                                                        Tot3Post = Tot3Post + 1;
                                                                                                }
                                                                                                else if(StudentResponses2[Index2].ans[z] == 'SD' || StudentResponses2[Index2].ans[z] == 'NA'){
                                                                                                        Tot4Post = Tot4Post + 1;
                                                                                                }
                                                                                                
                                                                                                //For counting the total positive responses 
                                                                                                if(PositiveResponse(StudentResponses[Index].ans[z], StudentResponses2[Index2].ans[z]) == true){
                                                                                                        CountPositive = CountPositive + 1;                                                                                                      
                                                                                                }
                                                                                        }
                                                                                }
                                                                        }
                                                                        var SurveyQuestions = JSON.parse(QueryJSON.SurveyQuestions); 
                                                                        //var PositiveResult = MatrixResult(CountPositive, CountStudsMatched, queryJSON.ReturnType);                                                                
                                                                        var Tr2 = MatrixRow2(SurveyQuestions[MatrixIndexQuestion].questions[z], 'Both', Tot1Pre, Tot2Pre, Tot3Pre, Tot4Pre, Tot1Post, Tot2Post, Tot3Post, Tot4Post, CountPositive, CountStudsMatched);
                                                                        table.appendChild(Tr2);  

                                                                }
                                                                //Creates a div for creating a new query result for the table 
                                                                count2++;
                                                                var queryResultNew = document.createElement("div");
                                                                queryResultNew.setAttribute("id", "Matrix" + count2);
                                                                
                                                                table.setAttribute("id", "table" + count2);
                                                                
                                                                //This button is for deleting the table 
                                                                var button1 = document.createElement("button");      
                                                                button1.onclick = function(){removeChild(queryResultNew.id);}
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
                                                        var Tr;
                                                        Tr = MatrixRow(SurveyQuestions[MatrixIndexQuestion].Q_topic, SurveyQuestions[MatrixIndexQuestion].Q_scale, '!Both');
                                                        table.appendChild(Tr);
                                                        var SurveyQuestions = JSON.parse(QueryJSON.SurveyQuestions); 
                                                        //For each sub question                                                      
                                                        for(var b = 0; b < NumMatrixSub; b++){
                                                                var CountPositive = 0;
                                                                //Keeps track of the scale options totals
                                                                var Tot1 = 0, Tot2 = 0, Tot3 = 0, Tot4 = 0;
                                                                //Keeps track of the scale type used for matrix question
                                                                var ScaleType;
                                                                //For each student 
                                                                for(var a = 0; a < QueryJSON.SurveyResponses.length; a++){
                                                                        var StudentResponses = JSON.parse(QueryJSON.SurveyResponses[a].StudentResponses);                                                                      
                                                                        if(StudentResponses[Index].ans[b] == 'SA' || StudentResponses[Index].ans[b] == 'GD'){
                                                                                Tot1 = Tot1 + 1;
                                                                        }
                                                                        else if(StudentResponses[Index].ans[b] == 'A' || StudentResponses[Index].ans[b] == 'M'){
                                                                                Tot2 = Tot2 + 1;
                                                                        }
                                                                        else if(StudentResponses[Index].ans[b] == 'D' || StudentResponses[Index].ans[b] == 'S'){
                                                                                Tot3 = Tot3 + 1;
                                                                        }
                                                                        else if(StudentResponses[Index].ans[b] == 'SD' || StudentResponses[Index].ans[b] == 'NA'){
                                                                                Tot4 =  Tot4+ 1;
                                                                        }                                                                      
                                                                        if(PositiveResponse2(StudentResponses[Index].ans[b]) == true){
                                                                                CountPositive = CountPositive + 1;
                                                                        }
                                                                }
                                                                //var PositiveResult = MatrixResult(CountPositive, QueryJSON.SurveyResponses.length, queryJSON.ReturnType);                                                     
                                                                var Tr = MatrixRow2(SurveyQuestions[MatrixIndexQuestion].questions[b], '!Both', Tot1, Tot2, Tot3, Tot4, 0, 0, 0, 0, CountPositive, QueryJSON.SurveyResponses.length);
                                                                table.appendChild(Tr);      
                                                        }
                                                        //Creates a div for creating a new query result for the table 
                                                        count2++;
                                                        var queryResultNew = document.createElement("div");
                                                        queryResultNew.setAttribute("id", "Matrix"+count2);
                                                        
                                                        table.setAttribute("id", "table" + count2);
                                                                
                                                        //This button is for deleting the table 
                                                        var button1 = document.createElement("button");      
                                                        button1.onclick = function(){removeChild(queryResultNew.id);}
                                                        var textDelete = document.createTextNode("-");
                                                        button1.appendChild(textDelete);
                                                        
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

//Creates a row for a multiple choice question 
function MultiRow(Response, Answer, TotStuds){
        var Tr = document.createElement('tr');
        for(var a = 0 ; a < 2; a++){
                var Td = document.createElement('td');
                if(a == 0){
                        
                        var Text = document.createTextNode(Response);
                        Td.appendChild(Text);
                }
                else{
                        StringText = "Count:"+Answer+"/"+TotStuds+" "+"Percent:"+ ((Answer/TotStuds) * 100).toFixed(1)+"%";
                        var Text = document.createTextNode(StringText);
                        Td.appendChild(Text);   
                }
                Tr.appendChild(Td);
        }
        return Tr;   
}


//Creates the columns for a matrix question 
function MatrixRow(PrimaryQues, QuestionScale, MatrixType){
        var Tr = document.createElement('tr');   
        for(var x = 0; x < 10; x++){
                var Td = document.createElement('td');
                var Text;
                
                //Not change in response break don't need columns for post survey 
                if(x == 6 && MatrixType == '!Both'){
                        break;
                }
                //Sub Question 
                if(x == 0){
                        Text = document.createTextNode(PrimaryQues);
                }
                //Strongly Disagree(SD) and not at all(NA) cases 
                else if((x == 1 && QuestionScale == 'agree') || (x == 5 && QuestionScale == 'agree' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 1){
                                Text = document.createTextNode('SD(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 5){
                                Text = document.createTextNode('SD(Post)');
                        }
                        else{
                                Text = document.createTextNode('SD');
                        }
                }
                else if((x == 1 && QuestionScale == 'not-deal') || (x == 5 && QuestionScale == 'not-deal' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 1){
                                Text = document.createTextNode('NA(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 5){
                                Text = document.createTextNode('NA(Post)');
                        }
                        else{                                    
                                Text = document.createTextNode('NA');
                        }
                }
                //Disagree(D) and Slightly(S) cases 
                else if((x == 2 && QuestionScale == 'agree') || (x == 6 && QuestionScale == 'agree' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 2){
                                Text = document.createTextNode('D(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 6){
                                Text = document.createTextNode('D(Post)');
                        }
                        else{
                                Text = document.createTextNode('D');
                        }
                }
                else if((x == 2 && QuestionScale == 'not-deal') || (x == 6 && QuestionScale == 'not-deal' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 2){
                                Text = document.createTextNode('S(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 6){
                                Text = document.createTextNode('S(Post)');
                        }
                        else{        
                                Text = document.createTextNode('S');
                        }
                }
                //Agree(A) and Moderately(M) cases 
                else if((x == 3 && QuestionScale == 'agree') || (x == 7 && QuestionScale == 'agree' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 3){
                                Text = document.createTextNode('A(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 7){
                                Text = document.createTextNode('A(Post)');
                        }
                        else{        
                                Text = document.createTextNode('A');
                        }
                }
                else if((x == 3 && QuestionScale == 'not-deal') || (x == 7 && QuestionScale == 'not-deal' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 3){
                                Text = document.createTextNode('M(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 7){
                                Text = document.createTextNode('M(Post)');
                        }
                        else{        
                                Text = document.createTextNode('M');
                        }
                }
                //Strongly Agree (SA) and Great Deak (GD) cases
                else if((x == 4 && QuestionScale == 'agree') || (x == 8 && QuestionScale == 'agree' && MatrixType == 'Both')){
                        if(MatrixType == 'Both' && x == 4){
                                Text = document.createTextNode('SA(Pre)');
                        }
                        else if(MatrixType == 'Both' && x == 8){
                                Text = document.createTextNode('SA(Post)');
                        }
                        else{        
                                Text = document.createTextNode('SA');
                        }        
                }
                else if((x == 4 && QuestionScale == 'not-deal') || (x == 8 && QuestionScale == 'not-deal' && MatrixType == 'Both')){
                                Text = document.createTextNode('GD');
                }
                else if((x == 5 && MatrixType == '!Both') || (x == 9 && MatrixType == 'Both')){
                                Text = document.createTextNode('Total Positive Student Answers');
                }
                Td.appendChild(Text);
                Tr.appendChild(Td);
        }
        return Tr;
}

//Creates the row results for a matrix question 
function MatrixRow2(SecondaryQues, MatrixType, tot1, tot2, tot3, tot4, tot5, tot6, tot7, tot8, totPositive, NumStuds){
        var Tr = document.createElement('tr');
        for(var x = 0; x < 10; x++){
                var Td = document.createElement('td');
                var Text;               
                //Not change in response don't need results for post survey 
                if(x == 6 && MatrixType == '!Both'){
                        break;
                }
                if(x == 0){
                        Text = document.createTextNode(SecondaryQues);
                }
                else if(x == 1){
                        StringText = "Count:"+tot4+"/"+NumStuds+"  "+"Pecent:" + ((tot4/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 2){
                        StringText = "Count:"+tot3+"/"+NumStuds+"  "+"Percent:"+ ((tot3/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 3){ 
                        StringText = "Count:"+tot2+"/"+NumStuds+"  "+"Percent:"+ ((tot2/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 4){
                        StringText = "Count:"+tot1+"/"+NumStuds+"  "+"Percent:"+ ((tot1/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if((x == 5 && MatrixType == '!Both') || (x == 9 && MatrixType == 'Both')){
                        StringText = "Count:"+totPositive+"/"+NumStuds+"  "+"Percent:"+ ((totPositive/NumStuds) * 100).toFixed(2)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 5 && MatrixType == 'Both'){
                        StringText = "Count:"+tot8+"/"+NumStuds+"  "+"Percent:"+ ((tot8/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 6 && MatrixType == 'Both'){
                        StringText = "Count:"+tot7+"/"+NumStuds+"  "+"Percent:"+ ((tot7/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 7 && MatrixType == 'Both'){
                        StringText = "Count:"+tot6+"/"+NumStuds+"  " +"Percent:"+ ((tot6/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                else if(x == 8 && MatrixType == 'Both'){
                        StringText = "Count:"+tot5+"/"+NumStuds+"  "+"Percent:"+ ((tot5/NumStuds) * 100).toFixed(1)+"%";
                        Text = document.createTextNode(StringText);
                }
                Td.appendChild(Text);
                Tr.appendChild(Td);
        }          
        return Tr;
}

//Checks if its a positive response for matrix question with the option both  
function PositiveResponse(PreAnswer, PostAnswer){
        //Cases for the first scale type Strongly Agree(SA) - Strongly Disagree(SD)     
        if((PreAnswer == 'SA' && PostAnswer == 'SA') || (PreAnswer == 'A' && PostAnswer == 'SA') ||
                (PreAnswer == 'SA' && PostAnswer == 'A') || (PreAnswer == 'D' && PostAnswer == 'A') ||
                (PreAnswer == 'D' && PostAnswer == 'SA') || (PreAnswer == 'SD' && PostAnswer == 'A') ||
                (PreAnswer == 'SD' && PostAnswer == 'SA') || (PreAnswer == 'A' && PostAnswer == 'A')){
                return true; 
        }
        //Cases for the second scale type Great Deal(GD) - Not at all(NA)
        else if((PreAnswer == 'NA' && PostAnswer == 'S') || (PreAnswer == 'NA' && PostAnswer == 'M') || 
                (PreAnswer == 'NA' && PostAnswer == 'GD') || (PreAnswer == 'S' && PostAnswer == 'M') ||
                (PreAnswer == 'S' && PostAnswer == 'GD') || (PreAnswer == 'GD' && PostAnswer == 'S') ||
                (PreAnswer == 'M' && PostAnswer == 'S') || (PreAnswer == 'S' && PostAnswer == 'S') ||
                (PreAnswer == 'M' && PostAnswer == 'GD') || (PreAnswer == 'GD' && PostAnswer == 'M') ||
                (PreAnswer == 'M' && PostAnswer == 'M') || (PreAnswer == 'GD' && PostAnswer == 'GD')){
                        return true;
        }
        else{
                return false;
        }
        
}

//Checks if its a positive response for pre or post survey matrix question 
function PositiveResponse2(Answer){
        //Cases for the first scale type Strongly Agree(SA) - Strongly Disagree(SD)
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
        //Cases for the second scale type Great Deal(GD) - Not at all (NA)
        else if(Answer == 'GD'){
                return true;
        }
        else if(Answer == 'M'){
                return true;
        }
        else if(Answer == 'S'){
                return true;
        }
        else if(Answer == 'NA'){
                return false;
        }
}

//Returns a percentage or a count for change response for a pre or post matrix
/*function MatrixResult(CountPositive, NumStuds, ReturnType){
        if(ReturnType == 'Count'){
                return CountPositive;
        }
        else{
                //return (((CountPositive / NumStuds) * 100) + '%');
                var result = ((CountPositive /NumStuds) * 100).toFixed(2);
                //result = Math.round(result * 100) / 100;
                return (result + '%');
        }  
}*/

//Deletes query result 
function removeChild(childID){
        var node = document.getElementById(childID);
        var parent = document.getElementById("QueryResult");
        parent.removeChild(node);
        count2--;
}
/*
//Creates a queryResult template a multiple choice question 
function AddQueryResult(TotCount, ReturnType, NumStuds, Question){                  
        count2++;        
        var id = count2;                
        //Creates a div for creating a new query result 
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", "Multi" + count2);        
        //Creates the input textbox for labeling the query result and formats it 
        var label = document.createElement("input");
        label.setAttribute("id", 'label' + count2)
        label.value = Question;
        var break1 = document.createElement("br");
        //Creates the input textbox for the result and formats it 
        var input = document.createElement("input");
        input.setAttribute("id", 'input' + count2);   
        //Checks to see how the result is going to be returned based on the type selected  
        if(ReturnType == "Count"){
                input.value = TotCount; 
        }
        else if(ReturnType == "Percent"){
                input.value = TotCount / NumStuds; 
        }
        else{
                input.value = TotCount;
        }
        var break2 = document.createElement("br");      
        //Button for deleting the query result
        var button1 = document.createElement("button");      
        button1.onclick = function(){removeChild(queryResultNew.id);}
        var textDelete = document.createTextNode("-");
        button1.appendChild(textDelete);
        //Adds the drop downs and delete button to the div element for making the new query 
        queryResultNew.appendChild(label);
        queryResultNew.appendChild(button1);
        queryResultNew.appendChild(break1);
        queryResultNew.appendChild(input);
        queryResultNew.appendChild(break2); 
        //Adds the query result to the parent, so that it shows up in the webpage 
        element = document.getElementById("QueryResult");
        element.appendChild(queryResultNew);
}
*/
//functions for removing the query templates when their delete button is clicked 
function removeElement(parentDiv, childDiv){
        if(parentDiv != "QueryResult"){
             if (childDiv == parentDiv) 
             {
                  alert("The parent div cannot be removed.");
             }
             //deletes the query template child 
             else if (document.getElementById(childDiv)) 
             {     
                  var child = document.getElementById(childDiv);
                  var parent = document.getElementById(parentDiv);
                  parent.removeChild(child);
                  count--;
             }
             else 
             {
                  alert("Child div has already been removed or does not exist.");
                  return false;
             }
        }
        //For deleting the query result that was selected 
        else{
             if (document.getElementById(childDiv)) 
             {     
                  var child = document.getElementById(childDiv);
                  var parent = document.getElementById(parentDiv);
                  parent.removeChild(child);
                  count2--;
             }        
        }
}

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

function Report_JSON(){
        //Create a json for the report and sets its title and id  
	var report_json = {};                 
        report_json.ReportID = SavedReportID;        
        report_json.title = document.getElementById("TitleReport").value; 
        //Create an array JSON for storing all of the query results 
	report_json.queryResults = [];      
        Parent = document.getElementById("QueryResult");
        Children = Parent.children; 
        var childCount = 0;
        var TotCount = 0;
        while(childCount < Parent.children.length){
                child = Children[childCount];
                var result_json = {};
                if(child.id.includes("Matrix")){
                        result_json.type = "Matrix";
                        result_json.rows = [];
                        var table = child.getElementsByTagName('table')[0];
                        //iterate through rows and rows would be accessed using the "row" variable assigned in the for loop
                        for (var i = 0, row; row = table.rows[i]; i++) {
                                var rowVals = []
                                //iterate through columns and columns would be accessed using the "col" variable assigned in the for loop
                                for (var j = 0, col; col = row.cells[j]; j++) {
                                        rowVals[j] = col.textContent;
                                }
                                result_json.rows[i] = rowVals;
                        }
                        report_json.queryResults[TotCount] = result_json;
                        TotCount++;
                }
                else if(child.id.includes("Text")){
                        result_json.type = "Text";
                        result_json.rows = [];
                        var table = child.getElementsByTagName('table')[0];
                        //iterate through rows and rows would be accessed using the "row" variable assigned in the for loop
                        for (var i = 0, row; row = table.rows[i]; i++) {
                                var rowVals = [];
                                //iterate through columns and columns would be accessed using the "col" variable assigned in the for loop
                                for (var j = 0, col; col = row.cells[j]; j++) {
                                        rowVals[j] = col.textContent;
                                }
                                result_json.rows[i] = rowVals;
                        }
                        report_json.queryResults[TotCount] = result_json;
                        TotCount++;
                }
                else if(child.id.includes("Multi")){
                        /*var ID = child.id;
                        //Removes the text characters from the ID in order to get the int value 
                        ID = ID.replace(/\D/g,'');
                        result_json.type = "Multi";
                        result_json.label = document.getElementById('label' + ID).value;
                        result_json.result = document.getElementById('input' + ID).value;
                        report_json.queryResults[TotCount] = result_json;
                        TotCount++;*/
                        
                        result_json.type = "Multi";
                        result_json.rows = [];
                        var table = child.getElementsByTagName('table')[0];
                        //iterate through rows and rows would be accessed using the "row" variable assigned in the for loop
                        for (var i = 0, row; row = table.rows[i]; i++) {
                                var rowVals = [];
                                //iterate through columns and columns would be accessed using the "col" variable assigned in the for loop
                                for (var j = 0, col; col = row.cells[j]; j++) {
                                        rowVals[j] = col.textContent;
                                }
                                result_json.rows[i] = rowVals;
                        }
                        report_json.queryResults[TotCount] = result_json;
                        TotCount++;

                }
                childCount = childCount + 1;
        }
        SaveReportJSON(report_json);
}

//Saves the report JSON into the Report table 
function SaveReportJSON(report_json){
        var str_json = JSON.stringify(report_json);       
        var request= new XMLHttpRequest()
        request.open("POST", "SaveReport.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(str_json)
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
                                SavedReportID = request.responseText;
			}	
		}	
	}
}

//Function for displaying the responses for a multiple choice query template 
function dispResponses(id){
        //Gets the parent template 
        parentTemplate = document.getElementById(id);
        //Get the drop dop element that displays the questions 
        child = parentTemplate.getElementsByTagName("select")[0];
        //Gets the drop down element that displays the responses
        child2 = parentTemplate.getElementsByTagName("select")[1];
        NumChildren = child2.length;
        //Deletes the responses currently in the 2nd drop down 
        for(var x = 0; x < (NumChildren); x++){ //got rid off Numchildren-1
                child2.removeChild(child2.lastChild); 
        }                  
        //Gets the question that was selected 
        var choiceQues = child.options[child.selectedIndex].value;
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
                                        var json = JSON.parse(request.responseText);                                       
                                        //Loop iterates through the JSON questions to find the one that matches the selected question in 1st drop down                                                                         
                                        for (var i = 0; i < json.length; i++) {
                                                //If we found the selected question fill drop down with responses 
                                                if(choiceQues == json[i].Q_id){
                                                        var QuestionType = json[i].type;
                                                        if(QuestionType == "multic"){
                                                                for(var j = 0; j < json[i].ans.length; j++){
                                                                        var optionQues = document.createElement("option");
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

//Generates a table for the edit report page
function GenTableQuery(table_json){
        //alert(table_json.type);
        var table = document.createElement('table');
        for(var x = 0; x < table_json.rows.length; x++){
                //alert("row");
                var tr = document.createElement('tr');
                for(var y = 0; y < table_json.rows[x].length; y++){
                        //alert("column");
                        var td = document.createElement('td');
                        var Text = document.createTextNode(table_json.rows[x][y]);
                        td.appendChild(Text);
                        tr.appendChild(td);
                }      
                table.appendChild(tr);
        }
        //Creates a div for creating a new query result for the table 
        count2++;      
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", table_json.type + count2);
        table.setAttribute("id", "table" + count2);
                                                                         
        //This button is for deleting the table 
        var button1 = document.createElement("button");      
        button1.onclick = function(){removeChild(queryResultNew.id);}
        var textDelete = document.createTextNode("-");
        button1.appendChild(textDelete);
                                                                
        //Adds the table and button to the div  
        queryResultNew.appendChild(table);
        queryResultNew.appendChild(button1);
                                                                
        //Adds the query result to the web page
        element = document.getElementById("QueryResult");
        element.appendChild(queryResultNew);    
        
}







