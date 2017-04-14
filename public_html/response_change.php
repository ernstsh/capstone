<?php 
$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
$camp = $_POST['x'];
$sql = "SELECT pre, post FROM Camp Where camp_id ='".$camp."'";
if($result = $conn->query($sql)){
   while($obj = $result->fetch_object()){
      $sql2 = "SELECT responder_id, answers, survey_type FROM Response Where survey_id='".$obj->pre."' OR survey_id='".$obj->post."' Group By responder_id";
      if($res = $conn->query($sql2)){
	 while($obj2 = $res->fetch_object()){
	    //return this response
	    $j = array('responder_id'=>$obj2->responder_id, 'answers'=>$obj2->answers, 'survey_type'=>$obj2->survey_type);
	    echo json_encode($j);
	 }
	 $res->close();
      }
}
$conn->close();
?>
