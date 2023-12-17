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
function toggleSelectArrow(id) {
  const select = document.getElementById(id);
  let arrowImgSrc = 'url(./assets/img/select_icon.svg)';
  select.style.backgroundImage = arrowImgSrc.replace('.svg', '_active.svg'); // Pfeil nach oben
  document.addEventListener("mouseup", function resetArrow() { // Listener für weiteren Click
    select.style.backgroundImage = arrowImgSrc; // Pfeil nach oben
    document.removeEventListener("mouseup", resetArrow); // Listener entfernen
  });
}