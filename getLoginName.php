<?php
session_start();
$logName = "";
if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
  $logName = "noLogin";
  //header("location: login_mysql.php");
  //exit;
}
else{
	$logName = $_SESSION['username'];
}

echo $logName;


?>