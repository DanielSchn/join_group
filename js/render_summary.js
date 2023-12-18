function initSummary() {
    setDaytime();
    renderUserName();
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


function renderUserName() {
    let userName = document.getElementById('userNameSummary');
    userName.innerHTML = `Dear Guest`;
}