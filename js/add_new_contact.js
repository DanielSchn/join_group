let contacts = [];

function saveNewContact() {
    addNewContact();
    loadContacts();
    renderContacts();
}


async function addNewContact() {
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactNumber = document.getElementById('contactNumber');

    let getName = contactName.value;
    let firstLetter = getName.charAt(0).toUpperCase();

    let newContact = {
        'name': contactName.value,
        'mail': contactEmail.value,
        'number': contactNumber.value,
        'letter': firstLetter,
    }

    contacts.push(newContact);
    sortContacts();
    setItem('contacts', JSON.stringify(contacts));
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function sortContacts() {
    contacts.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return +1;
        }
        
        return 0;
    }) 
}


function renderContacts() {

    let contactContainer = document.getElementById('myContactsContainer');
    contactContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        if (!document.getElementById(contact['letter'])) {
            contactContainer.innerHTML += alphabetContainerHtml(contact['letter']);
        }

        let intitial = getInitials(contact['name']);

        let letterContainer = document.getElementById(contact['letter']);
        letterContainer.innerHTML += /* html */`
            <div class="myContacts">
                <div class="contactCard" onclick="showContactCard(${i})">
                    <div class="contactInitials">
                        <span id="user_name">${intitial}</span>
                    </div>
                    <div class="contactDetails">
                        <div><span id="name" class="contactName">${contact['name']}</span></div>
                        <div><span id="mail" class="mailColor">${contact['mail']}</span></div>
                    </div>
                </div>
            </div>
        `;
    }
}