function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

/**
 * function for scale Logo by startup
 */
document.addEventListener("DOMContentLoaded", function () {
  let indexPage = document.querySelector('.rememberMe');
  if (indexPage) {
    const logo = document.getElementById('startLogo');
    const body = document.getElementById('mainBody');
    setTimeout(function () {
      logo.style.transform = "translate(0%, 0%) scale(1)";
      logo.style.top = '';
      logo.style.left = '';
    }, 500);
    logo.addEventListener("transitionend", function () {
      body.style.display = 'block';
    });
  }
});

/**
 * Definiert Pfeilrichtung in select-Elementen, wird dort per Klick aufgerufen
 * @param {string} id - ID des zu stylenden select-Elements
 */
// function showDropdown(id) {
//   const icon = document.getElementById(id + 'Icon');
//   const menu = document.getElementById(id + 'Menu');
//   event.preventDefault();
//   if (!icon.src.includes('active')) {
//     let iconSrc = icon.src;
//     icon.src = iconSrc.replace('.svg', '_active.svg'); // Pfeil nach oben
//     menu.style.display = 'initial';
//     document.addEventListener("mouseup", function hideDropdown() { // Listener für weiteren Click
//       icon.src = iconSrc.replace('_active', ''); // Pfeil nach oben
//       menu.style.display = 'none';
//       document.removeEventListener("mouseup", hideDropdown); // Listener entfernen
//     });
//   }
// }

function toggleDropdown(id) {
  const menu = document.getElementById(id + 'Menu');
  if(menu.style.display == 'none') {
    showDropdown(id);
  } else {
    hideDropdown(id);
  }
}

function showDropdown(id) {
  const container = document.getElementById(id + 'InputContainer');
  const btnPassive = document.getElementById(id + 'BtnPassive');
  const btnActive = document.getElementById(id + 'BtnActive');
  const menu = document.getElementById(id + 'Menu');
  container.style.borderColor = 'var(--lightBlue1)';
  menu.style.display = '';
  btnPassive.style.display = 'none';
  btnActive.style.display = '';
  document.addEventListener("click", function clickedElsewhere() {
    hideDropdown(id);
    document.removeEventListener("click", clickedElsewhere);
  });
}

function hideDropdown(id) {
  const container = document.getElementById(id + 'InputContainer');
  const btnPassive = document.getElementById(id + 'BtnPassive');
  const btnActive = document.getElementById(id + 'BtnActive');
  const menu = document.getElementById(id + 'Menu');
  container.style.borderColor = '';
  menu.style.display = 'none';
  btnPassive.style.display = '';
  btnActive.style.display = 'none';
}