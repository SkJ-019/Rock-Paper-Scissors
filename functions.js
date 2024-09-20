let score = JSON.parse(localStorage.getItem('score'));
if (score === null){
 score = {
   wins: 0,
   loses: 0,
   ties: 0
 }; 
}

let isAutoPlaying = false;
let intervalID;
function autoPlay(){
  if (!isAutoPlaying){
    intervalID = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-button').innerHTML = 'Stop Play';
  }else{
    clearInterval(intervalID); /* This stops the interval when the button is clicked again */
    isAutoPlaying = false;
    document.querySelector('.auto-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.auto-button').addEventListener(
  'click', () => {
    autoPlay();
  }
);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  }
  else if (event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissors');
  }
});

document.querySelector('.js-rock-button').addEventListener(
  'click', () => {
    playGame('rock');
  }
);
document.querySelector('.js-paper-button').addEventListener(
  'click', () => {
    playGame('paper');
  }
);
document.querySelector('.js-scissors-button').addEventListener(
  'click', () => {
    playGame('scissors');
  }
);

document.querySelector('.reset-button').addEventListener(
  'click', () => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
  }
);

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You lose.';
    }
    else if (computerMove === 'paper'){
      result = 'You win.';
    }
      else if (computerMove === 'scissors'){
      result = 'Tie.';       
    }
  }
  
  if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.';
    }
    else if (computerMove === 'paper'){
      result = 'Tie.';
    }
    else if (computerMove === 'scissors'){
    result = 'You lose.';       
    }
  }

  if (playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Tie.';
    }
    else if (computerMove === 'paper'){
      result = 'You lose.';
    }
    else if (computerMove === 'scissors'){
      result = 'You win.';       
    }
  }

  if (result === 'You win.'){
    score.wins += 1;
  }
  else if (result === 'You lose.'){
    score.loses += 1;
  }
  else if (result === 'Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.p-result').innerHTML = result;

  document.querySelector('.p-moves').innerHTML = 
  `You <img class="moves-img" src="images/${playerMove}-emoji.png">    <img class="moves-img" src="images/${computerMove}-emoji.png"> Computer.`;

  updateScore();
  
}

function updateScore(){
  document.querySelector('.p-scores').innerHTML = `Wins: ${score.wins}. Loses: ${score.loses}. Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } 
  else if (randomNumber > 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }
  else if(randomNumber > 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove; /* without this, the code won't work becuase computerMove is a local variable and it's scope is inside this function, so we need to return it's value and store it inside another variable */
}
