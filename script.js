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
  if (menu.style.display == 'none') {
    showDropdown(id);
  } else {
    hideDropdown(id);
  }
}

/**
 * Dropdown-Menü anzeigen
 * @param {string} id - ID des Dropdown-Menüs (muss zu umgebenden IDs passen) 
 */
function showDropdown(id) {
  const container = document.getElementById(id + 'InputContainer');
  const menu = document.getElementById(id + 'Menu');
  toggleDropdownIcon(id, true);
  container.style.borderColor = 'var(--lightBlue1)';
  menu.style.display = '';
  document.addEventListener("click", function clickedElsewhere() {
    hideDropdown(id);
    document.removeEventListener("click", clickedElsewhere);
  });
}

/**
 * Dropdown-Menü verbergen
 * @param {string} id - ID des Dropdown-Menüs (muss zu umgebenden IDs passen) 
 */
function hideDropdown(id) {
  const container = document.getElementById(id + 'InputContainer');
  const menu = document.getElementById(id + 'Menu');
  toggleDropdownIcon(id, false);
  container.style.borderColor = '';
  menu.style.display = 'none';
}

function toggleDropdownIcon(id, show) {
  const icon = document.getElementById(id + 'Icon');
  let iconSrc = icon.src;
  if (show) {
    if (!iconSrc.includes('active')) {
      icon.src = iconSrc.replace('.svg', '_active.svg');
    }
  } else { // keine weitere Bedingung nötig, da replace-Methode NUR wirksam, FALLS 'active' ohnehin in Dateipfad vorhanden ist
    icon.src = iconSrc.replace('_active', '');
  }
}