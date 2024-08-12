<?php
//First load the DB connection
require_once("db_connect.php");

/*//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
if ($dbi) {
    $User = $_REQUEST['User'];
    $Pass = $_REQUEST['Pass'];

    $q = "INSERT INTO PMUsers (User, Pass) VALUES (?,?)";

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("ss", $User, $Pass);
        $insertStmt->execute();

        //Get new user’s ID
        $rArray[] = [
            "ID"=>$insertStmt->insert_id
        ];

        echo json_encode($rArray);

    } else {
        echo "Error";
    }

    $insertStmt->close();
    $dbi->close();
}

?>