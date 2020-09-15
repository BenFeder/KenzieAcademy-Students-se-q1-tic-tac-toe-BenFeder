let currentPlayer = "X";
let nextPlayer = "O";
let playerXSelections = [];
let playerOSelections = [];

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const handleClick = function (event) {
  const cell = event.target;
  cell.innerHTML = currentPlayer;
  if (currentPlayer === "X") {
    playerSelections = playerXSelections;
    nextPlayer = "O";
  } else {
    playerSelections = playerOSelections;
    nextPlayer = "X";
  }

  playerSelections.push(Number(cell.id));
  if (checkWinner(playerSelections)) {
    alert(`Player ` + currentPlayer + ` wins!`);
    resetGame();
  } else if (checkDraw()) {
    alert("Draw!");
    resetGame();
  } else {
    currentPlayer = nextPlayer; // swap players
  }
};

const cells = document.querySelectorAll("td");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

function checkDraw() {
  return playerOSelections.length + playerXSelections.length >= cells.length;
}

function checkWinner(playerSelections) {
  // Check if player has all values of each combination
  for (
    let winningComboIndex = 0;
    winningComboIndex < winningCombinations.length;
    winningComboIndex++
  ) {
    let matches = 0;
    for (
      let chosenCell = 0;
      chosenCell < winningCombinations[winningComboIndex].length;
      chosenCell++
    ) {
      if (
        playerSelections.includes(
          winningCombinations[winningComboIndex][chosenCell]
        )
      ) {
        matches++;
      } else {
        break; // go to the next combination
      }
      if (matches == 3) {
        return true;
      }
      // if we made it through each combo without returning true,
      // then there were no matches and player did not win
      return false;
    }
  }
}

function resetGame() {
  playerXSelections = new Array();
  playerOSelections = new Array();
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}
