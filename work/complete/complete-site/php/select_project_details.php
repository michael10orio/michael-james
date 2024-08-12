<?php 
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    $ProjectID = $_REQUEST['ProjectID'];

    // SQL query
    $q = "SELECT Title, Description FROM PMProjects 
            WHERE Archived = 0 AND ID = ?";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Set the user param
        $stmt->bind_param("i",$ProjectID);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rTitle, $rDescription);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "Title"=>$rTitle,
                "Description"=>$rDescription
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