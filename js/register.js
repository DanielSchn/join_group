/**
 * Referenzen zu den DOM-Elementen
 */
document.addEventListener('DOMContentLoaded', function () {
    var signUpButton = document.querySelector('.signUpButton');
    var checkbox = document.querySelector('.acceptPrivacy input[type="checkbox"]');
    var passwordInput = document.querySelector('input[placeholder="Password"]');
    var confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');
    var errorMessage = document.querySelector('.error-message');

/**
 * Funktion, um den Anmelde-Button zu aktivieren/deaktivieren und Fehlermeldungen anzuzeigen
 */
    function toggleSignUpButton() {
        var passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        var isCheckboxChecked = checkbox.checked;

        signUpButton.disabled = !isCheckboxChecked || !passwordsMatch;

        // Anzeige der Fehlermeldung
        if (!passwordsMatch) {
            errorMessage.textContent = "Die Passwörter stimmen nicht überein.";
        } else if (!isCheckboxChecked) {
            errorMessage.textContent = "Bitte akzeptiere die Datenschutzrichtlinie.";
        } else {
            errorMessage.textContent = ""; // Fehlermeldung leeren, wenn alles in Ordnung ist
        }
    }

    // Event-Listener für die Checkbox
    checkbox.addEventListener('change', toggleSignUpButton);

    // Event-Listener für die Passwort-Inputs
    passwordInput.addEventListener('input', toggleSignUpButton);
    confirmPasswordInput.addEventListener('input', toggleSignUpButton);
});