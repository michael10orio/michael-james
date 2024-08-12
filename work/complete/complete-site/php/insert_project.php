<?php
//First load the DB connection
require_once("db_connect.php");

if ($dbi) {
    //Build the SQL query
    $Title = $_REQUEST['Title'];
    $Description = $_REQUEST['Description'];
    $UserID = $_REQUEST['UserID']; //contains the logged-in user’s ID from localStorage

    //This is to make sure the task appears as entered and to handle special characters
    $Title = htmlentities($Title,ENT_QUOTES);
    $Description = htmlentities($Description,ENT_QUOTES);

    $q = "INSERT INTO PMProjects (Title,Description,UserID) VALUES (?,?,?)";

    //This should contain 1 when the line is inserted
    $insertedRows = 0;

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("ssi",$Title, $Description,$UserID);
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