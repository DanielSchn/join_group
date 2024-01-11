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


/**
 * This function generates the container for a single contact card 
 * @param {JSON} contact - single contact-JSON array from the global contacts array
 * @param {*} i - place of the current contact within the contacts array
 * @returns HTML string containing the card for a single contact
 */
function contactCardHTML(contact, i) {
    let initials = getInitials(contact['name']);
    return /* html */`
        <div class="myContacts">
            <div class="contactCard" onclick="showContactCard(${i})">
                <div class="contactInitials" style="background: ${contact['color']}">
                    <span id="user_name">${initials}</span>
                </div>
                <div class="contactDetails">
                    <div><span id="name" class="contactName">${contact['name']}</span></div>
                    <div><span id="mail" class="mailColor">${contact['mail']}</span></div>
                </div>
            </div>
        </div>`;
}
