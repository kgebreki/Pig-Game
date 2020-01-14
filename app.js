/*
PIG GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isGamePlaying;
Init();

// Event listener and handler for rolling dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGamePlaying) {
        // Random number between 1-6
        let dice1 = Math.floor(Math.random()*6) + 1;
        let dice2 = Math.floor(Math.random()*6) + 1;
        // Display dice image according to value
        let dice1DOM = document.getElementById('dice-1');
        let dice2DOM = document.getElementById('dice-2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = `dice-${dice1}.png`;
        dice2DOM.src = `dice-${dice2}.png`;
        // If player rolls two 1s (snake eyes), they lose their turn and lose all the points accumulated during the game
        if (dice1 === 1 && dice2 === 1) {
            scores[activePlayer] = 0;
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
            NextPlayer();
        } else if (dice1 === 1 || dice2 === 1) { // player losers their turn and all the points accumulated during their turn
            NextPlayer();
        } else { // update score
            roundScore += dice1 + dice2;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        }
    }
});

// Event listener and handler for holding
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGamePlaying) {
        // Add roundScore to global score
        scores[activePlayer] += roundScore;
        // Update UI
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        // Assign win score to game logic
        const input = document.querySelector('.win-score').value;
        let winScore;
        winScore = input ? input: 100;
        // Check win condition
        if (scores[activePlayer] >= winScore) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            isGamePlaying = false;
        } else { // Next player
            NextPlayer();
        }
    }
});

// Event listener and handler for new game
document.querySelector('.btn-new').addEventListener('click', Init);

// Initialize
function Init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Next player
function NextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}