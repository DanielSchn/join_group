/**
 * Render quantity for Deadline on summary
 */
function showContactCard() {
  openContactCardWindow();
  openMobileContactCardWindow();
}


function openContactCardWindow() {
    const contactContainer = document.getElementById('mainContactDetails');
    const responsiveBackgroundSetup = document.getElementById('responsivContactCardBg');
    const mainContactContainer = document.getElementById('mainContactContainer');

    contactContainer.classList.add('slideIn');
    contactContainer.classList.remove('d-none');
    responsiveBackgroundSetup.classList.remove('d-none');
    mainContactContainer.classList.add('responsiveSlideIn');
    mainContactContainer.classList.remove('mobile-d-none');
}


function openMobileContactCardWindow() {
    const mainContactContainer = document.getElementById('mobileMainContactContainer');
    const setting_btn = document.getElementById('contactOptions');

    mainContactContainer.classList.remove('d-none');
    setting_btn.classList.add('d-none');
}


function hideContactCard() {
  closeContactCardWindow();
  closeMobileContactCardWindow();
}


function closeContactCardWindow() {
  const contactContainer = document.getElementById('mainContactDetails');
  const responsiveBackgroundSetup = document.getElementById('responsivContactCardBg');
  const mainContactContainer = document.getElementById('mainContactContainer');

  contactContainer.classList.add('slideIn');
  contactContainer.classList.add('d-none');
  responsiveBackgroundSetup.classList.add('d-none');
  mainContactContainer.classList.add('responsiveSlideIn');
  mainContactContainer.classList.add('mobile-d-none');
}


function closeMobileContactCardWindow() {
  const mainContactContainer = document.getElementById('mobileMainContactContainer');
  const setting_btn = document.getElementById('contactOptions');

  mainContactContainer.classList.add('d-none');
  setting_btn.classList.add('d-none');
}


function editContactInformation() {
  showContactCard();
  editCardWindow(true);
}


function editCardWindow(isGoingToOpen) {

    if(isGoingToOpen === true) {
        openEditCard();
        openMobileEditCard();
        toggleEditCard();
    } else {
        closeEditCard();
        closeMobileEditCard();
        toggleEditCard();
        showResponsiveEditCardWindow();
    }
}


function showResponsiveEditCardWindow() {
  const contact = document.getElementById('mainContactDetails');
  const responsiveBackgroundSetup = document.getElementById('responsivContactCardBg');

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


function toggleEditCard() {
  const closeEditCardWindow = document.getElementById('closeEditCardWindow');
  const addContactCard = document.getElementById('editCardOne');
  const editCardBg = document.getElementById('editCardBg');
  const mainContactCard = document.getElementById('mainContactContainer');
  const closeWindowLayer = document.getElementById('closeWindowLayer');

  closeEditCardWindow.classList.toggle('d-none');
  addContactCard.classList.toggle('slideIn');
  addContactCard.classList.toggle('slideOut');
  editCardBg.classList.toggle('d-none');
  mainContactCard.classList.toggle('mobile-d-none');
  closeWindowLayer.classList.toggle('d-none');
}

function openEditCard() {
    const editCard = document.getElementById('editCardOne');
    editCard.classList.remove('d-none');
}


function closeEditCard() {
    const mainContactCard = document.getElementById('mainContactContainer');
    const contactContainer = document.getElementById('mainContactDetails');

    mainContactCard.classList.remove('responsiveSlideIn');
    contactContainer.classList.remove('slideIn');
    stopEditCardAnimation();
}


function stopEditCardAnimation() {
  const animation = document.getElementById('editCardOne');
  function onAnimationEnd() {
    animation.classList.add('d-none');
    hideMobileEditContactCardOne();
    animation.removeEventListener('animationend', onAnimationEnd);
  }
  animation.addEventListener('animationend', onAnimationEnd);
}


function hideEditContactCardOne() {
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
}


/* Mobile Edit Contact Card */

function openMobileEditCard() {
  const mobileAddCardBg = document.getElementById('mobileEditCardBg');
  const mobileAddCardOne = document.getElementById('mobileEditCardOne');

  mobileAddCardBg.classList.remove('d-none');
  mobileAddCardOne.classList.remove('d-none');
  mobileAddCardOne.classList.remove('slideDown');
  mobileAddCardOne.classList.add('slideUp');
}


function closeMobileEditCard() {
  const mobileAddCardBg = document.getElementById('mobileEditCardBg');
  const mobileAddCardOne = document.getElementById('mobileEditCardOne');

  mobileAddCardBg.classList.add('d-none');
  mobileAddCardOne.classList.remove('slideUp');
  mobileAddCardOne.classList.add('slideDown');
  stopMobileEditCardAnimation();
}


function stopMobileEditCardAnimation() {
  const animation = document.getElementById('mobileEditCardOne');
  function onAnimationEnd() {
    animation.classList.add('d-none');
    hideEditContactCardOne();
    animation.removeEventListener('animationend', onAnimationEnd);
  }
  animation.addEventListener('animationend', onAnimationEnd);
}


function hideMobileEditContactCardOne() {
  const mobileAddCardBg = document.getElementById('mobileEditCardBg');
  const mobileAddCardOne = document.getElementById('mobileEditCardOne');

  mobileAddCardBg.classList.add('d-none');
  mobileAddCardOne.classList.add('slideDown');
  mobileAddCardOne.classList.remove('slideUp');
}