//let tasks = [];

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
 * aktuellen Timestamp ausgeben
 * @returns Timestamp als Zahl
 */
function getTimestamp() {
  const currentDate = new Date();
  return currentDate.getTime();
}

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
  if(document.getElementById('addTaskAssigned')) {
    unfocusAssigned();
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
  const nameParts = loadedUserName.split(' ');
  const capitalized = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  document.getElementById('use_name').innerHTML = capitalized;

}


/**
 * Function to show the hidden menu behind the Userlogo in the Header.
 * The style attribute for display will change to 'flex'
 */
function showHiddenMenu() {
  let menu = document.getElementById('hiddenMenu');
  menu.style.display = 'flex';
}


/**
 * Function to hide the hidden menu.
 * The style attribute for display will change to 'none'
 */
function hideHiddenMenu() {
  let menu = document.getElementById('hiddenMenu');
  menu.style.display = 'none';
}



/**
 * Check if an Element with the id 'uniqueElement' is on the site. When this Element will be present, it will do nothing.
 * If the Element is not present, the bodyClick function, to hide the hiddenMenu, will work. 
 */
if (document.getElementById('uniqueElement')) {
} else {
  document.addEventListener('click', bodyClick);
}


/**
 * Check function for the click to hideHiddenMenu()
 */
function bodyClick(event) {
  if (!event.target.closest('#hiddenMenu') && !event.target.closest('#user')) {
    hideHiddenMenu();
  }
}


/**
 * Logout function. This will delete all information in the local Storage
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.href = 'index.html';
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
    const token = generateToken(user || guest);
    localStorage.setItem("token", token);
    window.setTimeout(function () {
      redirectToSummaryPage(user || guest);
    }, 500);
  } else {
    document.getElementById('userNotFound').style.display = 'block';
  }
}


/**
 * Go to summary Page after successfull login
 * 
 * @param {string} user - User Info for rendering some Userspecific HTML Data
 */
function redirectToSummaryPage(user) {
  localStorage.setItem('userName', user.name);
  window.location.href = "summary.html";
}


/**
 * Generate Token for login validation. BTOA Base64 will create an ASCII string for encode.
 * Will use an expiration time in 12h. Will be enough for a working day.
 * 
 * @param {array} userId - The User Info Array with Name, Email and password.
 * @returns 
 */
function generateToken(userId) {
  console.log(userId);
  const expiresIn = 43200;
  const expirationTime = Date.now() + expiresIn * 1000;
  const tokenPayload = {
    userId: userId,
    exp: expirationTime / 1000
  };
  const token = btoa(JSON.stringify(tokenPayload));
  return token;
}


/**
 * Verify the generated token when load another Page from the Website Project.
 * ATOB decode the token.
 * UNIX Timestamp.
 * 
 * @param {value} token - The generated token from the localStorage 
 * @returns 
 */
function verifyToken(token) {
  try {
    const decodedToken = JSON.parse(atob(token));
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}


// DIESE FUNKTION IST DAFÜR DA UM DEN LOGGED IN STATUS ZU VALIDIEREN. WENN SIE AKTIV IST DANN KÖNNT IHR EURE SEITEN NUR AUFRUFEN WENN IHR EINGELOGGT SEID!!!!!

// /**
//  * Event Listener at DOM Content Loaded. Will check and verify the login token in the local Storage.
//  */
// document.addEventListener("DOMContentLoaded", function () {
//   if (window.location.href.indexOf("index.html") === -1) {
//       let token = localStorage.getItem("token");
//       if (!token || !verifyToken(token)) {
//           window.location.href = "index.html";
//       }
//   }
// });