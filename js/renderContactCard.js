function init() {
    hoverOnEditBtn();
    hoverOnRemoveBtn();
}

function openContactContainer() {
    let contact = document.getElementById('mainContactDetails');
    contact.classList.toggle('d-none');
}

function hoverOnEditBtn() {
    let addInfos = document.getElementById('edit_img');
    addInfos.addEventListener('mouseenter', function() {
        this.src = './assets/img/contacts/edit_hover.svg';
    });

    addInfos.addEventListener('mouseleave', function() {
        this.src = './assets/img/contacts/edit.svg';
    });
}

function hoverOnRemoveBtn() {
    let removeInfos = document.getElementById('remove_img');
    removeInfos.addEventListener('mouseenter', function() {
        this.src = './assets/img/contacts/remove_hover.svg';
    });

    removeInfos.addEventListener('mouseleave', function() {
        this.src = './assets/img/contacts/remove.svg';
    });
}