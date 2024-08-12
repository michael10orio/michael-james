<?php
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    //Build the SQL query
    $Description = $_REQUEST['Description'];
    $Deadline = $_REQUEST['Deadline'];
    $ProjectID = $_REQUEST['ProjectID'];

    //This is to make sure the task appears as entered and to handle special characters
    $Description = htmlentities($Description,ENT_QUOTES);

    $q = "INSERT INTO PMTasks (Description, Deadline,ProjectID) VALUES (?,?,?)";

    //This should contain 1 when the line is inserted
    $insertedRows = 0;

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("ssi", $Description, $Deadline,$ProjectID);
        $insertStmt->execute();
        $insertedRows += $insertStmt->affected_rows;
    } else {
        echo "Error";
    }

    //echo($insertedRows);
    $insertStmt->close();
    $dbi->close();
}
// Return to main page
echo "OK: $insertedRows item added";

?>