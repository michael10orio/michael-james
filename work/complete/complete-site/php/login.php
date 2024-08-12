<?php

//Libraries
require_once("db_connect.php");

    if ($dbi) {
        $User = $_REQUEST['User'];
        $Pass = $_REQUEST['Pass'];


        // SQL query
        $q = "SELECT ID FROM PMUsers WHERE User = ? AND Pass = ?";

        // Array to translate to json
        $rArray = array();

        if ($stmt = $dbi->prepare($q)) {
            //Prepare input
            $stmt->bind_param("ss",$User,$Pass);

            //Prepare output
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($rId);

            //Collect results
            while($r = $stmt->fetch()) {
                $rArray[] = [
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
    else {
        echo "Connection Error: " . mysqli_connect_error();
    }
    mysqli_close($dbi);

?>
