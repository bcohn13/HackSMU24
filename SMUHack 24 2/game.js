const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"
];

// Create a deck of cards
function createDeck() {
    let deck = [];
    for (let value of values) {
        deck.push({
            value: value,
            image: `cards/${value}.png`, // Update to point to the 'cards' folder
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

// DOM Elements
const player1CardImg = document.getElementById("player1Card");
const player2CardImg = document.getElementById("player2Card");
const flipButton = document.getElementById("flipButton");
const winnerText = document.getElementById("winnerText");
const roundNumber = document.getElementById("roundNumber");
const player1ScoreText = document.getElementById("player1Score");
const player2ScoreText = document.getElementById("player2Score");

// Modal elements
const resultModal = document.getElementById("resultModal");
const modalText = document.getElementById("modalText");
const nextRoundButton = document.getElementById("nextRoundButton");
const closeModal = document.getElementById("closeModal");

// Flip Event
flipButton.addEventListener("click", function () {
    if (round > 10) return;

    const player1Card = deck.pop();
    const player2Card = deck.pop();
    player1CardImg.src = player1Card.image;
    player2CardImg.src = player2Card.image;

    // Determine the round winner
    let roundWinner = "";
    if (player1Card.strength > player2Card.strength) {
        roundWinner = "Player 1 Wins the Round!";
        player1Score++;
    } else if (player1Card.strength < player2Card.strength) {
        roundWinner = "Player 2 Wins the Round!";
        player2Score++;
    } else {
        roundWinner = "It's a Tie!";
    }

    // Update Scores
    player1ScoreText.textContent = `Score: ${player1Score}`;
    player2ScoreText.textContent = `Score: ${player2Score}`;

    // Show the result in modal
    modalText.textContent = roundWinner;
    resultModal.style.display = "block";

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
        flipButton.disabled = true;
    } else {
        // Move to the next round
        round++;
        roundNumber.textContent = `Round ${round} of 10`;
    }
});

// Next Round Event
nextRoundButton.addEventListener("click", function () {
    // Close modal and reset card images
    resultModal.style.display = "none";
    player1CardImg.src = "cards/back.png";
    player2CardImg.src = "cards/back.png";
    winnerText.textContent = "Press Flip to Play!";
});

// Close Modal Event
closeModal.addEventListener("click", function () {
    resultModal.style.display = "none";
});

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target === resultModal) {
        resultModal.style.display = "none";
    }
};
