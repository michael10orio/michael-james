<?php 
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    // SQL query
    /* HERE I’ wrote the query for you, but you need to adapt the column and table names to match yours */
    $q = "SELECT ID,Date,From_Client,Convo FROM Green_Convo WHERE To_Client = ? AND From_Client = ?
        UNION 
        SELECT ID,Date,From_Client,Convo FROM Green_Convo WHERE From_Client = ? AND To_Client = ?
        ORDER BY ID";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Prepare input
        $user_current = $_REQUEST['user_current'];
        $user_partner = $_REQUEST['user_partner'];
        //Here it is important to follow the order in the bind_param, be careful to not change things
        $stmt->bind_param("iiii",$user_current,$user_partner,$user_current,$user_partner);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rID,$rDate,$rFrom_Client,$rConvo);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "ID"=>$rID,
                "Date"=>$rDate,
                "From_Client"=>$rFrom_Client,
                "Convo"=>$rConvo
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