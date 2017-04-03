function DeleteAdmin(){
        //Gets the first name from the input box 
        var FirstName = document.getElementById("FirstName").value;
        //Gets the last name from the input box 
        var LastName = document.getElementById("LastName").value;
        //Gets the user name from the input box 
        var UserName = document.getElementById("UserName").value;
        //Creates a JSON containing the last and first names 
        var admin_json = {};
        admin_json.firstName = FirstName;
        admin_json.lastName = LastName;
        admin_json.userName = UserName;
        //Converts the JSON into a string 
        var str_json = JSON.stringify(admin_json);
 
        //document.getElementById("dummy").innerHTML = str_json;
 
        //Creates an XML request to send the first and last names to PHP to delete the admin 
        var request= new XMLHttpRequest()
        request.open("POST", "DeleteAdmin.php", true)
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