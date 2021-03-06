
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);
  
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

 var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    endGameElem = document.getElementById('js-endGameElement'),
    endGameText = document.getElementById('js-endGameText'); 

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block'; 
   		endGameElem.style.display = 'none'; 
      break;

    case 'ended':
    	resultsElem.style.display = 'none'; 
    	newGameElem.style.display = 'block';
    	pickElem.style.display = 'none';
        newGameBtn.innerText = 'Jeszcze raz'; 
        endGameElem.style.display = 'block';  
        if (player.score == 10 )
	{
		endGameText.innerText = ' Gra zakończona.Wygrywa ' + player.name +'!';
		
	}
	else if(computer.score == 10)
	{
		endGameText.innerText = ' Gra zakończona.Wygrywa komputer !';
	}
  	break;
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        endGameElem.style.display = 'none';
  }
}    

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;

    setGamePoints();
  }

}


function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick');


function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
        playerPointsElem.innerHTML =player.score;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
        computerPointsElem.innerHTML =computer.score;
    }
	endOfGame();
}


function playerPick(playerPick) {
	
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
 
 

function endOfGame () {

	if (player.score == 10 )
	{
		gameState = 'ended';
    	setGameElements();
	}
	else if(computer.score == 10)
	{
		gameState = 'ended';
		setGameElements();
	}
}
