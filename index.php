<?php
// Initialize the session
session_start();
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
  header("location: login_mysql.php");
  exit;
}
?>
<!DOCTYPE html>
<html>


<head>
	<link rel = "stylesheet" href = "index.css">
</head>

<body>


<div class = "logo"><img src = "fsImage.png"></div>

<h1 id = "loggedIn">Hi, <b><?php echo $_SESSION['username']; ?></b>. Welcome to this site.</h1>
<section class = "menu">

	<h1 id = "c4">Connect 4</h1>
	<ul>
		<li><a href = "connect4.html">Play Game</a></li>
		<li><a href = "help.html">Help Page</a></li>
		<li><a href = "contact.html">Contact Page</a></li>
		<li><a href = "logout_mysql.php">Logout</a></li>
		<li><a href = "leaderboard.html">Leader Board</a></li>


	</ul>





</section>



</body>





</html>