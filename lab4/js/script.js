let zipElement = document.querySelector("#zipCode");

zipElement.addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);

let usernameAvailable = false;

document.querySelector("#username").addEventListener("input", checkUsername);
document.querySelector("#password").addEventListener("focus", suggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", validate);

async function suggestedPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#suggestedPassword").textContent ="Suggested Password: " + data.password;
    document.querySelector("#password").value = data.password;
}

function validate(event) {
    event.preventDefault();
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    document.querySelector("#userError").textContent = "";
    document.querySelector("#passError").textContent = "";
    document.querySelector("#matchError").textContent = "";
    let valid = true;

    if (username.length < 3) {
        document.querySelector("#userError").textContent = "Username must be at least 3 characters";
        document.querySelector("#userError").className = "text-wrong";
        valid = false;
    } else if (!usernameAvailable) {
        document.querySelector("#userError").textContent = "Username is not available";
        document.querySelector("#userError").className = "text-wrong";
        valid = false;
    } else {
        document.querySelector("#userError").textContent = "Username looks good!";
        document.querySelector("#userError").className = "text-right";
    }

    if (password.length < 6) {
        document.querySelector("#passError").textContent = "Password must be at least 6 characters";
        document.querySelector("#passError").className = "text-wrong";
        valid = false;
    } else {
        document.querySelector("#passError").textContent = "Password length ok";
        document.querySelector("#passError").className = "text-right";
    }

    if (password !== password2) {
        document.querySelector("#matchError").textContent = "Passwords do not match";
        document.querySelector("#matchError").className = "text-wrong";
        valid = false;
    } else if (password.length >= 6) {
        document.querySelector("#matchError").textContent = "Passwords match!";
        document.querySelector("#matchError").className = "text-right";
    }

    if (valid) {
        alert("Form submitted!"); 
        event.target.submit(); 
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    if (!username) return;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let msg = document.querySelector("#userMsg");
    if (data.available) {
        msg.textContent = "Username available";
        msg.className = "text-right";
        usernameAvailable = true;
    } else {
        msg.textContent = "Username not available";
        msg.className = "text-wrong";
        usernameAvailable = false;
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option>Select County</option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option>${data[i].county}</option>`;
    }
}

displayStates();
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error accessing API endpoint");
        const data = await response.json();
        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;
            document.querySelector("#state").append(optionEl);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }   
}

async function displayCity() {
    let zipCode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    if (!data || !data.city) {
        document.querySelector("#zipMsg").textContent = "Zip code not found";
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        return;
    }
    document.querySelector("#zipMsg").textContent = "";
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}