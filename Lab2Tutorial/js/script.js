document.querySelector("#guessBtn").addEventListener("click", checkGuesses);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
let randomNumber;
let attempts = 0;
initializeGame();
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";
    let playerGuess= document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value="";
    feedback.textContent = "";
    document.querySelector("#guesses").textContent +=  "";
}

function checkGuesses() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a value between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts)
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkGreen";
        gameOver();
    }
    else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry you lost!";
            feedback.style.color = "red";
            gameOver();
        }
        else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";

        }
        else {
            feedback.textContent = "Guess was low!";
        }
    }

}