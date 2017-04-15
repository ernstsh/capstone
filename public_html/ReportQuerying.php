<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $str_json = file_get_contents('php://input');
      
        //echo "We got: ".$str_json."\n";
        
        
        $data = json_decode($str_json); 
               
        //Gets the survey ID from the JSON
        $SurveyID = json_encode($data->SurveyID);      
        $SurveyID = json_decode($SurveyID);
        
        //Gets the camp ID from the JSON 
        $CampID = json_encode($data->CampID);
        $CampID = json_decode($CampID);
       
        //JSON object to store the survey questions and student responses
        class QueryResults{              
                public $StudentResponses;
        }
        $Q = new QueryResults();
       
       
        //Array to store the student responses
        $StudentResponses = [];
        $count = 0;
        //Query statement to get all of the student responses 
        $sql2 = "SELECT * FROM Response WHERE survey_id = '$SurveyID' AND camp_id = '$CampID'";
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



//This is the version that filters using demographic info, but we need databse entrys to test it in the tables 
<?php
	session_start();
	//information needed for making the database connection
	$dbhost = 'oniddb.cws.oregonstate.edu';
	$dbname = 'nichokyl-db';
	$dbuser = 'nichokyl-db';
	$dbpass = 'ZlpiHLTMmA44Z0tg';
        
	//Create a connection to the database
	$dbc = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
        $str_json = file_get_contents('php://input');
      
        //echo "We got: ".$str_json."\n";
        
        
        $data = json_decode($str_json); 
        $SurveyID = $data->SurveyID;
        $CampID = $data->CampID;
        $SurveyType = $data->SurveyType;
        $Gender = $data->Gender;
        $ParentEducation = $data->ParentEducation;
        $Race = $data->Race;
        $Ethnicity = $data->Ethnicity;
        $LunchOption = $data->LunchOption;
        
        //Query for getting the responder IDs that match demographic info + campID + surveyID
        $sql = "SELECT * FROM Responder WHERE survey_id = '$SurveyID' AND camp_id = '$CampID' 
                                             AND gender='$Gender' AND race='$Race' AND ethnicity='$Ethnicity'
                                             AND lunch_status='$LunchOption' AND highest_education='ParentEducation'";
        //Array for storing the IDs
        $StudentIDs = [];  
        $result = mysqli_query($dbc, $sql);       
        if (mysqli_num_rows($result2) > 0) {
            while($row = mysqli_fetch_assoc($result2)) {
                //$count = $count + 1;
                $StudentIDs[] = $row['responder_id'];
                //echo $row2['answers'];
                
            }
        } 
        else {
            echo "0 results";
        }
       
        //JSON object to store the survey questions and student responses
        class QueryResults{              
                public $StudentResponses;
        }
        $Q = new QueryResults();
       
       
        //Array to store the student responses
        $StudentResponses = [];
        $count = 0;
        //Query statement to get all of the student responses 
        $sql2 = "SELECT * FROM Response WHERE survey_id = '$SurveyID' AND camp_id = '$CampID'";
        $result2 = mysqli_query($dbc, $sql2);       
        if (mysqli_num_rows($result2) > 0) {
            while($row2 = mysqli_fetch_assoc($result2)) {
                //If student ID is in the group of IDs get responses 
                if(in_array($row2['responder_id'], $StudentIDs){
                        $StudentResponses[] = $row2['answers'];
                }             
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
