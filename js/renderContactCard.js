function showAndHideContactCard() {
    contactCardWindow();
    mobileContactCardWindow();
}

function contactCardWindow() {
    const cardBg = document.getElementById('mainContactCard_Bg');
    const contact = document.getElementById('mainContactDetails');
    const mainContactCard = document.getElementById('mainContactContainer');

    cardBg.classList.toggle('d-none');
    contact.classList.toggle('d-none');
    mainContactCard.classList.toggle('mobile-d-none');
}

function mobileContactCardWindow() {
    const layer = document.getElementById('closeWindowLayer');
    const hideAddBtn = document.getElementById('mobileAddContactBtnContainer');
    const showSettingBtn = document.getElementById('mobileSettingBtnContainer');
    const arrow = document.getElementById('backArrowContainer');

    layer.classList.toggle('d-none');
    hideAddBtn.classList.toggle('d-none');
    showSettingBtn.classList.toggle('d-none');
    arrow.classList.toggle('d-none');
}

function addCardWindow(isGoingToOpen) {
    const addContact_bg = document.getElementById('addCardBg');
    const addContactCard = document.getElementById('AddCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');

    if(isGoingToOpen === true) {
        addContact_bg.classList.remove('d-none');
        addContactCard.classList.remove('d-none');
        addContactCard.classList.remove('slideOut');
        addContactCard.classList.add('slideIn');
        mainContactCard.classList.add('mobile-d-none');
    } else {
        addContact_bg.classList.add('d-none');
        addContactCard.classList.remove('slideIn');
        addContactCard.classList.add('slideOut');
    }
}

function editContactInformation() {
    showAndHideContactCard();
    addCardWindow(true);
}