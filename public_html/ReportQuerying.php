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
        
        //Gets the camp ID
        $CampID = $data->CampID;
        //echo $CampID;
        
        //Gets the survey name from JSON
        $SurveyName = $data->SurveyName; 
        //echo $SurveyName;
        $SurveyID;
        $SurveyID2;
        //Check if its both to get both ids 
        if($SurveyName == "Both"){
                $SurveyID = $data->SurveyID;
                $SurveyID2 = $data->SurveyID2;
                //echo $SurveyID;
                //echo $SurveyID2;
        }
        //else its just a pre or a post 
        else{
                $SurveyID = $data->SurveyID;
                //echo $SurveyID;
        }
        
        //JSON object to store pre and post student responses
        class QueryResults{
                //Stores pre results studs 
                public $SurveyResponses;
                //Stores post results of studs
                public $SurveyResponses2;
                //Stores the survey questions for the survey
                public $SurveyQuestions;
        }
        
        //JSON object for student responses
        class Student{
                public $StudentResponses;
                public $FirstName;
                public $LastName;
                public $StudID;
        }
        
        $QueryResults = new QueryResults();
        $StudentResponses = [];
        $StudentResponses2 = [];
        
        //Gets the survey questions
        $sql4 = "SELECT * FROM Survey WHERE survey_id = '$SurveyID'";
        $result4 = mysqli_query($dbc, $sql4);       
        if (mysqli_num_rows($result4) > 0) {
                while($row4 = mysqli_fetch_assoc($result4)) {
                        $QueryResults->SurveyQuestions = $row4['arr_questions'];
                    }
                } 
        else {
               echo "0 results";
        }
        
        
        
        
        $PreSurveyID;
        $PostSurveyID;
        //Get the student responses for both pre and post 
        if($SurveyName == "Both"){
                //Determines which ID is a pre and if the another is the post  
                $sql = "SELECT * FROM Survey WHERE survey_id = '$SurveyID'";
                $result = mysqli_query($dbc, $sql);       
                if (mysqli_num_rows($result) > 0) {
                    while($row = mysqli_fetch_assoc($result)) {
                        $Type = $row['survey_type'];
                        if($Type == 'pre'){
                                $PreSurveyID = $row['survey_id'];
                                $PostSurveyID = $SurveyID2;
                        }
                        else{
                                $PostSurveyID = $row['survey_id'];
                                $PreSurveyID = $SurveyID2;
                        }
                        
                    }
                }

                //Query statement to get all of the student responses for pre survey  
                $sql = "SELECT * FROM Response WHERE survey_id = '$PreSurveyID' AND camp_id = '$CampID'";
                $result = mysqli_query($dbc, $sql);       
                if (mysqli_num_rows($result) > 0) {
                    while($row = mysqli_fetch_assoc($result)) {
                        $Student = new Student();
                        $Student->StudentResponses = $row['answers'];                     
                        $StudentID = $row['responder_id'];                      
                        //Get the names of the students 
                        $sql2 = "SELECT * FROM Responder WHERE responder_id = '$StudentID'";
                        $result2 = mysqli_query($dbc, $sql2);
                        if(mysqli_num_rows($result2) > 0) {                            
                            while($row2 = mysqli_fetch_assoc($result2)){
                                $Student->FirstName = $row2['first_name'];
                                $Student->LastName = $row2['last_name']; 
                                $Student->StudID = $row2['responder_id'];
                            }
                        } 
                        $StudentResponses [] = $Student;
                    }
                } 
                else {
                    echo "0 results";
                }
                $QueryResults->SurveyResponses = $StudentResponses;

                                
                //Query statement for getting all of the student responses for post survey
                $sql3 = "SELECT * FROM Response WHERE survey_id = '$PostSurveyID' AND camp_id = '$CampID'";
                $result2 = mysqli_query($dbc, $sql3);       
                if (mysqli_num_rows($result2) > 0) {
                    while($row = mysqli_fetch_assoc($result2)) {
                        $Student = new Student();
                        $Student->StudentResponses = $row['answers'];                     
                        $StudentID = $row['responder_id'];                      
                        //Get the names of the students 
                        $sql4 = "SELECT * FROM Responder WHERE responder_id = '$StudentID'";
                        $result3 = mysqli_query($dbc, $sql4);
                        if(mysqli_num_rows($result3) > 0) {                            
                            while($row2 = mysqli_fetch_assoc($result3)){
                                $Student->FirstName = $row2['first_name'];
                                $Student->LastName = $row2['last_name']; 
                                $Student->StudID = $row2['responder_id'];
                            }
                        } 
                        $StudentResponses2 [] = $Student;
                    }
                } 
                else {
                    echo "0 results";
                }
                $QueryResults->SurveyResponses2 = $StudentResponses2;             
        }
        
        
        
        //Gets the student responses for pre or post only 
        else{
                //echo "Getting pre or post";
                //Query statement to get all of the student responses 
                $sql = "SELECT * FROM Response WHERE survey_id = '$SurveyID' AND camp_id = '$CampID'";
                $result = mysqli_query($dbc, $sql);       
                if (mysqli_num_rows($result) > 0) {
                    while($row = mysqli_fetch_assoc($result)) {
                        $Student = new Student();
                        $Student->StudentResponses = $row['answers'];                     
                        $StudentID = $row['responder_id'];                      
                        //Get the names of the students 
                        $sql2 = "SELECT * FROM Responder WHERE responder_id = '$StudentID'";
                        $result2 = mysqli_query($dbc, $sql2);
                        if(mysqli_num_rows($result2) > 0) {                            
                            while($row2 = mysqli_fetch_assoc($result2)){
                                $Student->FirstName = $row2['first_name'];
                                $Student->LastName = $row2['last_name']; 
                                $Student->StudID = $row2['responder_id'];
                            }
                        } 
                        $StudentResponses [] = $Student;
                    }
                } 
                else {
                    echo "0 results";
                }
                $QueryResults->SurveyResponses = $StudentResponses;
        }
        echo json_encode($QueryResults);

        //closes the database connection  
	mysqli_close($dbc);                 
?>


