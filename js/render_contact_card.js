function openAddCardOne() {
    const addNewContactBg = document.getElementById('addContactBg');
    const addNewContactBtn = document.getElementById('addCardOne');

    addNewContactBg.classList.remove('d-none');
    addNewContactBtn.classList.remove('d-none');
    addNewContactBtn.classList.remove('slideOut');
    addNewContactBtn.classList.add('slideIn');
    openMobileAddContactCardOne();
}


function closeAddCardOne() {
    const addNewContactBg = document.getElementById('addContactBg');
    const addNewContactBtn = document.getElementById('addCardOne');

    addNewContactBg.classList.add('d-none');
    addNewContactBtn.classList.remove('slideIn');
    addNewContactBtn.classList.add('slideOut');
    stopAnimation();
    hideMobileAddContactCardOne();
}


function stopAnimation() {
    const animation = document.getElementById('addCardOne');
    function onAnimationEnd() {
      animation.classList.add('d-none');
      animation.removeEventListener('animationend', onAnimationEnd);
    }
    animation.addEventListener('animationend', onAnimationEnd);
  }


  function hideAddContactCardOne() {
    const addNewContactBg = document.getElementById('addContactBg');
    const addNewContactBtn = document.getElementById('addCardOne');

    addNewContactBg.classList.add('d-none');
    addNewContactBtn.classList.add('d-none');
    addNewContactBtn.classList.remove('slideIn');
    addNewContactBtn.classList.add('slideOut');
  }


function openMobileAddContactCardOne() {
    const mobileAddCardBg = document.getElementById('mobileAddCardBg');
    const mobileAddCardOne = document.getElementById('mobileAddCardOne');

    mobileAddCardBg.classList.remove('d-none');
    mobileAddCardOne.classList.remove('d-none');
    mobileAddCardOne.classList.remove('slideDown');
    mobileAddCardOne.classList.add('slideUp');
    openAddCardOne();
}


function closeMobileAddContactCardOne() {
    const mobileAddCardBg = document.getElementById('mobileAddCardBg');
    const mobileAddCardOne = document.getElementById('mobileAddCardOne');

    mobileAddCardBg.classList.add('d-none');
    mobileAddCardOne.classList.add('slideDown');
    mobileAddCardOne.classList.remove('slideUp');
    stopMobileAnimation();
    hideAddContactCardOne();
}


function stopMobileAnimation() {
    const animation = document.getElementById('mobileAddCardOne');
    function onMobileAnimationEnd() {
      animation.classList.add('d-none');
      animation.removeEventListener('animationend', onMobileAnimationEnd);
    }
    animation.addEventListener('animationend', onMobileAnimationEnd);
  }


  function hideMobileAddContactCardOne() {
    const mobileAddCardBg = document.getElementById('mobileAddCardBg');
    const mobileAddCardOne = document.getElementById('mobileAddCardOne');

    mobileAddCardBg.classList.add('d-none');
    mobileAddCardOne.classList.add('d-none');
    mobileAddCardOne.classList.add('slideDown');
    mobileAddCardOne.classList.remove('slideUp');
  }


function showAndHideContactCard() {
    contactCardWindow();
    mobileContactCardWindow();
}


function contactCardWindow() {
    const contactContainer = document.getElementById('mainContactDetails');
    const responsiveBackgroundSetup = document.getElementById('responsivBackgroundSetup');
    const mainContactContainer = document.getElementById('mainContactContainer');

    contactContainer.classList.add('slideIn');
    contactContainer.classList.remove('d-none');
    responsiveBackgroundSetup.classList.toggle('d-none');
    mainContactContainer.classList.add('responsiveSlideIn');
    mainContactContainer.classList.remove('mobile-d-none');
}


function mobileContactCardWindow() {
    const mainContactContainer = document.getElementById('mobileMainContactContainer');
    const setting_btn = document.getElementById('contactOptions');

    mainContactContainer.classList.toggle('d-none');
    setting_btn.classList.add('d-none');
}


function editContactInformation() {
    contactCardWindow();
    addCardWindow(true);
}


function addCardWindow(isGoingToOpen) {

    if(isGoingToOpen === true) {
        openAddCard();
        openMobileAddCard();
    } else {
        closeAddCard();
        closeMobileAddCard();
        showResponsiveAddCardWindow();
    }
}


function openAddCard() {
    const addContact_bg = document.getElementById('editCardBg');
    const addContactCard = document.getElementById('editCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');

    addContact_bg.classList.remove('d-none');
    addContactCard.classList.remove('d-none');
    addContactCard.classList.remove('slideOut');
    addContactCard.classList.add('slideIn');
    mainContactCard.classList.add('mobile-d-none');
}


function openMobileAddCard() {
    const mobileAddCardBg = document.getElementById('mobileEditCardBg');
    const mobileAddCardOne = document.getElementById('mobileEditCardOne');

    mobileAddCardBg.classList.remove('d-none');
    mobileAddCardOne.classList.remove('d-none');
    mobileAddCardOne.classList.remove('slideDown');
    mobileAddCardOne.classList.add('slideUp');
}


function closeAddCard() {
    const addContact_bg = document.getElementById('editCardBg');
    const addContactCard = document.getElementById('editCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');
    const contactContainer = document.getElementById('mainContactDetails');
    
    addContact_bg.classList.add('d-none');
    addContactCard.classList.remove('slideIn');
    addContactCard.classList.add('slideOut');
    mainContactCard.classList.remove('mobile-d-none');
    mainContactCard.classList.remove('responsiveSlideIn');
    contactContainer.classList.remove('slideIn');
    stopEditCardOneAnimation();
    hideMobileEditContactCardOne();
}


function stopEditCardOneAnimation() {
    const animation = document.getElementById('editCardOne');
    function onEditCardOneAnimationEnd() {
      animation.classList.add('d-none');
      animation.removeEventListener('animationend', onEditCardOneAnimationEnd);
    }
    animation.addEventListener('animationend', onEditCardOneAnimationEnd);
  }


  function hideMobileEditContactCardOne() {
    const mobileAddCardBg = document.getElementById('mobileEditCardBg');
    const mobileAddCardOne = document.getElementById('mobileEditCardOne');

    mobileAddCardBg.classList.add('d-none');
    mobileAddCardOne.classList.add('d-none');
    mobileAddCardOne.classList.add('slideDown');
    mobileAddCardOne.classList.remove('slideUp');
  }


function closeMobileAddCard() {
    const mobileAddCardBg = document.getElementById('mobileEditCardBg');
    const mobileAddCardOne = document.getElementById('mobileEditCardOne');

    mobileAddCardBg.classList.add('d-none');
    mobileAddCardOne.classList.remove('slideUp');
    mobileAddCardOne.classList.add('slideDown');
    stopMobileEditCardOneAnimation();
    hideEditContactCardOne();
}


function stopMobileEditCardOneAnimation() {
    const animation = document.getElementById('mobileEditCardOne');
    function onMobileEditCardOneAnimationEnd() {
      animation.classList.add('d-none');
      animation.removeEventListener('animationend', onMobileEditCardOneAnimationEnd);
    }
    animation.addEventListener('animationend', onMobileEditCardOneAnimationEnd);
  }


  function hideEditContactCardOne() {
    const addContact_bg = document.getElementById('editCardBg');
    const addContactCard = document.getElementById('editCardOne');
    const mainContactCard = document.getElementById('mainContactContainer');
    const contactContainer = document.getElementById('mainContactDetails');
    
    addContact_bg.classList.add('d-none');
    addContactCard.classList.add('d-none');
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


function showSettings() {
    const setting_btn = document.getElementById('contactOptions');
    const setting_bg_layer = document.getElementById('contactOptionBgLayer');

    setting_btn.classList.remove('d-none');
    setting_btn.classList.remove('mobileSlideOutToRight');
    setting_btn.classList.add('mobileSlideInFromRight');
    setting_bg_layer.classList.remove('d-none');
}


function hideSettings() {
    const setting_btn = document.getElementById('contactOptions');
    const setting_bg_layer = document.getElementById('contactOptionBgLayer');

    setting_btn.classList.remove('mobileSlideInFromRight');
    setting_btn.classList.add('mobileSlideOutToRight');
    setting_bg_layer.classList.add('d-none');
}