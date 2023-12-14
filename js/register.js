let users = [];


async function init() {
    loadUsers();
}


/**
 * This is the function to load the Data from the remot storage and convert it into a JSON Array
 * If there are no Data we get an error log into the console
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * With this function we disable the button after click and push the Data into the users Array and POST it over the setItem() into the remote storage
 */
async function register() {
    registerBtn.disabled = true;
    users.push({
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}


/**
 * This is a function to reset the input form in the html code
 */
function resetForm() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpPasswordConfirm.value = '';
    checkboxSignUp.checked = false;
    registerBtn.disabled = false;
}


document.addEventListener('DOMContentLoaded', function () {
    let signUpButton = document.querySelector('.signUpButton');
    let passwordInput = document.querySelector('input[placeholder="Password"]');
    let confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');
    let errorMessage = document.querySelector('.errorMessage');
    function toggleSignUpButton() {
        let passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        signUpButton.disabled = !passwordsMatch;
        errorMessage.textContent = passwordsMatch ? "" : "Ups! Your password don't match";
    }
    confirmPasswordInput.addEventListener('input', toggleSignUpButton);
    toggleSignUpButton(); // Initial aufrufen, um den Button beim Laden der Seite zu deaktivieren
    errorMessage.textContent = ""; // Leere die Fehlermeldung beim Laden der Seite
});


// function togglePasswordIcon(inputField) {
//     if (inputField.value.length > 0) {
//         var showIcon = inputField.type === 'password'; // Hier anpassen, wie du entscheidest, welches Icon angezeigt werden soll
//         inputField.classList.remove('passwordIcon');
//         inputField.classList.add('passwordShowIcon');
//     } else {
//         inputField.classList.remove('passwordShowIcon');
//         inputField.classList.add('passwordIcon');
//     }
// }