<?php
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    //Build the SQL query
    $ID = $_REQUEST['TaskID'];

    $q = "UPDATE PMTasks SET Completed = 1, TCompleted = NOW() WHERE ID = ?";

    //prepare statement, execute, store_result
    if ($updateStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $updateStmt->bind_param("i", $ID);
        $updateStmt->execute();
//        $updatedRows += $updateStmt->affected_rows;
    } else {
        echo "Error";
    }

    //echo($updatedRows);
    $updateStmt->close();
    $dbi->close();
}
// Return to main page
echo "OK: item updated";

?>