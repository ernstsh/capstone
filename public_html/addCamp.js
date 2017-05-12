function Update(){
	var camp_json = {};   
         //Gets the selected camp from 1st drop down
        var CampDrop = document.getElementById("select1");
        var CampID = CampDrop.options[CampDrop.selectedIndex].value; 
        camp_json.CampID = CampID;
        camp_json.Enrollment = document.getElementsByName("enrollment").value;
        
        camp_json.Name = document.getElementById("campName").value;
        camp_json.StartDate = document.getElementById("startDate").value;
        camp_json.EndDate = document.getElementById("endDate").value;
        var str_json = JSON.stringify(camp_json);       
	str_json = "x=" + encodeURIComponent(str_json);
        var request= new XMLHttpRequest();
        request.open("POST", "UpdateCamp.php", true);
        request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200){
//                                alert(request.responseText);
			}	
		}	
	}
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(str_json);
}
