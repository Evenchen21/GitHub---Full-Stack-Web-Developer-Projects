/* --------------------------- */
let inputText = document.getElementById("inputText");
let guessButton = document.getElementById("guessButton");
let resetButton = document.getElementById("resetButton");
let resultDisplay = document.getElementById("resultDisplay");
let randomNumber = Math.floor(Math.random() * 10) + 1;
let attemptsLeft = 5;
let gameIsOver = false;
/* --------------------------- */

guessButton.addEventListener("click", function () {
  userGuessNumber = parseInt(inputText.value);

  /* check if there is no input entered */
  if (
    userGuessNumber === "" ||
    isNaN(userGuessNumber) ||
    userGuessNumber === null
  ) {
    resultDisplay.innerHTML += "";
    guessButton.disabled = true;
    inputText.disabled = true;
    return;
  }

  /* check if the number is === randomNumber */
  if (userGuessNumber === randomNumber) {
    resultDisplay.innerHTML =
      "🎉 The number you guessed is correct! " + randomNumber + ".";
    document.body.style.backgroundColor = "green";

    gameIsOver = true;
    /* check if the number is bigger or smaller form randomNumber */
  } else if (userGuessNumber < randomNumber || userGuessNumber > randomNumber) {
    resultDisplay.innerHTML = " ❌ Wrong guess! Try again.";
    attemptsLeft--;

    /* check if the user is an idiot and not listening */
    if (userGuessNumber < 1 || userGuessNumber > 10) {
      resultDisplay.innerHTML +=
        "😠 I TOLD YOU DONT USE A NUMBER BIGGER THAN 10!";
      guessButton.disabled = true;
      inputText.disabled = true;
      document.body.style.backgroundColor = "red";
      return;
    }

    /* check there is any attempts are left and stop the game */
    if (attemptsLeft < 0) {
      document.body.style.backgroundColor = "darkgray";

      resultDisplay.innerHTML =
        "😞 Game over! out of attempts - The number was " + randomNumber + ".";
      gameIsOver = true;
    }
  }

  if (gameIsOver) {
    guessButton.disabled = true;
    inputText.disabled = true;
  } else {
    resultDisplay.innerHTML += " Attempts left: " + attemptsLeft + ".";
  }
});

resetButton.addEventListener("click", function () {
  document.location.reload();
});

inputText.value = "";
