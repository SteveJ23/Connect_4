
var board;

function getLeadData(url, userName){
	httpRequest = new XMLHttpRequest();
	if (!httpRequest) { // check if the object was properly created
	  // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = getleadData2;  // we assign a function to the property onreadystatechange (callback function)
    httpRequest.open('POST','getLead.php');  // ACTION + (string containing address of the file + parameters if needed)
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// application/json; charset=utf-8 is a common Content-Type
    // application/x-www-form-urlencoded; charset=UTF-8 is the default Content-Type
    httpRequest.send('userName=' + userName); // POST = send with parameter (the string wi

}



function getleadData2(){
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {      
		    // We retrieve a piece of text corresponding to some JSON
			// now you have a nice object in the response, you can access its properties and values to populate the different fields of your form
			// the next stages will be about the creation of this JSON from the PHP side, in relation to some data that we extracted from a database
			//alert(httpRequest.responseText); // If you have a bug, use an alert of what is given back from the server (for textual content)
			// if you return something that cannot be converted to an object, then debug the PHP side !
			board = JSON.parse(httpRequest.responseText);
			//alert(response.computedString); // display the value of property computedString from the JSON object
			displayL(board);
	  } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
   //alert('Caught Exception: ' + e.description);
	}
}


function displayL(board){
	let y = board.length;
	if(y > 5){
		y = 5;
	}
	for(let i = 0; i <y; ++i){
		let r = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let cd1 = document.createTextNode(`Username: ${board[i]['username']}`);
		let cd2 = document.createTextNode(`Games Won: ${board[i]['gameswon']}`);
		let cd3 = document.createTextNode(`Time Played: ${parseFloat(board[i]['timeplayed'] / 60).toFixed(2)} Minutes`);
		td1.appendChild(cd1);
		td2.appendChild(cd2);
		td3.appendChild(cd3);
		r.appendChild(td1);
		r.appendChild(td2);
		r.appendChild(td3);
		//r.appendChild(td2) = "<td>Username: " + board[i]['username'] + "</td><td>Games Won: " + board[i]['gameswon'] + "</td><td>Time Played: " + math.round((board[i]['timeplayed']/60)) + " Minutes</td>";
		let d = document.getElementById('lead')
		d.appendChild(r); 

	}





}

getLeadData();

