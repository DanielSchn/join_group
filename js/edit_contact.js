function renderEditForm(index) {
    let editCard = document.getElementById('editCardOne');
    editCard.innerHTML = '';

    let initial = getInitials(contacts[index]['name']);

    editCard.innerHTML = /* html */`
        <div class="leftBlueSection">
            <img class="closeAddCard d-none" onclick="editCardWindow(false)" src="./assets/img/contacts/close.svg">
            <img class="smallCardLogo" src="./assets/img/contacts/logo_card.svg">
            <div class="cardTitle">
                <span class="addCardHeadline">Edit Contact</span>
                <div id="devider3"></div>
            </div>
        </div>

        <div class="cardInitials_bg">
            <span class="cardIntitials">${initial}</span>
        </div>

        <img class="closeAddContact_btn" src="./assets/img/contacts/close.svg" onclick="editCardWindow(false)">

        <form id="editForm" onsubmit="editCurrentContact(${index})">
            <div class="addContactInputContainer"><input id="editName" class="addContactInput" type="text" placeholder="Name"><img src="./assets/img/contacts/person.svg"></div>
            <div class="addContactInputContainer"><input id="editMail" class="addContactInput" type="email" placeholder="Email"><img src="./assets/img/contacts/mail.svg"></div>
            <div class="addContactInputContainer"><input id="editNumber" class="addContactInput" type="tel" placeholder="Phone"><img src="./assets/img/contacts/call.svg"></div>
            <div class="addSummit_btn">
                <button class="addContactCancel_btn">Cancel<img src="./assets/img/contacts/iconoir_cancel.svg"></button>
                <button class="addContactCreate_btn">Save<img src="./assets/img/contacts/check.svg"></button>
            </div>
        </form>
    `;
}

function editCurrentContact(index) {
    let name = document.getElementById('editName');
    let mail = document.getElementById('editMail');
    let number = document.getElementById('editNumber');

    let getName = name.value;
    let firstLetter = getName.charAt(0).toUpperCase();

    let newName = name.value;
    let newMail = mail.value;
    let newNumber = number.value;

    getNewContactInformation(index, newName, newMail, newNumber, firstLetter);
    refreshContactList();
}

function getNewContactInformation(index, newName, newMail, newNumber, firstLetter) {

    let editContact = {
        'name': newName,
        'mail': newMail,
        'number': newNumber,
        'letter': firstLetter,
    };

    contacts.splice(index, 1, editContact);
}


function deleteContact(index) {
    contacts.splice(index, 1);
    refreshContactList();

    let contactDetails = document.getElementById('mainContactDetails');
    contactDetails.innerHTML = '';

    let mobileContactDetails = document.getElementById('mobileMainContactDetails');
    mobileContactDetails.innerHTML = '';
}


async function refreshContactList() {
    sortContacts();
    await setItem('contacts', JSON.stringify(contacts));
    await loadContacts();
    renderContacts();
}