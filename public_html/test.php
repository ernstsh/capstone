<html>
<body>

<p id="demo"></p>

<script>

/*
var obj, dbParam, xmlhttp, myObj, x, text = "";
obj = {"name": "Kyle", "mood": "annoyed"};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();
var str = "x=" + encodeURIComponent(dbParam);

xmlhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
   
   }
}
xmlhttp.open("POST", "save_db.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencode");
xmlhttp.send(str);
console.log(str);
 */

</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script>

var json_data = {
   name : "kyle",
   mood : "annoyed",
}
$.ajax({
   type: "POST",
      url: "save_db.php",
      data: json_data,
      success: function(response) {
         console.log("Success!");
      }

});

</script>

<p>End of test</p>

</body>
</html>
