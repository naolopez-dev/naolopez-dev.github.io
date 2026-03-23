document.getElementById('spinButton').addEventListener('click', spin);
document.getElementById('resetButton').addEventListener('click', resetGame);

let balance = 100;
let wins = 0;
let losses = 0;
let symbols = [
    { name: "cherry", img: "img/cherries.jpg" },
    { name: "lemon", img: "img/lemon.jpg" },
    { name: "seven", img: "img/7.jpg" }
];
function spin() {
    let bet = Number(document.getElementById('bet').value);
    if (bet <= 0 || bet > balance ) {
        alert("Enter a number between 1 and your balance.");
        return;
    }
    if (balance>=200 ) {
        alert("Reset to play again!");
        return;
    }
    let slot1 = symbols[Math.floor(Math.random() * symbols.length)];
    let slot2 = symbols[Math.floor(Math.random() * symbols.length)];
    let slot3 = symbols[Math.floor(Math.random() * symbols.length)];
    document.getElementById('slot1').src = slot1.img;
    document.getElementById('slot2').src = slot2.img;
    document.getElementById('slot3').src = slot3.img;
    let message = "";
    let resultDiv = document.getElementById('result');
    let resultImage = document.getElementById('resultImage');

    if (slot1.name === slot2.name && slot2.name === slot3.name) {
        balance += bet * 2;
        wins++;
        message = "Jackpot! You win $" + (bet * 2);
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').style.fontWeight = 'bold';

    } else if (slot1.name === slot2.name || slot2.name === slot3.name || slot1.name === slot3.name) {
        message = "Two match! Balance stays the same";
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontWeight = 'bold';
    } else {
        losses++;
        balance -= bet;
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontWeight = 'bold';
        message = "No match. You lose $" + (bet * 2);
    }
    document.getElementById('message').textContent = message;
    document.getElementById('balance').textContent = balance;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    if (balance <= 0) {
        message = "You lost!";
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.fontWeight = 'bold';
        resultDiv.style.display = 'flex';
        resultImage.style.display = 'block';
        resultImage.src = 'img/lose.jpeg';
        document.getElementById('balance').textContent = balance;

    }
    if (balance >= 200) {
        message = "You Won Maximum Price!";
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').style.fontWeight = 'bold';
        resultDiv.style.display = 'flex';
        resultImage.style.display = 'block';
        resultImage.src = 'img/win.jpg';
        document.getElementById('balance').textContent = balance;

    }
}
function resetGame() {
    balance = 100;
    wins = 0;
    losses = 0;
    document.getElementById('balance').textContent = balance;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('slot1').src = "img/cherries.jpg";
    document.getElementById('slot2').src = "img/lemon.jpg";
    document.getElementById('slot3').src = "img/7.jpg";
    document.getElementById('message').textContent = "";
    let resultDiv = document.getElementById('result');
    let resultImage = document.getElementById('resultImage');
    resultImage.src = "";
    resultImage.style.display = "none";
    resultDiv.style.display = "none";
}