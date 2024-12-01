// Caitlin Hiner

// this will always show where at in the game the user is
// it will state either which players turn it is
// or if the game is over
const statusDisplay = document.querySelector('.game--status');

// these are veriables
// gameActive is a pause point
// incase of an end scenario
let gameActive = true;
// this is the current player
let currentPlayer = "X";
// this is the current game state, the empty string allows
// the tracking of played cells, and validates the game state
let gameState = ["", "", "", "", "", "", "", "", ""];

// these are declared messages that run in the game status,
// there are dynamic factors in the messages which can
// change depending on who the current player is
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ends with a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// initial message to let the player know who goes first x or o
statusDisplay.innerHTML = currentPlayerTurn();

// Block Constant
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// this stores the clicked cell data so the game 
// knows what action it should be taking
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// this handles the player change until
// the result comes true which means end of game
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// this is the win condition from the table above
// a b and c all need to hae the correct value 
// in order for the game to be won
// if not then game continues
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    // if all conditions are met then the game ends
    // and the winning message is displayed
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // if the game ends in a draw 
    // the draw message is displayed
    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);