let contacts = [];

function addNewContact() {
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactNumber = document.getElementById('contactNumber');

    let newContact = {
        'Name': contactName.value,
        'E-Mail': contactEmail.value,
        'Number': contactNumber.value,
    }

    contacts.push(newContact);
}