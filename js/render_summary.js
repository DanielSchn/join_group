const userName = [];


function initSummary() {
    setDaytime();
    renderUserName();
    setTimeout(renderLogo, 500);
}


function renderSummaryGreeting(daytime) {
    let greeting = document.getElementById('greetOnSummary');
    greeting.innerHTML = daytime;
}


function setDaytime() {
    let today = new Date();
    let currentHour = today.getHours();
    console.log(currentHour);
    if(currentHour < 12) {
        renderSummaryGreeting('Good morning');
    } else if (currentHour < 18) {
        renderSummaryGreeting('Good afternoon');
    } else {
        renderSummaryGreeting('Good evening');
    }
}


function fillInGuest() {
    document.getElementById('email').value = 'guest@guest.de';
    document.getElementById('signUpPassword').value = 'guest';
    login();
}


/**
 * Login function and go to summary page when login User and password are match
 */
function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('signUpPassword');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    let guest = guests.find(u => u.email == email.value && u.password == password.value);
    console.log(user || guest);
    if(user || guest) {
        window.setTimeout(function () {
            window.location.href = "summary.html";
            if(user) {
                localStorage.setItem('userName', user.name);
            } else if(guest) {
                localStorage.setItem('userName', guest.name);
            }
        }, 1000);
    } else {
        document.getElementById('userNotFound').style.display = 'block';
    }
}


function renderUserName() {
    let loadedUserName = localStorage.getItem('userName');
    let renderUserName = document.getElementById('userNameSummary');
    let capitalized = loadedUserName.charAt(0).toUpperCase() + loadedUserName.slice(1);
    renderUserName.innerHTML = capitalized;
}


function renderLogo() {
    let loadedUserName = localStorage.getItem('userName');
    let capitalized = loadedUserName.charAt(0).toUpperCase();
    document.getElementById('use_name').innerHTML = capitalized;
}