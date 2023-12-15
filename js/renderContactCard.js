function cardWindow() {
    const cardBg = document.getElementById('mainContactCard_Bg');
    const layer = document.getElementById('closeWindowLayer');
    const contact = document.getElementById('mainContactDetails');
    const mainContactCard = document.getElementById('mainContactContainer');
    cardBg.classList.toggle('d-none');
    layer.classList.toggle('d-none');
    contact.classList.toggle('d-none');
    mainContactCard.classList.toggle('mobile-d-none');
}

function closeWindow() {
    cardWindow();
}