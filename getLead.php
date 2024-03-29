<?php


class LeaderBoard implements JsonSerializable{
	public $uName;
	public $gWon;
	public $tPlayed;


	   public function jsonSerialize() {//json names on the left, php names on the right.
        return [
         'username' => $this->uName,
         'gameswon' => $this->gWon,
         'timeplayed' => $this->tPlayed,
 
         
            ];
    }


}



$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT COUNT(*) AS Total FROM leaderboard";
	$result = $conn->query($sql);
	$total = $result->fetch_assoc();
	$total = $total["Total"];




	$sql = "SELECT * FROM `leaderboard`";
	 $result = $conn->query($sql);
	 //$players = $result->fetch_assoc();
	 $lead = mysqli_fetch_all($result, MYSQLI_ASSOC);
	 //print_r($players);
	 $lead2 = array();
	 for($i=0;$i<$total;$i++){
	 	$row = $lead[$i];
	 	$newLead = new LeaderBoard();
	 	$newLead->uName = ($row["username"]);
		$newLead->gWon = ($row["gameswon"]);
		$newLead->tPlayed = ($row["timeplayed"]);
		array_push($lead2, $newLead);

	 }

echo json_encode($lead2);

?>