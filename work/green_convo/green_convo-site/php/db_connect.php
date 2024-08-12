<?php
/*db_connect.php 
	This file is a tiny resource used to connect to the database.
  It is used by all the files in your app
*/

//Connection Information
$host = "localhost";  // always this value
$user = "1929280_Database";    // your student id
$pass = "#MikeConley123";      // your password
$db = "1929280_Database";    // your database

//Establish connection: host, user, password, database
//The connection variable is called $dbi
$dbi = mysqli_connect($host,$user,$pass,$db);
if ($dbi->connect_error) {
    die('Connect Error (' . $dbi->connect_errno . ') ' . $dbi->connect_error);
}
?>