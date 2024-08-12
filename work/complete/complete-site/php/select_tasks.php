<?php 
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    $ProjectID = $_REQUEST['ProjectID'];

    // SQL query
    $q = "SELECT ID, Description, Deadline FROM PMTasks 
            WHERE Completed = 0 AND ProjectID = ? 
            ORDER BY Deadline ASC";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Set the user param
        $stmt->bind_param("i",$ProjectID);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rId,$rDescription, $rDeadline);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "ID"=>$rId,
                "Description"=>$rDescription,
                "Deadline"=>$rDeadline
            ];
        }
        
        //Encode JSON
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>