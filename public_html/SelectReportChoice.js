function GetReports(){
                document.getElementById("dummy").innerHTML = "Getting Reports";
                //For sending the javascript variable and for receiving the reports stored in the database 
                var request= new XMLHttpRequest();
                var choice = "Hello";
                request.open("POST", "GetReports.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(choice);
                request.onreadystatechange=function(){
                        if(request.readyState == 4){
                                if(request.status == 200){                                                                            
                                        alert(request.responseText);
                                      
                                        document.getElementById("dummy").innerHTML = request.responseText;
                                        MultiArray = JSON.parse(request.responseText);
                                        document.getElementById("dummy").innerHTML = MultiArray[10][2];
                                        var json = JSON.parse(MultiArray[10][2]);
                                        document.getElementById("dummy").innerHTML = json[0].label;
                                        
                                }	
                        }	
                }     
}