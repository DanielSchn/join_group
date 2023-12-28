function showAndHideContactCard() {
    contactCardWindow();
    mobileContactCardWindow();
}

function contactCardWindow() {
    const contactContainer = document.getElementById('mainContactDetails');
    const responsiveBackgroundSetup = document.getElementById('responsivBackgroundSetup');
    const mainContactContainer = document.getElementById('mainContactContainer');

    contactContainer.classList.add('slideIn');
    contactContainer.classList.toggle('d-none');
    responsiveBackgroundSetup.classList.toggle('d-none');
    mainContactContainer.classList.toggle('mobile-d-none');
}

function mobileContactCardWindow() {
    const hideAddBtn = document.getElementById('mobileAddContactBtnContainer');
    const showSettingBtn = document.getElementById('mobileSettingBtnContainer');
    const arrow = document.getElementById('backArrowContainer');
    const mainContactContainer = document.getElementById('mainContactContainer');

    hideAddBtn.classList.toggle('d-none');
    showSettingBtn.classList.toggle('d-none');
    arrow.classList.toggle('d-none');
    mainContactContainer.classList.add('responsiveSlideIn');
}

function addCardWindow(isGoingToOpen) {

    if(isGoingToOpen === true) {
        openAddCard();
    } else {
        closeAddCard();
        showResponsiveAddCardWindow();
    }
}

function openAddCard() {
    const addContact_bg = document.getElementById('addCardBg');
    const addContactCard = document.getElementById('AddCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');

    addContact_bg.classList.remove('d-none');
    addContactCard.classList.remove('d-none');
    addContactCard.classList.remove('slideOut');
    addContactCard.classList.add('slideIn');
    mainContactCard.classList.add('mobile-d-none');
}

function closeAddCard() {
    const addContact_bg = document.getElementById('addCardBg');
    const addContactCard = document.getElementById('AddCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');
    const contactContainer = document.getElementById('mainContactDetails');

    addContact_bg.classList.add('d-none');
    addContactCard.classList.remove('slideIn');
    addContactCard.classList.add('slideOut');
    mainContactCard.classList.remove('mobile-d-none');
    mainContactCard.classList.remove('responsiveSlideIn');
    contactContainer.classList.remove('slideIn');
}

function showResponsiveAddCardWindow() {
    const contact = document.getElementById('mainContactDetails');
    const responsiveBackgroundSetup = document.getElementById('responsivBackgroundSetup');
    contact.classList.remove('d-none');
    responsiveBackgroundSetup.classList.remove('d-none');
}

function editContactInformation() {
    showAndHideContactCard();
    addCardWindow(true);
}