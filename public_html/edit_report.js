//This section of code generates the report that was selected 
function GenSavedReport() {
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
        ReportSelected = ReportSelected[0].replace("a=", "");
        ReportSelected = atob(ReportSelected);
        ReportSelected = JSON.parse(ReportSelected);
        var ReportChoice = ReportSelected.ReportID;
        //Sets the global variable SavedReportID in report_generation.js to the ID of report that was selected 
        SavedReportID =  ReportChoice;         
        //For sending the javascript variable for getting the JSON of the report that was selected 
        var request= new XMLHttpRequest();
                request.open("POST", "GetReportSelected.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(ReportChoice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){                                                                            
                                        var ReportJSON = JSON.parse(request.responseText);
                                        var queries = JSON.parse(ReportJSON.arr_results);
                                        for(var x = 0; x < queries.length; x++){
                                                //Note: AddQueryResult and GenTableQuery are functions located in report_generation.js file 
                                                if(queries[x].type == "Multi"){
                                                        AddQueryResult(queries[x].result, "None", 0, queries[x].label);
                                                }
                                                else{
                                                        GenTableQuery(queries[x]);
                                                }
                                        } 
                                        //Sets the report title and removes the double quotes 
                                        var ReportTitle = ReportJSON.title;
                                        ReportTitle = ReportTitle.replace(/["]+/g, '');
                                        document.getElementById("TitleReport").value = ReportTitle;
                                }	
                        }                               
                }
                //Fills the drop down for selecting a camp Note:GetCamps is a function located in report_generation.js
                GetCamps();
    }   
};