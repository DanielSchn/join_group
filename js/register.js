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
 * Reset Input Form
 */
function resetForm() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpPasswordConfirm.value = '';
    checkboxSignUp.checked = false;
    registerBtn.disabled = false;
}

/**
 * Check passwords are the same
 */
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
    toggleSignUpButton();
    errorMessage.textContent = "";
});


function togglePasswordIcon(inputId, visibilityIconId, visibilityOffIconId) {
    const container = document.getElementById(inputId).closest('.inputContainer'); //Mit dem closest kann man den .inputContainer der am nächsten innerhalb des Containers ist finden
    const passwordIcon = container.querySelector('.passwordIcon');
    const visibilityIcon = container.querySelector(`#${visibilityIconId}`);
    const visibilityOffIcon = container.querySelector(`#${visibilityOffIconId}`);
    const inputField = document.getElementById(inputId);
    if (inputField.value.length > 0) {
        passwordIcon.classList.add('dNone');
        visibilityIcon.classList.remove('dNone');
        visibilityOffIcon.classList.add('dNone');
    } else {
        passwordIcon.classList.remove('dNone');
        visibilityIcon.classList.add('dNone');
        visibilityOffIcon.classList.add('dNone');
    }
}


function togglePasswordVisibility(inputId, visibilityIconId, visibilityOffIconId) {
    const inputField = document.getElementById(inputId);
    const visibilityIcon = document.getElementById(visibilityIconId);
    const visibilityOffIcon = document.getElementById(visibilityOffIconId);
    if (inputField.type === 'password') {
        inputField.type = 'text';
        visibilityIcon.classList.add('dNone');
        visibilityOffIcon.classList.remove('dNone');
    } else {
        inputField.type = 'password';
        visibilityIcon.classList.remove('dNone');
        visibilityOffIcon.classList.add('dNone');
    }
}