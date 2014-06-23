<?php


include "config.php"; 
//connect to DB
$dbhandle = mysql_connect($server, $dbuser, $dbpassword) 
 or die("Unable to connect to MySQL");
$limit = $_POST['records'];
//select a database to work with
$selected = mysql_select_db($dbname,$dbhandle) 
  or die("Could not select examples");
if($limit == 4){
//execute the SQL query and return records
$result = mysql_query("SELECT * FROM node WHERE type = 'news' ORDER BY created DESC LIMIT $limit");

//fetch tha data from the database 
$string = '<div class="container ">
	 <h2 class="text-center ">News & Events</h2>
		<ul>';
while ($row = mysql_fetch_array($result)) {
	//display the results
$timestamp=$row{'created'};
$dbid = $row{'vid'};
$type = $row{'type'};
	$string .= "<li><a href='Details.html?dbid=$dbid&type=$type' target=\"_blank\">".$row{'title'}."</a><div class='date'>- ".date('jS F Y', $timestamp)."</div> 
          </li>";
}
$string .= ' </ul><input type="button" value="MORE" class="btn" id="newsMoreBtn" onClick="window.open(\'th-news.html\',\'_blank\')" /><p class=" caption text-right"><a href="#" class="scroll-top back-to-top">&uarr;</a></p> </div>';
echo $string;
return;
}

//execute the SQL query and return records
$result = mysql_query("SELECT * FROM node WHERE type = 'news' ORDER BY created DESC LIMIT 20");

//fetch tha data from the database 
$string = '<div class="container">
	 <h2 class="">News & Events</h2>
		<ul>';
while ($row = mysql_fetch_array($result)) {
	//display the results
$timestamp=$row{'created'};
$dbid = $row{'vid'};
$type = $row{'type'};
	$string .= "<li><a href='Details.html?dbid=$dbid&type=$type'>".$row{'title'}."</a><div class='date'>- ".date('jS F Y', $timestamp)."</div> 
          </li>";
}
$string .= ' </ul></div>';
echo $string;

//close the connection
mysql_close($dbhandle);

?>
