//Keeps track of the query results displayed in the edit report page 
var count3 = 0;

//Keep track of the report ID that was selected
var GlobalReportID = 0;

//This section of code generates the report that was selected 
window.onload = function() {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';

            
        //This code receives the report id when the page is loaded 
        var ReportSelected = location.search;
        if (!ReportSelected) return false;
        ReportSelected = ReportSelected.substr(1);
        //gets the 'a' parameter from querystring
        var a = (/^a=/);
        ReportSelected = ReportSelected.split("&").filter(function(item) {
        return a.test(item);
        });
        //if (!ReportSelected.length) return false;
        //gets the first element 'a' matched
        ReportSelected = ReportSelected[0].replace("a=", "");
        ReportSelected = atob(ReportSelected);
        
        //Turns a JavaScript object into  a JSON text 
        ReportSelected = JSON.stringify(ReportSelected);
        //Turns a string of JSON text into a JavaScript object
        //Note: two JSON.parse are required to get the id 
        ReportSelected = JSON.parse(ReportSelected);
        ReportSelected = JSON.parse(ReportSelected);
        //Gets the report id from the JSON object
        var ReportChoice = ReportSelected.ReportID;
        //document.getElementById("dummy").innerHTML = ReportSelected.ReportID;
        
      //
      GlobalReportID =  ReportChoice;
      //      
        
        //For sending the javascript variable for getting the JSON of the report that was selected 
        var request= new XMLHttpRequest();
                request.open("POST", "GetReportSelected.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(ReportChoice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){                                                                            
                                        //alert(request.responseText);                                                                             
                                        //document.getElementById("dummy").innerHTML = request.responseText; 
                                        
                                        //Turns the string JSON from PHP to a JavaScript object 
                                        ReportJSON = JSON.parse(request.responseText);
                                        //Gets the title of the report from the object 
                                        ReportTitle = ReportJSON.title;
                                        ReportTitle = ReportTitle.replace(/["]+/g, '');
                                       
                                        //Gets the query results from the report object 
                                        ReportQueryResults = JSON.parse(ReportJSON.arr_results);
                                        Length = ReportQueryResults.length;
                                        //document.getElementById("dummy").innerHTML = ReportTitle;
                                        //document.getElementById("dummy").innerHTML = Length;

                                        //Displays the query results of the report on the web page 
                                        for(var x = 0; x < Length; x++){
                                                LabelText = ReportQueryResults[x].label;
                                                QueryText = ReportQueryResults[x].query;
                                                                                                                                                                                                                           
                                                count3++;
                                                                                                         
                                                //Creates a div for creating a new query 
                                                var queryResultNew = document.createElement("div");
                                                queryResultNew.setAttribute("id", count3);
                                                
                                                //Creates a text box for the result of the query
                                                var label = document.createElement("input");
                                                label.setAttribute("id", 'label' + count3)
                                                //Creates the text for the input
                                                label.value = LabelText;                                                                                              
                                                //To make label input textbox longer and to make the font larger 
                                                label.style.width = "640px";
                                                label.style.fontSize = "12pt";
                                                label.style.fontFamily = "Times New Roman";
                                                //restricts the number of characters for the label to 95 
                                                label.setAttribute("maxLength", '95');   
                                                //shifts the label to the left for aligning purposes
                                                label.style.marginLeft="22px"
                                                        
                                                //Creates a break tag
                                                var break1 = document.createElement("br");
                                                
                                                //Creates a text box for a label for the query result 
                                                var input = document.createElement("input");
                                                input.setAttribute("id", 'input' + count3);
                                                input.value = QueryText;
                                                //To make input textbox longer with larger font 
                                                input.style.width="640px";
                                                input.style.fontSize="12pt";
                                                input.style.fontFamily="Times New Roman";
                                                //restricts the number of characters for the input result to 95
                                                input.setAttribute("maxLength", '95');
                                                
                                                //Creates a break tag
                                                var break2 = document.createElement("br");
                                                
                                                //This is for deleting the query 
                                                var button1 = document.createElement("button");      
                                                button1.onclick = function(){removeElement2('QueryResult', count3);}
                                                var textDelete = document.createTextNode("-");
                                                button1.appendChild(textDelete);

                                                //Adds the drop downs and delete button to the div element for making the new query 
                                                queryResultNew.appendChild(label);
                                                queryResultNew.appendChild(button1);
                                                queryResultNew.appendChild(break1);
                                                queryResultNew.appendChild(input);
                                                queryResultNew.appendChild(break2);
                                                
                                                //Adds the query result to the QueryResult page element 
                                                element = document.getElementById("QueryResult");
                                                element.appendChild(queryResultNew);
                                                
                                        }
                                        document.getElementById("TitleReport").value = ReportTitle;
                                                                                                                                                                                                                                  
                                }	
                        }
                                
                }     
                //return true;    
    }                
};

//deletes the selected OG query result 
function removeElement2(parentDiv, childDiv){
        document.getElementById("dummy").innerHTML = "deleting query or a result";
        //For deleting the query result that was selected        
        //deletes the query template child 
        if (document.getElementById(childDiv)) 
        {     
                //Gets the parent and child using their IDs 
                var child = document.getElementById(childDiv);
                var parent = document.getElementById(parentDiv);
                //Parent removes the child 
                parent.removeChild(child);
                //decrement count for keeping track the # of children 
                count3--;
                document.getElementById("dummy").innerHTML = "Deleting Query Result";
        }        
       
}

//Creates a queryResult template 
function AddQueryResult2(){
        count3++;
                
        //Output to check if correct 
        var id = count3; 
                 
        //Creates a div for creating a new query 
        var queryResultNew = document.createElement("div");
        queryResultNew.setAttribute("id", count3);
        
        //Creates a text box for the result of the query
        var label = document.createElement("input");
        label.setAttribute("id", 'label' + count3)
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
        
        //Creates a text box for a label for the query result 
        var input = document.createElement("input");
        input.setAttribute("id", 'input' + count3);
        //To make input textbox longer with larger font 
        input.style.width="640px";
        input.style.fontSize="12pt";
        input.style.fontFamily="Times New Roman";
        //restricts the number of characters for the input result to 95
        input.setAttribute("maxLength", '95');

        
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
        
        document.getElementById("reportJSON").innerHTML = document.getElementById('label' + count3).id;
}

function Report_JSON2(){
        //Create a json for the report 
	var report_json = {};
        //Sets the report ID
        report_json.ID = GlobalReportID;
        //Sets the title of the report JSON
        report_json.title = document.getElementById("TitleReport").value;    
        //Create an array JSON for all the query results 
	report_json.queryResults = [];
        //Stores all of the query label and results into the array 
        var x = 0;
        //Iterates all of the query results 
        while(x != count3) {
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
        request.open("POST", "SaveEditReport.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(str_json)
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
				alert(request.responseText);	
			}	
		}	
	}
        
}














