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