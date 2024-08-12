<?php
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    //Build the SQL query
    $Convo = $_REQUEST['Convo'];
    $user_current = $_REQUEST['user_current'];
    $user_partner= $_REQUEST['user_partner'];

    //This is to make sure the message appears as entered
    $Convo = htmlentities($Convo,ENT_QUOTES);

    $q = "INSERT INTO Green_Convo (Convo, From_Client, To_Client) VALUES (?,?,?)"; // Write a query to add a message from user_current to user_partner

    //This should contain 1 when the line is inserted
    $insertedRows = 0;

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("sii", $Convo, $user_current, $user_partner);
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