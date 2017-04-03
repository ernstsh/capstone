
function pop_camp(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[0];
				doc.innerHTML = xmlhttp.responseText;
			}	
		}	
	}
	xmlhttp.open("GET", "get_current_camps.php", false);
	xmlhttp.send();
}

function load_enrollment(value){
	str = "x=" + encodeURIComponent(value);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "load_survey.php", true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var doc = document.getElementsByTagName("SELECT")[1];
				doc.innerHTML = xmlhttp.responseText;
			}
		}	
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(str);
}
