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
        }, 1000);
    } else {
        document.getElementById('userNotFound').style.display = 'block';
    }
}