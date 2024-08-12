<?php 
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    // SQL query
    $q = "SELECT Alias FROM Green_Convo_Clients WHERE ID = ?"; //Write a query to get the Alias of a user by providing the id

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Prepare input
        $ID = $_REQUEST['ID'];
        $stmt->bind_param("i",$ID);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rAlias);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "Alias"=>$rAlias
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