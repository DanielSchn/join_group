/**
 * This function generates the container for all contact cards with the same starting letter 
 * @param {string} letter - One-char-string designating the alphabetical letter 
 * @returns HTML string containing the letter container
 */
function alphabetContainerHtml(letter) {
    return /* html */`
    <div id="${letter}">
        <div class="alphabetContainer">
            <div class="alphabet">
                <span class="alphabetLetter">${letter}</span>
            </div>
            <div class="seperator"><img src="./assets/img/seperator.svg"></div>
        </div>
    </div>
    `
}
