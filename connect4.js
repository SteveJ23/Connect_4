

var playerOne = 1; //player red
var playerTwo = 2; //player yellow
var currentP = playerOne;
var prevP = playerTwo;
var gameWon = false;
var gameBoard;
var rows = 6;
var cols = 7;
var grav; //array that will help push the pieces all the way down
var hint = 0; // 0 off, 1 on.
var startTime = 0;
var loginName = "";
checkIfLogin();
var winGame = 0;
var gameLast;



window.onload = function(){
	createGame();
}

function createGame(){ // initiate the board with 0's
	startTime = new Date();
	currentP = 1;//start with player1.
	let gb = document.getElementById("gameboard");
	gb.style.height = "500px";
	gb.style.width = "590px";
	rows = 6;
	cols = 7;
	gameBoard = [];
	document.getElementById('gameboard').innerHTML = "";
	document.getElementById('winner').innerHTML = "";
	grav = [5,5,5,5,5,5,5]; //Start at the lowest row of the matrix, bottom row, 5 represents is each column, (0,5), (1,5), ect..;
	for(let i = 0; i < rows; ++i){
		let row = [];
		for(let y = 0; y < cols; ++y){
			row.push(0);
			let hole = document.createElement("div");
			hole.id = i.toString() + "," + y.toString(); //create sections for each hole and give them an ID correspoding to the row and column they are in
			hole.classList.add("holes");
			hole.addEventListener("click", placeDown);
			document.getElementById("gameboard").append(hole); //dynamically create the sections for the holes.

		}
		gameBoard.push(row); //fill with 0s.

	}
	

}


function placeDown(){
	if(gameWon){
		return;
	}


	let c = this.id.split(",");
	let y = parseInt(c[1]);//column

	if(grav[y] == -1){
		return;
	}
	let x = grav[y]; //lowest row available;
	grav[y] = grav[y]-1;
	gameBoard[x][y] = currentP;
	prevP = currentP; //this is for a later function, checkwin, since currentP is being updated.
	let hole = document.getElementById(x + "," + y);
	if(currentP == 1){ //player1
		hole.classList.add("playerOneP");
		hole.classList.remove("gameHint");
		changeColor();
		currentP = 2;
	}
	else{//player2
		hole.classList.add("playerTwoP");
		hole.classList.remove("gameHint");
		changeColor();
		currentP = 1;
	}
	
	checkWin(x, y);


	changeColor();
}


function checkWin(x,y){ //x and y are the points we are checking from
	//check all directions except up

	let count1 = 1; //this is to count how many in a row; start at 1. 5 directions
	let count2 = 1; //right
	let count3 = 1; //diagnaly right
	let count4 = 1; //diagnaly left
	let count5 = 1; //left
	let count6 = 1;
	let count7 = 1;
	let x2 = x;
	let y2 = y;
	let win = false;

	while(x2 != rows-1 && gameBoard[x2+1][y2] == prevP){ //down direction
		count1 = count1+1;
		if(count1 == 4){
			win = true;
		}
		x2 = x2+1;
	}
	x2 = x;

	while(y2 != cols-1 && gameBoard[x2][y2+1] == prevP){ //right direction
		count2 = count2+1;
		if(count2 == 4){
			win = true;
		}
		y2 = y2+1;
		if(count2 == 3){
			if(y2 != cols-1 && hint == 1 && gameBoard[x2][y2+1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint(x2, (y2+1)); //x2 and y2 are the destination to add hint;
			}
		}


	}

	y2 = y
	while(y2 != cols-1 && x2 != 0 && gameBoard[x2-1][y2+1] == prevP){ //diagnally right
		count3 = count3+1;
		if(count3 == 4){
			win = true;
		}
		x2 = x2-1;
		y2 = y2+1;

		if(count3 == 3){
			if(y2 != cols-1 && x2 != 0 && hint == 1 && gameBoard[x2-1][y2+1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint((x2-1), (y2+1)); //x2 and y2 are the destination to add hint;
			}
		}

	}
	x2 = x;
	y2 = y;
	while(y2 != 0 && x2 != 0 && gameBoard[x2-1][y2-1] == prevP){ //diagnally left
		count4 = count4+1;
		if(count4 == 4){
			win = true;
		}
		x2 = x2-1;
		y2 = y2-1;

		if(count4 == 3){
			if(y2 != 0 && x2 != 0 && hint == 1 && gameBoard[x2-1][y2-1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint((x2-1), (y2-1)); //x2 and y2 are the destination to add hint;
			}
		}

	}

	x2 = x;
	y2 = y;


	while(y2 != 0 && gameBoard[x2][y2-1] == prevP){ //left direction
		count5 = count5+1;
		if(count5 == 4){
			win = true;
		}
		y2 = y2-1;
		if(count5 == 3){
			if(y2 != 0 && hint == 1 && gameBoard[x2][y2-1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint(x2, (y2-1)); //x2 and y2 are the destination to add hint;
			}
		}
	}


	while(y2 != 0 && x2 != rows-1 && gameBoard[x2+1][y2-1] == prevP){ //diagnally down left
		count6 = count6+1;
		if(count6 == 4){
			win = true;
		}
		x2 = x2+1;
		y2 = y2-1;
		if(count6 == 3){
			if(y2 != 0 && x2 != rows-1 && hint == 1 && gameBoard[x2+1][y2-1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint((x2+1), (y2-1)); //x2 and y2 are the destination to add hint;
			}
		}

	}



	while(y2 != cols-1 && x2 != rows-1 && gameBoard[x2+1][y2+1] == prevP){ //diagnally down right
		count7 = count7+1;
		if(count7 == 4){
			win = true;
		}
		x2 = x2+1;
		y2 = y2+1;

		if(count7 == 3){
			if(y2 != cols-1 && x2 != rows-1 && hint == 1 && gameBoard[x2+1][y2+1] == 0){ //check next box to see if its empty, if it is than add hint;
			addHint((x2+1), (y2+1)); //x2 and y2 are the destination to add hint;
			}
		}

	}

	if(win == true){
		let winnerOfGame;
		
		if(prevP == 1){
			winGame = 1;
			if(loginName == "" || loginName == "noLogin" ){
				winnerOfGame = "Player One";
			}
			else{
				winnerOfGame = loginName;
				
			}
			

		}
		else{
			winnerOfGame = "Player Two";
			winGame = 2;
		}

		//alert(prevP + " has won the game!");

		let endTime = new Date();
		let tempT = (endTime.getSeconds() - startTime.getSeconds());
		if(tempT < 0){
			tempT = 60+tempT;

		}
		let gameLasted = (endTime.getMinutes() - startTime.getMinutes()) + " Minutes and "   + tempT + " Seconds" ;
		document.getElementById('winner').innerHTML = winnerOfGame + " has won the game! <br> Game lasted: " + gameLasted;
		gameLast = (((endTime.getMinutes() - startTime.getMinutes())*60) +  tempT) ; //time in pure seconds		
		//Add time and +one into score in data base if player one Wins and is logged in.
		if(winGame == 1 && loginName != "" && loginName != "noLogin" ){
			uploadScores();
		}
	}

}


function changeColor(){ //change color of pieces.

	let v = document.querySelectorAll(".playerOneP");
	let v2 = document.querySelectorAll(".playerTwoP");
	v.forEach(playerOneP => {
		playerOneP.style.backgroundColor = document.getElementById("playOneC").value;
		playerOneP.style.opacity = 1;

	});


	v2.forEach(playerTwoP => {
		playerTwoP.style.backgroundColor = document.getElementById("playTwoC").value;
		playerTwoP.style.opacity = 1;
	});

	/*
	v = document.getElementsByClassName("playerOneP")[0];
	v2 = document.getElementsByClassName("playerTwoP")[0];

	v.style.backgroundColor = document.getElementById("playOneC").value;
	v2.style.backgroundColor = document.getElementById("playTwoC").value;

	*/

}

function createGame2(){ //changeBoard to 
	currentP = 1;
	startTime = new Date();
	let gb = document.getElementById("gameboard");
	gb.style.height = "840px";
	gb.style.width = "757px";
	rows = 8;
	cols = 9;
	gameBoard = [];
	document.getElementById('gameboard').innerHTML = "";
	document.getElementById('winner').innerHTML = "";
	grav = [7,7,7,7,7,7,7,7,7]; //Start at the lowest row of the matrix, bottom row, 5 represents is each column, (0,5), (1,5), ect..;
	for(let i = 0; i < rows; ++i){
		let row = [];
		for(let y = 0; y < cols; ++y){
			row.push(0);
			let hole = document.createElement("div");
			hole.id = i.toString() + "," + y.toString(); //create sections for each hole and give them an ID correspoding to the row and column they are in
			hole.classList.add("holes");
			hole.addEventListener("click", placeDown);
			document.getElementById("gameboard").append(hole); //dynamically create the sections for the holes.

		}
		gameBoard.push(row); //fill with 0s.

	}




}


function hintAdd(){

if(hint = 0){
hint = 1; //change hint var to 1 to turn it on;
}
else{
	hint = 0;
}


}

function addHint(x, y){

	let hole = document.getElementById(x + "," + y);
	hole.classList.add("gameHint");
	let h = document.querySelectorAll(".gameHint");

	h.forEach(gameHint => {
		gameHint.style.opacity = 0.5;


	});


		
	


}



function checkIfLogin(url, userName){
	httpRequest2 = new XMLHttpRequest();
	if (!httpRequest2) { // check if the object was properly created
	  // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest2.onreadystatechange = getloginName;  // we assign a function to the property onreadystatechange (callback function)
    httpRequest2.open('POST','getLoginName.php');  // ACTION + (string containing address of the file + parameters if needed)
    httpRequest2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// application/json; charset=utf-8 is a common Content-Type
    // application/x-www-form-urlencoded; charset=UTF-8 is the default Content-Type
    httpRequest2.send('userName=' + userName); // POST = send with parameter (the string wi

}



function getloginName(){
  try {
    if (httpRequest2.readyState === XMLHttpRequest.DONE) {
      if (httpRequest2.status === 200) {      
		    // We retrieve a piece of text corresponding to some JSON
			// now you have a nice object in the response, you can access its properties and values to populate the different fields of your form
			// the next stages will be about the creation of this JSON from the PHP side, in relation to some data that we extracted from a database
			//alert(httpRequest.responseText); // If you have a bug, use an alert of what is given back from the server (for textual content)
			// if you return something that cannot be converted to an object, then debug the PHP side !
			loginName = httpRequest2.responseText;

			if(loginName != ""){
				//save date;
			}
			//alert(response.computedString); // display the value of property computedString from the JSON object
	  } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
   //alert('Caught Exception: ' + e.description);
	}
}



function uploadScores(){
if(winGame == 1){

	if(loginName != "" && loginName != "noLogin" ){ //user is logged in and the score will be saved
		
		httpRequest = new XMLHttpRequest;
		let url = "saveLead.php?username="+loginName+"&timeplayed="+gameLast;
		httpRequest.open("GET",url, true);
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.send(null);

	}

}



}

checkIfLogin();
