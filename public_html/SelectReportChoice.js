function GetReports(){
                //Gets the parent template 
                var parentDropDown = document.getElementById("selection");               
                var NumChildren = parentDropDown.length;
                //Deletes the drop down options 
                for(var x = 0; x < NumChildren-1; x++){
                        parentDropDown.removeChild(parentDropDown.lastChild); 
                }
        
                //document.getElementById("dummy").innerHTML = "Getting Reports";
                
                //For sending the javascript variable and for receiving the reports stored in the database 
                var request= new XMLHttpRequest();
                var choice = "Hello";
                request.open("POST", "GetReports.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){                                                                            
                                        //alert(request.responseText);                                                                             
                                        //document.getElementById("dummy3").innerHTML = request.responseText;
                                        
                                        //turns a string of JSON text into a Javascript object 
                                        MultiArray = JSON.parse(request.responseText);
                                        //document.getElementById("dummy3").innerHTML = MultiArray[10][2];
                                        //document.getElementById("dummy3").innerHTML = MultiArray;

                                        
                                        //turns the string report JSON into JSON text 
                                        var json = JSON.parse(MultiArray[1][2]);
                                        //document.getElementById("dummy").innerHTML = json[0].label;
                                        //document.getElementById("dummy2").innerHTML = MultiArray[0][1];
                                        
                                        //Gets the number of report rows 
                                        var length = MultiArray.length;
                                        //alert(length);
                                        //Adds the names of the reports to the dropdown and the id set to the report_id
                                        for(var x = 0; x < length; x++){
                                                
                                                var optionReport = document.createElement("option");
                                                optionReport.setAttribute("id", MultiArray[x][0]);
                                                var textReport = document.createTextNode(MultiArray[x][1]);
                                                //alert(MultiArray[x][1]);
                                                optionReport.appendChild(textReport);
                                                //parentDropDown = document.getElementById("selection");
                                                parentDropDown.appendChild(optionReport);                                           
                                       }                                       
                                }	
                        }	
                }     
}

//Passes the id of the report to the edit_report.php page 
function SaveData(){
        //Gets the report selected and get's its id for pass to the edit_report.php page 
        var ReportDropdown = document.getElementById("selection");
        var choice = ReportDropdown.options[ReportDropdown.selectedIndex].id;
        
        var ReportSelected = {
                ReportID: choice
        };
        ReportSelected = JSON.stringify(ReportSelected);
        ReportSelected = btoa(ReportSelected);
        location.assign("edit_report.php?a=" + ReportSelected);
}