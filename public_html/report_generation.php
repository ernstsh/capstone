<script>
var count = 0;
</script>

<html>
<head>
</head>
<body>
<div class="query" id="query">
        <!--<button type="button" class="question">Select question</button>
        <button type="button" class="operator">Select operator</button>
        <button type="button" class="operand">Select operand</button>
        <button type="button" class="delete">-</button>
        <button type="button" class="add">+</button>-->
        <button type="button" class="addQuery" id="addQuery">Add Query</button>
</div>
<!--<button type="button" class="NewCondition">Insert New Condition</button>-->
</body>
<p id="dummy"></p>

</html>
<script>




var count = 0;
document.getElementById("addQuery").onclick = function(){AddQuery()};


/*var x;
for(x = 0; x < count; count++)
{
        var id = 'query' + x;
        document.getElementById(id).onclick = function{removeElement('query', id)}
}*/


function AddQuery()
{
        count++;
        
        //Output to check if correct 
        var id = 'query' + count; 
        document.getElementById("dummy").innerHTML = id;
        
        var queryNew = document.createElement("div");
        queryNew.setAttribute("id", 'query' + count);
   
        var button1 = document.createElement("button");
        var text1 = document.createTextNode("Select question");
        button1.appendChild(text1);

        var button2 = document.createElement("button");
        var text2 = document.createTextNode("Select operator");
        button2.appendChild(text2);

        var button3 = document.createElement("button");
        var text3 = document.createTextNode("Select operand");
        button3.appendChild(text3);

        var button4 = document.createElement("button");
        
        button4.onclick = function(){removeElement('query', id);}
        var text4 = document.createTextNode("-");
        button4.appendChild(text4);

        var button5 = document.createElement("button");
        var text5 = document.createTextNode("+");
        button5.appendChild(text5);
        
        

        queryNew.appendChild(button1);
        queryNew.appendChild(button2);
        queryNew.appendChild(button3);
        queryNew.appendChild(button4);
        queryNew.appendChild(button5);


        element = document.getElementById("query");
        element.appendChild(queryNew);
        //element.insertBefore(queryNew, element);
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
</script>