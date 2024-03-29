<?php

$user = $_GET["username"];
$time = $_GET["timeplayed"];


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myDB";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 


$sql1 = "UPDATE leaderboard SET gameswon = gameswon+1, timeplayed = timeplayed + $time WHERE username = '$user'";

mysqli_query($conn, $sql1);

if(mysqli_affected_rows($conn) == 0){ //no update create the 
	$stmt = $conn->prepare("INSERT INTO leaderboard (username, gameswon, timeplayed) VALUES (?,?,?)");

	if ($stmt==FALSE) {
    echo "There is a problem with prepare <br>";
    echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
	}
	$stmt->bind_param("sii", $useName, $gWon, $tPlayed);
	$useName = $user;
	$gWon = 1;
	$tPlayed = $time;
	$stmt->execute();
	 $stmt->close();



}


$conn->close();

?>