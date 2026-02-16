document.querySelector("#guessBtn").addEventListener("click", checkGuesses);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
initializeGame();
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";
    let userGuess = document.querySelector("#userGuess");
    userGuess.focus();
    userGuess.value = "";
    feedback.textContent = "";
    document.querySelector("#guesses").textContent = "";
    let img = document.querySelector("#gameImage");
    img.style.display = "none";
    img.src = "";
}

function checkGuesses() {
    let guess = document.querySelector("#userGuess").value;
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
        wins++;
        document.querySelector("#wins").textContent = wins;
        let img = document.querySelector("#gameImage");
        img.src = "img/happy-pug.jpg";
        img.style.display = "block"
        gameOver();
    }
    else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts >= 7) {
            feedback.textContent = "You lost! Number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            let img = document.querySelector("#gameImage");
            img.src = "img/sad.jpg";
            img.style.display = "block"
            gameOver();
            return;
        }
        else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";

        }
        else {
            feedback.textContent = "Guess was low!";
        }
    }
    function gameOver() {
        attempts = 0;
        document.querySelector("#guessBtn").style.display = "none";
        document.querySelector("#resetBtn").style.display = "inline";
    }
}
