<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $jsonObj = file_get_contents('php://input');
      
        //echo "We got: ".$jsonObj."\n";
        $jsonObj = json_decode($jsonObj);
        $SurveyID = json_decode($jsonObj->survey_id);
        //echo $SurveyID;
        $CampdID = json_decode($jsonObj->camp_id);
        //echo $CampdID;
        
        
        //$IDs = json_decode($jsonObj); 
               
        //Gets the survey ID from the json 
        //$SurveyID = json_encode($data->SurveyID);      
        //$SurveyID = json_decode($SurveyID);
      
        //JSON object to store the survey questions and student responses
        class QueryResults{
                //public $Survey;
                public $StudentResponses;
        }
        $Q = new QueryResults();
       
        
        //Query statement for getting the survey questions        
        /*$sql = "SELECT * FROM Survey WHERE survey_id='$SurveyID'";
        $result = mysqli_query($dbc, $sql);

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                //echo $row['arr_questions'];
                $Q->Survey = $row['arr_questions'];
            }
        } 
        else {
            echo "0 results";
        }*/
   
        //Array to store the student responses
        $StudentResponses = [];
        $count = 0;
        //Query statement to get all of the student responses 
        $sql2 = "SELECT * FROM Response WHERE survey_id='$SurveyID' AND camp_id='$CampdID'";
        $result2 = mysqli_query($dbc, $sql2);       
        if (mysqli_num_rows($result2) > 0) {
            while($row2 = mysqli_fetch_assoc($result2)) {
                //$count = $count + 1;
                $StudentResponses[] = $row2['answers'];
                //echo $row2['answers'];
                
            }
        } 
        else {
            echo "0 results";
        }
        $Q->StudentResponses = $StudentResponses;
        echo json_encode($Q);

        
        
        //closes the database connection  
	mysqli_close($dbc);
                             
?>