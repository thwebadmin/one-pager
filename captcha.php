<?php 
session_start(); 
//echo "saisaisia";
$text = rand(10000,99999); 
$_SESSION["vercode"] = $text; 
$height = 30; 
$width = 70; 
  
$image_p = imagecreate($width, $height); 
$black = imagecolorallocate($image_p, 0, 0, 0); 
$white = imagecolorallocate($image_p, 255, 255, 255); 
$font_size = 20; 
  
imagestring($image_p, $font_size, 5, 5, $text, $white); 
imagejpeg($image_p, null, 80); 
print_r($_SESSION);
?>
