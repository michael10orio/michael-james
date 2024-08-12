<?php 
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    $UserID = $_REQUEST['UserID'];

    // SQL query
    $q = "SELECT ID, Title FROM PMProjects 
            WHERE Archived = 0 AND UserID = ? 
            ORDER BY TCreated DESC";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Set the user param
        $stmt->bind_param("i",$UserID);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rId,$rTitle);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "Title"=>$rTitle,
                "ID"=>$rId
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