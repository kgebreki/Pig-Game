/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Initialization
document.querySelector('.dice').style.display = 'none';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

// Event listener and handler for rolling dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    // Random number between 1-6
    let dice = Math.floor(Math.random()*6) + 1;
    let diceDOM = document.querySelector('.dice');
    // Display dice image according to value
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;
    if (dice === 1) { // Next player
        NextPlayer();
    } else { // Update score
        roundScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    }
});

// Event listener and handler for holding
document.querySelector('.btn-hold').addEventListener('click', function () {
    // Add roundScore to global score
    scores[activePlayer] += roundScore;
    // Update UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    // Check win condition
    if (scores[activePlayer] >= 20) {
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    } else { // Next player
        NextPlayer();
    }
});

// Next player
function NextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}