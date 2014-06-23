<?php


include "config.php"; 
//connect to DB
$dbhandle = mysql_connect($server, $dbuser, $dbpassword) 
 or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db($dbname,$dbhandle) 
  or die("Could not select examples");
$type = $_POST['type'];
$id = $_POST['dbid'];

//execute the SQL query and return records
$result = mysql_query("SELECT * FROM field_data_body WHERE revision_id=$id");
$row = mysql_fetch_array($result);
$matter = $row{'body_value'};
$resultNode = mysql_query("SELECT * FROM node WHERE vid=$id");
$rowNode = mysql_fetch_array($resultNode);
$text = $rowNode{'title'};
$string = "<div ><h3>$text</h3></div><br>";
//fetch tha data from the database 
$string .= $matter;
echo $string;
//close the connection
mysql_close($dbhandle);

?>
