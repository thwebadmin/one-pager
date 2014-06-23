<?php


include "config.php"; 
//connect to DB
$dbhandle = mysql_connect($server, $dbuser, $dbpassword) 
 or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db($dbname,$dbhandle) 
  or die("Could not select examples");
$type = 'blog';
$id = 95;

//execute the SQL query and return records
$result = mysql_query("SELECT * FROM field_data_body WHERE revision_id=$id");
$row = mysql_fetch_array($result);
$matter = $row{'body_value'};
//$matter = htmlspecialchars($matter);
function normalize_str($matter)
{
$invalid = array('Š'=>'S', 'š'=>'s', 'Đ'=>'Dj', 'đ'=>'dj', 'Ž'=>'Z', 'ž'=>'z',
'Č'=>'C', 'č'=>'c', 'Ć'=>'C', 'ć'=>'c', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A',
'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E',
'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O',
'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y',
'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a',
'æ'=>'a', 'ç'=>'c', 'è'=>'e', 'é'=>'e', 'ê'=>'e',  'ë'=>'e', 'ì'=>'i', 'í'=>'i',
'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y',  'ý'=>'y', 'þ'=>'b',
'ÿ'=>'y', 'Ŕ'=>'R', 'ŕ'=>'r', "`" => "'", "´" => "'", "„" => ",", "`" => "'",
"´" => "'", "“" => "\"", "”" => "\"", "´" => "'", "&acirc;€™" => "'", "{" => "",
"~" => "", "–" => "-", "’" => "'");

$matter = str_replace(array_keys($invalid), array_values($invalid), $matter);

return $matter;
}
$resultNode = mysql_query("SELECT * FROM node WHERE vid=$id");
$rowNode = mysql_fetch_array($resultNode);
$text = $rowNode{'title'};
$string = "<div ><h3>$text</h3></div><br>";
//fetch tha data from the database 
//$matter = preg_replace("'", '&rsquo;', $matter);
//$matter = htmlspecialchars($matter);
$matter = html_entity_decode($matter);
$string .= $matter;
echo $string;
//close the connection
mysql_close($dbhandle);

?>
