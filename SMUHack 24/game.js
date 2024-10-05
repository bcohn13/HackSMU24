const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"
];

// Create a deck of cards (just 13 cards)
function createDeck() {
    let deck = [];
    for (let value of values) {
        deck.push({
            value: value,
            image: `cards/${value}.png`, // Image file names like 2.png, jack.png, etc.
            strength: values.indexOf(value) + 2 // Card strength 2 (lowest) to Ace (highest)
        });
    }
    return deck;
}

// Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Initialize game variables
let deck = shuffleDeck(createDeck());
let round = 1;
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player1Card, player2Card;

// DOM Elements
const player1CardImg = document.getElementById("player1Card");
const player2CardImg = document.getElementById("player2Card");
const player1FlipBtn = document.getElementById("player1Flip");
const player2FlipBtn = document.getElementById("player2Flip");
const winnerText = document.getElementById("winnerText");
const roundNumber = document.getElementById("roundNumber");
const player1ScoreText = document.getElementById("player1Score");
const player2ScoreText = document.getElementById("player2Score");

// Disable Player 2's button initially
player2FlipBtn.disabled = true;

// Player 1 Flip Event
player1FlipBtn.addEventListener("click", function () {
    if (round > 10) return;

    player1Card = deck.pop();
    player1CardImg.src = player1Card.image;

    player1FlipBtn.disabled = true;
    player2FlipBtn.disabled = false;
    winnerText.textContent = "Player 2's Turn!";
});

// Player 2 Flip Event
player2FlipBtn.addEventListener("click", function () {
    if (round > 10) return;

    player2Card = deck.pop();
    player2CardImg.src = player2Card.image;

    // Determine the round winner
    if (player1Card.strength > player2Card.strength) {
        winnerText.textContent = "Player 1 Wins the Round!";
        player1Score++;
    } else if (player1Card.strength < player2Card.strength) {
        winnerText.textContent = "Player 2 Wins the Round!";
        player2Score++;
    } else {
        winnerText.textContent = "It's a Tie!";
    }

    // Update Scores
    player1ScoreText.textContent = `Score: ${player1Score}`;
    player2ScoreText.textContent = `Score: ${player2Score}`;

    // Check if it's the last round
    if (round === 10) {
        if (player1Score > player2Score) {
            winnerText.textContent = "Player 1 Wins the Game!";
        } else if (player1Score < player2Score) {
            winnerText.textContent = "Player 2 Wins the Game!";
        } else {
            winnerText.textContent = "It's a Draw!";
        }

        // Disable further play
        player1FlipBtn.disabled = true;
        player2FlipBtn.disabled = true;
    } else {
        // Move to the next round
        round++;
        roundNumber.textContent = `Round ${round} of 10`;

        // Switch turns
        player1FlipBtn.disabled = false;
        player2FlipBtn.disabled = true;
        player1CardImg.src = "images/back.png";
        player2CardImg.src = "images/back.png";
        winnerText.textContent = "Player 1's Turn!";
    }
});
