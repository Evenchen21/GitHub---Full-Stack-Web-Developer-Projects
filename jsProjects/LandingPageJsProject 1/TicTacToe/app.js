let currentPlayer = "X";

function makeMove(cell) {
  if (cell.innerText === "") {
    cell.innerText = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    alert("choose another cell please");
  }
}

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    makeMove(cell);
  });
});

/* Reset Button */
let resetButton = document.querySelector(".restart-button");
resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerText = "";
    currentPlayer = "X";
  });
});


/* Music Toggle */
let musicButton = document.querySelector(".music-toggle-button");
let backgroundMusic = document.getElementById("background-music");

musicButton.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicButton.innerText = "Pause Music";
  } else {
    backgroundMusic.pause();
    musicButton.innerText = "Play Music";
  }
});
