
//ask users names
var p1=prompt("Player 1 enter your name:"); //veggies
var p2=prompt("Player 2 enter your name:"); //junkfood
//if playe doesnt enter name/cancell prompt user will have default name
function playersNames() {
	if (p1=== "" || p1===null) { p1="Player 1"}
	if (p2=== "" || p2===null) { p2="Player 2"}
}
playersNames();



// Using NaN instead of null is a clever hack. See checkForWinner for details.

var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';

var player2 = 'junkfood';

var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
	 $('#turn-label').text(p2);
  }
  else {
    currentPlayer = player1;
	 $('#turn-label').text(p1);
  }
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
  	||spaces[0] === spaces[4] && spaces[4] === spaces[8]
	||spaces[0] === spaces[3] && spaces[3] === spaces[6]
	||spaces[1] === spaces[4] && spaces[4] === spaces[7]
	||spaces[2] === spaces[5] && spaces[5] === spaces[8]
	||spaces[2] === spaces[4] && spaces[4] === spaces[6]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
	
    // TODO: Check for rest of game winning cases
  )
  {
    console.log('Somebody won!');
	console.log(currentPlayer);
	
    // TODO: Handle game winner
	onGameWin (currentPlayer);
	return true;
	//Check if game is a tie/if true alert & restart button
  } else if (spaces[0] && spaces[1] && spaces[2] && 
	   spaces[3] && spaces[4] && spaces[5] &&
	   spaces[6] && spaces[7] && spaces[8]) {
		   alert("It's a tie!");
  			//Replay button to appear, change css code to inline from none
  			document.getElementById("play").style.display="inline";
	   }
  
  
  return false;
};

var disableGame=false;
$(document).on('click', '#board .space', function (e) { 

	  
  if (!disableGame) {
	  var spaceNum = $(e.currentTarget).index();
	  console.log('You clicked on space #' + spaceNum);
	
	  // Marks the space with the current player's name
	  // Adds a class to elem so css can take care of the visuals
	 if (!spaces[spaceNum]) {
	  spaces[spaceNum] = currentPlayer;
		
	  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
	 } else {
		alert("This space already taken!"); 
	 }
	  disableGame = checkForWinner();
	  setNextTurn();
  }
	

});

function onGameWin (winner) {
  // put correct user names for winner in alert
  var fade = winner;
  if(winner ==="veggies") { winner=p1;} else {winner=p2;}
  alert(winner + " won!");
  Score();
   //Replay button to appear, change css code to inline from none
  document.getElementById("score").style.display="inline";
    //winner images will fade in and out 3 times
 if (fade === "veggies") {
		winnerFlash(".veggies",".junkfood"); 
 } else {
		winnerFlash(".junkfood",".veggies");
 }
  //Displaye table score and run score function
  document.getElementById("play").style.display="inline"; 
}

//reset game
$( "#play" ).click(function() {
  	for (var i =0; i<spaces.length; i++) {
		spaces[i]=NaN;
		$(".veggies").stop(true,true);
		$(".junkfood").stop(true,true);
		$(".space").removeAttr("style");
		$('.space').removeClass('veggies').removeClass('junkfood');
	}
	document.getElementById("play").style.display="none";
	
	//allow user to click on game again
	disableGame=false;
	
});

//game settings
$( ".btn" ).click(function() {
	alert("button works");
  	
	document.getElementById("settings").style.display="inline";
	
	
});


var p1Score =0;
var p2Score=0;
function Score() {
	//check current winner/add score 
	if(currentPlayer==="veggies") {
		p1Score+=1;
	} else {
		p2Score+=1;
	}
	//display players names
	$('#player1name').text(p1);
	$('#player2name').text(p2);
	//display current score
	$('#player1-score').text(p1Score);
	$('#player2-score').text(p2Score);
	
}
function winnerFlash(prop1,prop2) {
	 for (var i =0; i<3; i++){
	 $(prop1).animate({opacity:'0.1'},"slow");
	 $(prop1).animate({opacity:'1'},"slow");
	 $(prop2).animate({opacity:'0.1'},"fast");
	 }
	
}

// Start the game
setNextTurn();
