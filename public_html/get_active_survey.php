<?php 

	$conn = new mysqli("oniddb.cws.oregonstate.edu", "nichokyl-db", "ZlpiHLTMmA44Z0tg", "nichokyl-db");
	$camp = $_POST['x'];
	$sql = "SELECT end_date FROM Camp Where camp_id='".$camp."'";
	if($result = $conn->query($sql)){
		while($obj = $result->fetch_object()){
			if($obj->end_date > date('Y-m-d')){
				$sql2 = "SELECT pre FROM Camp Where camp_id='".$camp."'";
				if($res = $conn->query($sql2)){
					while($obj2 = $res->fetch_object()){
						$sql3 = "SELECT * FROM Survey Where survey_id='".$obj2->pre."'";
						if($r = $conn->query($sql3)){
							while($obj3 = $r->fetch_object()){
								$j = array('survey_id'=>$obj3->survey_id, 'title' => $obj3->title, 'questions' => $obj3->arr_questions, 'type' => $obj3->survey_type);
								echo json_encode($j); 
							}
							$r->close();
						}
					}
					$res->close();
				}
			}
			else {
				$sql2 = "SELECT post FROM Camp Where camp_id='".$camp."'";
				if($res = $conn->query($sql2)){
					while($obj2 = $res->fetch_object()){
						$sql3 = "SELECT * FROM Survey Where survey_id='".$obj2->post."'";
						if($r = $conn->query($sql3)){
							while($obj3 = $r->fetch_object()){
								$j = array('survey_id'=>$obj3->survey_id, 'title' => $obj3->title, 'questions' => $obj3->arr_questions, 'type' => $obj3->survey_type);
								echo json_encode($j); 
							}
							$r->close();
						}
					}
					$res->close();
				}
			}
		}
		$result->close();
	}

$conn->close();
?>
