
var count = 0;
var count2 = 0; 
function AddQuery()
{
        if(document.getElementById("Regular").checked)
        {
                
                count++;
                
                //Output to check if correct 
                var id = 'Reg' + count; 
                document.getElementById("dummy").innerHTML = id;
                
                
        //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'Reg' + count);
           
        //This is for selecting a survey question to query 
                var dropDown1 = document.createElement("select");
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.appendChild(text100);
                dropDown1.appendChild(option100);
               
        //This is for creating the dropdown for the operator 
                var dropDown3 = document.createElement("select");
                dropDown3.onclick = function(){dispOperators();}
                //Select Operator option
                var option10 = document.createElement("option");
                var text10 = document.createTextNode("Select operator");
                option10.appendChild(text10);
                dropDown3.appendChild(option10);
                
                //Equals option 
                var option1 = document.createElement("option");
                var text1 = document.createTextNode("Count");
                option1.appendChild(text1);
                dropDown3.appendChild(option1);
                //Greater than option 
                var option2 = document.createElement("option");
                var text2 = document.createTextNode("Percentage");
                option2.appendChild(text2);
                dropDown3.appendChild(option2); 
                
        //This is for selecting a response for the question that was chosen 
                var dropDown2 = document.createElement("select");
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
                //queryNew.appendChild(dropDown3);
                queryNew.appendChild(button4);
                
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
        
        if(document.getElementById("ChangeResponse").checked)
        {
                count++;
                
                //Output to check if correct 
                var id = 'ChangeRes' + count; 
                document.getElementById("dummy").innerHTML = id;
                
        //Creates a div for creating a new query 
                var queryNew = document.createElement("div");
                queryNew.setAttribute("id", 'ChangeRes' + count);
           
        //This is for selecting a survey question to query 
                var dropDown1 = document.createElement("select");
                var option100 = document.createElement("option");
                var text100 = document.createTextNode("Select Question");
                option100.appendChild(text100);
                dropDown1.appendChild(option100);
               
        //This is for creating the dropdown for response changed from 
                var dropDown3 = document.createElement("select");
                dropDown3.onclick = function(){dispOperators();}
                //Select Operator option
                var option10 = document.createElement("option");
                var text10 = document.createTextNode("Response changed from");
                option10.appendChild(text10);
                dropDown3.appendChild(option10);
        //This is for creating the dropdown for response changed to
                var dropDown4 = document.createElement("select");
                dropDown4.onclick = function(){dispOperators();}
                //Select Operator option
                var option11 = document.createElement("option");
                var text11 = document.createTextNode("Response changed to");
                option11.appendChild(text11);
                dropDown4.appendChild(option11);        
              
        
        //This is for deleting the query 
                var button4 = document.createElement("button");      
                button4.onclick = function(){removeElement('query', id);}
                var text4 = document.createTextNode("-");
                button4.appendChild(text4);

        //Adds the drop downs and delete button to the div element for making the new query 
                queryNew.appendChild(dropDown1);
                queryNew.appendChild(dropDown3);
                queryNew.appendChild(dropDown4);
                queryNew.appendChild(button4);
                
                element = document.getElementById("query");
                element.appendChild(queryNew);
        }
}

//Creates a queryResult template 
function AddQueryResult(){
        count2++;
                
        //Output to check if correct 
        var id = count2; 
                 
        //Creates a div for creating a new query 
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", count2);
        
        //Creates a text box for the result of the query
        var label = document.createElement("input");
        label.setAttribute("id", 'label' + count2)
        
        //Creates a break tag
        var break1 = document.createElement("br");
        
        //Creates a text box for a label for the query result 
        var input = document.createElement("input");
        input.setAttribute("id", 'input' + count2);
        
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
        
        document.getElementById("reportJSON").innerHTML = document.getElementById('label' + count2).id;
}


//functions for removing a query template when its delete button is clicked 
//It also deletes query results when their delete butto  is clicked 
function removeElement(parentDiv, childDiv){
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
          
     }        
}
}

//Deletes all query children of the parent 
function DeleteAll(){
        //Gets the ID of the parent that contains all of the children 
        element = document.getElementById("query");
        //Loop for deleting all of the query children 
        while (count > 0) {
                //Removes last child that was recently created 
                element.removeChild(element.lastChild);
                //Decrements the number of children 
                count--;
        }
        //Testing purposes for displaying the number of children that are on the page 
        document.getElementById("dummy").innerHTML = count;
}

//Report generation JSON 
/*function Report_JSON(){
        //Create a json for the report 
	var report_json = {};
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
        document.getElementById("reportJSON").innerHTML = str_json;
     
       
        var request= new XMLHttpRequest();
        request.open("POST", "SaveReport.php", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(str_json);
        
       

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "SaveReport.php", !0);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(str_json);
      


}*/
function Report_JSON(){
        //Create a json for the report 
	var report_json = {};
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
        document.getElementById("reportJSON").innerHTML = str_json;
        
        var request= new XMLHttpRequest()
        request.open("POST", "SaveReport.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(str_json)
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
				alert(request.responseText);	
			}	
		}	
	}
        
        
        /*console.log("saving");
	console.log(str_json);
	str_json = "x=" + encodeURIComponent(str_json);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "SaveReport.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				alert(xmlhttp.responseText);	
			}	
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str_json);*/
	
}




function dispQuestions(){
        
}







