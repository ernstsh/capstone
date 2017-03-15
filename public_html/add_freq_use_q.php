<?php 
$obj = $_POST['x'];
$ar = json_decode($obj);
echo $ar[0]->Q_text;
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "1hvHqfNBEOL6iwL9", "nichokyl-db");
?>
