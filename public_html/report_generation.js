
var count = 0;

function AddQuery()
{
        count++;
        
        //Output to check if correct 
        var id = 'query' + count; 
        document.getElementById("dummy").innerHTML = id;
        
//Creates a div for creating a new query 
        var queryNew = document.createElement("div");
        queryNew.setAttribute("id", 'query' + count);
   
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
        var text1 = document.createTextNode("Equals");
        option1.appendChild(text1);
        dropDown3.appendChild(option1);
        //Greater than option 
        var option2 = document.createElement("option");
        var text2 = document.createTextNode("Greater than");
        option2.appendChild(text2);
        dropDown3.appendChild(option2);
        //Less than option
        var option3 = document.createElement("option");
        var text3 = document.createTextNode("Less than");
        option3.appendChild(text3);
        dropDown3.appendChild(option3);      
        //Less than or equal to option
        var option6 = document.createElement("option");
        var text6 = document.createTextNode("Less than or equal to");
        option6.appendChild(text6);
        dropDown3.appendChild(option6); 
        //Greater than or equal to 
        var option7 = document.createElement("option");
        var text7 = document.createTextNode("Greater than or equal to");
        option7.appendChild(text7);
        dropDown3.appendChild(option7); 
        
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
        queryNew.appendChild(dropDown3);
        queryNew.appendChild(button4);
        
        element = document.getElementById("query");
        element.appendChild(queryNew);
       
}


function removeElement(parentDiv, childDiv){
     if (childDiv == parentDiv) 
     {
          alert("The parent div cannot be removed.");
     }
     else if (document.getElementById(childDiv)) 
     {     
          var child = document.getElementById(childDiv);
          var parent = document.getElementById(parentDiv);
          parent.removeChild(child);
          count--;
          document.getElementById("dummy").innerHTML = count;
     }
     else 
     {
          alert("Child div has already been removed or does not exist.");
          return false;
     }
}

function dispQuestions(){
        
}

