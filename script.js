async function init() {
  await includeHTML();
  renderLogo();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
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
      logo.classList.add('transformed');
    }, 500);
    logo.addEventListener("transitionend", function () {
      body.style.display = 'block';
    });
  }
});


/**
 * Dropdown-Menü ein-/ausblenden
 * @param {string} id - ID des Dropdown-Menüs (muss zu umgebenden IDs passen) 
 */
function toggleDropdown(id) {
  const menu = document.getElementById(id + 'Menu');
  if (menu.style.display == 'none') {
    unfocusAll(); // aktuellen Fokus aufheben...
    showDropdown(id); // ...bevor neues Menü angezeigt wird
  } else {
    hideDropdown(id);
  }
}


/**
 * aktuellen Fokus aufheben
 */
function unfocusAll() {
  const dropdownMenus = document.querySelectorAll('.dropdownMenu'); // alle Elemente der Klasse .dropdownMenu
  document.activeElement.blur(); // Fokus aller Default-Form-Elemente aufheben
  for (let i = 0; i < dropdownMenus.length; i++) { // Fokus aller Dropdown-Menüs aufheben
    const dropdownMenu = dropdownMenus[i];
    let id = dropdownMenu.id;
    hideDropdown(id.replace('Menu', ''));
  }
  if (document.getElementById('addSubtask')) { // falls Element mit ID addSubtask vorhanden
    unfocusSubtask(); // Fokus auf das Element aufheben
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


/**
 * beim Dropdown-Menü richtiges Icon (Pfeilspitze) anzeigen
 * @param {string} id - ID des Dropdown-Menüs (muss zu umgebenden IDs passen) 
 * @param {boolean} show - signalisiert, ob Menü gezeigt (true) oder verborgen (false) wird
 */
function toggleDropdownIcon(id, show) {
  const icon = document.getElementById(id + 'Icon');
  let iconSrc = icon.src;
  if (show) {
    if (!iconSrc.includes('active')) {
      icon.src = iconSrc.replace('.svg', '_active.svg');
    }
  } else { // keine weitere Bedingung nötig, denn...
    icon.src = iconSrc.replace('_active', ''); // ...replace-Methode NUR wirksam, FALLS 'active' ohnehin in Dateipfad vorhanden ist
  }
}


/**
 * bestimmt automatisch, welche Option im Dropdown-Menü geklickt wurde und weist dem Input-Feld den entsprechenden Wert zu
 * @param {event} e - bei Funktionsaufruf 'event' als Parameter eintragen 
 */
function handleDropdownMenuClick(e) {
  const selected = e.target // geklicktes list item
  const category = selected.textContent;
  let id = selected.parentNode.id; // ID des übergeordneten (parent) ul-Elements
  id = id.replace('Menu', ''); // ergibt ID des zugehörigen Input-Feldes
  const input = document.getElementById(id);
  input.value = category;
}


function toggleCheckbox(checkbox) {
  let checkboxSrc = checkbox.src;
  if (checkboxSrc.includes('checked')) {
    checkbox.src = checkboxSrc.replace('_checked', '');
    checkbox.alt = 'unchecked';
  } else {
    checkbox.src = checkboxSrc.replace('.svg', '_checked.svg');
    checkbox.alt = 'checked';
  }
  checkbox.classList.toggle('checked');
}


/**
 * Renderfunction for the Username Logo in Header
 */
function renderLogo() {
  let loadedUserName = localStorage.getItem('userName');
  let capitalized = loadedUserName.charAt(0).toUpperCase();
  document.getElementById('use_name').innerHTML = capitalized;
}


/**
 * Login validation on all pages except the index.html page
 */
// document.addEventListener("DOMContentLoaded", function () {
//   if (window.location.href.indexOf("index.html") === -1) {
//       let isLoggedIn = localStorage.getItem("isLoggedIn");
//       if (!isLoggedIn) {
//           window.location.href = "index.html";
//       }
//   }
// });


function showHiddenMenu() {
  let menu = document.getElementById('hiddenMenu');
  menu.style.display = 'flex';
}


function hideHiddenMenu() {
  let menu = document.getElementById('hiddenMenu');
  menu.style.display = 'none';
}




if (document.getElementById('uniqueElement')) {
} else {
  document.addEventListener('click', bodyClick);
}


function bodyClick(event) {
  if (!event.target.closest('#hiddenMenu') && !event.target.closest('#user')) {
    hideHiddenMenu();
  }
}


function excludeDivClick(event) {
  event.stopPropagation();
}


function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}


/**
 * Login function and go to summary page when login User and password are match
 */
function login() {
  let email = document.getElementById('email');
  let password = document.getElementById('signUpPassword');
  let user = users.find(u => u.email == email.value && u.password == password.value);
  let guest = guests.find(u => u.email == email.value && u.password == password.value);
  console.log(user || guest);
  if (user || guest) {
    localStorage.setItem('isLoggedIn', 'true');
    window.setTimeout(function () {
      redirectToSummaryPage(user || guest);
    }, 500);
  } else {
    document.getElementById('userNotFound').style.display = 'block';
  }
}


function redirectToSummaryPage(user) {
  localStorage.setItem('userName', user.name);
  window.location.href = "summary.html";
}


// function generateToken(userId) {
//   const secretKey = 'DeinGeheimesSchluesselwort'; // Sollte sicher und geheim sein
//   const expiresIn = 3600; // Gültigkeitsdauer des Tokens in Sekunden (hier: 1 Stunde)

//   const expirationTime = Date.now() + expiresIn * 1000; // Umrechnung in Millisekunden
//   const tokenPayload = {
//       userId: userId,
//       exp: expirationTime / 1000 // UNIX-Zeitstempel in Sekunden
//   };

//   const token = btoa(JSON.stringify(tokenPayload)); // Base64-Kodierung (vereinfacht)
//   return token;
// }


// // Funktion zum Überprüfen eines Tokens
// function verifyToken(token) {
//   const secretKey = 'DeinGeheimesSchluesselwort'; // Sollte mit dem beim Generieren verwendeten übereinstimmen

//   try {
//       const decodedToken = JSON.parse(atob(token)); // Base64-Dekodierung (vereinfacht)
//       return decodedToken.exp * 1000 > Date.now(); // Überprüfen der Gültigkeit
//   } catch (error) {
//       return false; // Das Token ist ungültig
//   }
// }


// const userId = 123; // Hier solltest du die tatsächliche Benutzer-ID verwenden
// const token = generateToken(userId);
// localStorage.setItem("token", token);


// document.addEventListener("DOMContentLoaded", function () {
//   if (window.location.href.indexOf("index.html") === -1) {
//       let token = localStorage.getItem("token");
//       if (!token || !verifyToken(token)) {
//           window.location.href = "index.html";
//       }
//   }
// });