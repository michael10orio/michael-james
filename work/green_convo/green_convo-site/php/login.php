<?php 
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    // SQL query
    $q = "SELECT ID, Alias FROM Green_Convo_Clients WHERE Name = ? AND Password = ?";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        //Prepare input
        $Name = $_REQUEST['Name'];
        $Password = $_REQUEST['Password'];
        $stmt->bind_param("ss",$Name,$Password);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rID,$rAlias);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "ID"=>$rID,
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

    /*UPDATE the last login of the user
        This is simple UPDATE query, so the code is quite compact.
        We use the $rId which contains the ID of the user who just logged in, (from up there, line 26)
        and set the last column to the current time.
    */
    $dbi->query("UPDATE Green_Convo_Clients SET LastLogin = CURRENT_TIMESTAMP WHERE ID = $rID");
    /* For reference, I have included here what this would look like with a prepared statement:
    $qu = "UPDATE chat_users SET last = CURRENT_TIMESTAMP WHERE id = ?";
    if ($stmtu = $dbi->prepare($qu)) {
        $stmtu->bind_param("i",$rId);
        $stmtu->execute();
        $stmtu->close();
    }*/
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>