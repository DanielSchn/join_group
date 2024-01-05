function openAddCardOne() {
    const addNewContactBg = document.getElementById('addContactBg');
    const addNewContactBtn = document.getElementById('addCardOne');

    addNewContactBg.classList.remove('d-none');
    addNewContactBtn.classList.remove('d-none');
    addNewContactBtn.classList.remove('slideOut');
    addNewContactBtn.classList.add('slideIn');
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
  

  /* Mobile Add Contact Card */

  function openMobileAddContactCardOne() {
    const mobileAddCardBg = document.getElementById('mobileAddCardBg');
    const mobileAddCardOne = document.getElementById('mobileAddCardOne');

    mobileAddCardBg.classList.remove('d-none');
    mobileAddCardOne.classList.remove('d-none');
    mobileAddCardOne.classList.remove('slideDown');
    mobileAddCardOne.classList.add('slideUp');
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