const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const player1Cards = [];
const player2Cards = [];
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const player1CardElement = document.getElementById("player1Card");
const player2CardElement = document.getElementById("player2Card");
const flipButton = document.getElementById("flipButton");
const resultElement = document.getElementById("result");
const nextRoundButton = document.getElementById("nextRoundButton");

let player1Deck = [];
let player2Deck = [];
let roundCount = 0;
let player1RoundsWon = 0;
let player2RoundsWon = 0;

function initializeGame() {
    player1Deck = [];
    player2Deck = [];
    roundCount = 0;
    player1RoundsWon = 0;
    player2RoundsWon = 0;
    
    // Give each player 10 random cards (2 through A, suits not included)
    for (let i = 0; i < 10; i++) {
        const randomCard1 = values[Math.floor(Math.random() * values.length)];
        const randomCard2 = values[Math.floor(Math.random() * values.length)];
        player1Deck.push({ value: randomCard1, image: `cards/${randomCard1}.png` });
        player2Deck.push({ value: randomCard2, image: `cards/${randomCard2}.png` });
    }

    updateScores();
    updateCardDisplay();
    nextRoundButton.style.display = "none";
}

function getCardValue(card) {
    const cardValue = card.value;
    if (!isNaN(cardValue)) return parseInt(cardValue); // Number cards (2-10)
    if (cardValue === 'J') return 11;
    if (cardValue === 'Q') return 12;
    if (cardValue === 'K') return 13;
    if (cardValue === 'A') return 14;
}

function flipCards() {
    if (roundCount >= 10) return; // Stop game after 10 rounds

    const player1Card = player1Deck[roundCount];
    const player2Card = player2Deck[roundCount];

    player1CardElement.innerHTML = `<img src="${player1Card.image}" alt="Player 1 card">`;
    player2CardElement.innerHTML = `<img src="${player2Card.image}" alt="Player 2 card">`;

    const player1Value = getCardValue(player1Card);
    const player2Value = getCardValue(player2Card);

    if (player1Value > player2Value) {
        resultElement.textContent = `Player 1 Wins Round ${roundCount + 1}!`;
        player1RoundsWon++;
    } else if (player1Value < player2Value) {
        resultElement.textContent = `Player 2 Wins Round ${roundCount + 1}!`;
        player2RoundsWon++;
    } else {
        resultElement.textContent = `Round ${roundCount + 1} is a Tie!`;
    }

    roundCount++;
    updateScores();

    if (roundCount >= 10) {
        declareWinner();
    } else {
        nextRoundButton.style.display = "inline";
        flipButton.disabled = true;
    }
}

function updateScores() {
    player1Score.textContent = `Rounds Won: ${player1RoundsWon}`;
    player2Score.textContent = `Rounds Won: ${player2RoundsWon}`;
}

function updateCardDisplay() {
    player1CardElement.innerHTML = `<img src="cards/back.png" alt="Back of card">`;
    player2CardElement.innerHTML = `<img src="cards/back.png" alt="Back of card">`;
}

function nextRound() {
    resultElement.textContent = "";
    updateCardDisplay();
    flipButton.disabled = false;
    nextRoundButton.style.display = "none";
}

function declareWinner() {
    if (player1RoundsWon > player2RoundsWon) {
        resultElement.textContent = "Player 1 Wins the Game!";
    } else if (player1RoundsWon < player2RoundsWon) {
        resultElement.textContent = "Player 2 Wins the Game!";
    } else {
        resultElement.textContent = "The Game is a Tie!";
    }
    flipButton.disabled = true;
    nextRoundButton.style.display = "none";
}

// Start game on load
flipButton.addEventListener("click", flipCards);
nextRoundButton.addEventListener("click", nextRound);
initializeGame();
