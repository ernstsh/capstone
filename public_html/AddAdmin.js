function AddAdmin(){
        //Gets the first name, last name, user name, and password from input fields  
        var FirstName = document.getElementById("firstName").value;
        var LastName = document.getElementById("lastName").value;
        var UserName = document.getElementById("userName").value;
        var Password = document.getElementById("password").value;
        
        //Creates a JSON containing the input field info 
        var admin_json = {};
        admin_json.firstName = FirstName;
        admin_json.lastName = LastName;
        admin_json.userName = UserName;
        admin_json.passWord = Password;
        
        //Converts the JSON into a string 
        var str_json = JSON.stringify(admin_json);
  
        //Creates an XML request to send the first and last names to PHP to delete the admin 
        var request= new XMLHttpRequest()
        request.open("POST", "AddAdmin.php", true)
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