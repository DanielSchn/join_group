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


function renderContactCradInformation(index) {
    const contactDetails = document.getElementById('mainContactDetails');
    contactDetails.innerHTML = '';

    let intitial = getInitials(contacts[index]['name']);

    contactDetails.innerHTML = /* html */`
        <div id="mainContactContainer_1">
            <div class="initialCircle">
                <span id="user_initials_0" class="userNameFontSize">${intitial}</span>
            </div>
            <div id="contactSetup">
                <div id="user_name_0" class="userNameFontSize responsiveUserNameFontSize">${contacts[index]['name']}</div>
                <div id="settings">
                    <div id="edit" class="settingsBtn" onclick="editCardWindow(true)">
                        <img id="edit_img" src="./assets/img/contacts/edit_pen.svg"><span>Edit</span> <!-- Hover CSS / JS ?? -->
                    </div>
                    <div id="remove" class="settingsBtn">
                        <img id="remove_img" src="./assets/img/contacts/delete_bin.svg"><span>Delete</span> <!-- Hover CSS / JS ?? -->
                    </div>
                </div>
            </div>
        </div>

        <div id="mainContactContainer_2">
            Contact Information
        </div>

        <div id="mainContactContainer_3">
            <div id="mailContainer">
                <span class="contactDataTitle">Mail</span>
                <span class="contactData link">${contacts[index]['mail']}</span>
            </div>
            <div id="phoneContainer">
                <span class="contactDataTitle">Phone</span>
                <span class="contactData">${contacts[index]['number']}</span>
            </div>
        </div>
    `;
}


function renderMobileContactCradInformation(index) {
    const contactDetails = document.getElementById('mobileMainContactDetails');
    contactDetails.innerHTML = '';

    let intitial = getInitials(contacts[index]['name']);

    contactDetails.innerHTML = /* html */`
        <div id="mobileMainContactContainer_1">
                <div class="initialCircle">
                    <span id="user_initials_0" class="userNameFontSize">${intitial}</span>
                </div>
                <div id="contactSetup">
                    <div id="user_name_0" class="userNameFontSize responsiveUserNameFontSize">${contacts[index]['name']}</div>
                    <div id="settings">
                        <div id="edit" class="settingsBtn" onclick="editContactInformation()">
                            <img id="edit_img" src="./assets/img/contacts/edit_pen.svg"><span>Edit</span> <!-- Hover CSS / JS ?? -->
                        </div>
                        <div id="remove" class="settingsBtn">
                            <img id="remove_img" src="./assets/img/contacts/delete_bin.svg"><span>Delete</span> <!-- Hover CSS / JS ?? -->
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}
