<?php


include "config.php"; 

//connect to DB
$dbhandle = mysql_connect($server, $dbuser, $dbpassword) 
 or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db($dbname,$dbhandle) 
  or die("Could not select examples");
$limit = $_POST['records'];
//execute the SQL query and return records
if($limit == 2){
$result = mysql_query("SELECT * FROM node WHERE type = 'blog' ORDER BY created DESC LIMIT $limit");

//fetch tha data from the database 
$string = '<p><strong>Blogs</strong></p>
                 <hr>';
while ($row = mysql_fetch_array($result)) {
	//display the results
$timestamp=$row{'created'};
$dbid = $row{'vid'};
$type = $row{'type'};
	$string .= "<div class='list'>
                    <a href='Details.html?dbid=$dbid&type=$type' target=\"_blank\">".htmlentities($row{'title'})."</a>
                    <br><span class=''>".date('jS F Y', $timestamp)."</span>
		    </div>";
}
$string .= '<input type="button" value="MORE" class="btn" id="newsMoreBtn" onClick="window.open(\'th-blog.html\',\'_blank\')" />';
echo $string;
//close the connection
mysql_close($dbhandle);
}
else {
mysql_set_charset("UTF8");
$result = mysql_query("SELECT * FROM node WHERE type = 'blog' ORDER BY created DESC LIMIT 20");

//fetch tha data from the database 
$string = '<h2 class="">Blogs</h2>
                <ul>';
while ($row = mysql_fetch_array($result)) {
	//display the results
$timestamp=$row{'created'};
$dbid = $row{'vid'};
$type = $row{'type'};
	$string .= "<li>
                    <a href='Details.html?dbid=$dbid&type=$type'>".htmlspecialchars($row{'title'})."</a>
                    <div class='date'>- ".date('jS F Y', $timestamp)."</div>
                  </li>";
}
$string.="</ul>";
echo $string;
//close the connection
mysql_close($dbhandle);
}
?>


