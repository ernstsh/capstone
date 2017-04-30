function GetReports(){
                //Gets the parent template 
                var parentDropDown = document.getElementById("selection");               
                var NumChildren = parentDropDown.length;
                //Deletes the drop down options 
                for(var x = 0; x < NumChildren-1; x++){
                        parentDropDown.removeChild(parentDropDown.lastChild); 
                }                
                //For sending the javascript variable and for receiving the reports stored in the database 
                var request= new XMLHttpRequest();
                var choice = "Hello";
                request.open("POST", "GetReports.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){                                                                                                                 
                                        var MultiArray = JSON.parse(request.responseText);                                      
                                        //Adds the names of the reports to the dropdown and the id set to the report_id
                                        for(var x = 0; x < MultiArray.length; x++){                                               
                                                var optionReport = document.createElement("option");
                                                optionReport.setAttribute("id", MultiArray[x][0]);
                                                var textReport = document.createTextNode(MultiArray[x][1]);
                                                optionReport.appendChild(textReport);
                                                parentDropDown.appendChild(optionReport);                                           
                                       }                                       
                                }	
                        }	
                }     
}

//Passes the id of the report to the edit_report.php page 
function SaveData(){
        //Gets the report selected and get's its id for passins it to the edit_report.php page 
        var ReportDropdown = document.getElementById("selection");
        var choice = ReportDropdown.options[ReportDropdown.selectedIndex].id;
        
        var ReportSelected = {
                ReportID: choice
        };
        ReportSelected = JSON.stringify(ReportSelected);
        ReportSelected = btoa(ReportSelected);
        location.assign("edit_report.php?a=" + ReportSelected);
}