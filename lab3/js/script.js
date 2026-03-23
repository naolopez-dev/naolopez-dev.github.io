document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();
loadCounter();

function shuffleQ1Choices() {
    let q1Choices = ["font-color", "color", "text-color", "fontColor"];
    q1Choices = _.shuffle(q1Choices);
    console.log(q1Choices);

    for (let i of q1Choices) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;
        console.log(radioElement);

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(radioElement);
        document.querySelector("#q1ChoicesDiv").append(labelElement);
        console.log(labelElement);
    }
}

function gradeQuiz() {
    let score = 0;


    let q1 = document.querySelector("input[name=q1]:checked");
    if (q1 && q1.value == "color") {
        q1Feedback.textContent = "Correct ";
        q1Feedback.style.color = "green";
        let img = document.createElement("img");
        img.src = "img/happy.jpeg";
        q1Feedback.append(img);

        score += 20;
    } else {
        q1Feedback.innerHTML = "Incorrect ";
        q1Feedback.style.color = "red";
        let img = document.createElement("img");
        img.src = "img/upset.jpg";
        q1Feedback.append(img);
    }

 
    let q2 = document.querySelector("#q2").value.trim().toLowerCase();
    if (q2  == "font-weight") {
        q2Feedback.innerHTML = "Correct";
        q2Feedback.style.color = "green";
        let img = document.createElement("img");
        img.src = "img/happy.jpeg";
        q2Feedback.append(img);
        score += 20;
    } else {
        q2Feedback.innerHTML = "Incorrect";
        q2Feedback.style.color = "red";
        let img = document.createElement("img");
        img.src = "img/upset.jpg";
        q2Feedback.append(img);
    }

    let q3 = document.querySelector("#q3").value; 
    if (q3== "em") {
        q3Feedback.innerHTML = "Correct";
        q3Feedback.style.color = "green";
        let img = document.createElement("img");
        img.src = "img/happy.jpeg";
        q3Feedback.append(img);
        score += 20;
    } else {
        q3Feedback.innerHTML = "Incorrect";
        q3Feedback.style.color = "red";
        let img = document.createElement("img");
        img.src = "img/upset.jpg";
        q3Feedback.append(img);
    }

    let checked = [...document.querySelectorAll("input[name=q4]:checked")].map(e => e.value).sort().join(",");
    if (checked == "div,p") {
        q4Feedback.innerHTML = "Correct";
        q4Feedback.style.color = "green";
        let img = document.createElement("img");
        img.src = "img/happy.jpeg";
        q4Feedback.append(img);
        score += 20;
    } else {
        q4Feedback.innerHTML = "Incorrect";
        q4Feedback.style.color = "red";
        let img = document.createElement("img");
        img.src = "img/upset.jpg";
        q4Feedback.append(img);
    }

    let q5 = document.querySelector("#q5").value;
    if (q5 === "20") {
        q5Feedback.textContent = "Correct ";
        q5Feedback.style.color = "green";
        let img = document.createElement("img");
        img.src = "img/happy.jpeg";
        q5Feedback.append(img);
        score += 20;
    } else {
        q5Feedback.innerHTML = "Incorrect";
        q5Feedback.style.color = "red";
        let img = document.createElement("img");
        img.src = "img/upset.jpg";
        q5Feedback.append(img);
    }

    totalScore.textContent = "Score: " + score;

    if (score >= 80) {
        msg.textContent = "Congratulations!";
    }

    updateCounter();
}

function loadCounter() {
    let count = localStorage.getItem("quizCount") || 0;
    timesTaken.textContent = "Times taken: " + count;
}

function updateCounter() {
    let count = localStorage.getItem("quizCount") || 0;
    count++;
    localStorage.setItem("quizCount", count);
    loadCounter();
}