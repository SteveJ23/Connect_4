<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbName = "myDB";

$conn = new mysqli($servername, $username, $password, $dbName);

$sql = "CREATE TABLE leaderboard (
pkey INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
gameswon INT(3) NOT NULL,
timeplayed INT(10) NOT NULL
)";

if($conn->query($sql)){
	echo "TABLE created success";
}
else{
	echo "Error creating table: " . $conn->error ."<br>";;
}


$conn->close();

?>