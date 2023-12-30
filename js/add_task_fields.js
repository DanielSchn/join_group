/**
 * Kontakt in sichtbarer Assigned-Liste markieren oder Markierung entfernen
 * @param {element} checkbox - ID/Element der Checkbox 
 */
function toggleAssigned(checkbox) {
    const li = checkbox.parentNode.parentNode; // selektiere li-Element aus Checkbox-ID
    let id = checkbox.id; // erhalte ID-String
    id = id.charAt(id.length - 1); // ID-Zahl ist letztes Zeichen aus String
    id = parseInt(id); // zu Zahl umwandeln
    li.classList.toggle('addTaskAssignedChecked');
    toggleCheckbox(checkbox);
    toggleAssignedArray(id);
    renderAddTaskAssignedIcons();
}


/**
 * Kontakt in assignedTo-Array hinzufügen oder entfernen
 * @param {number} id - Kontakt-ID aus assignedTo-Array
 */
function toggleAssignedArray(id) {
    let assigned = currentTask['assignedTo'];
    if (assigned.includes(id)) {
        const index = assigned.indexOf(id); // bestimme Index der Kontakt-ID im assignedTo-Array
        assigned.splice(index, 1); // ID entfernen
    } else {
        assigned.push(id); // ID hinzufügen
    }
}


/**
 * subtasks rendern
 */
function renderAddTaskSubtasks() {
    const subtasks = currentTask['subtasks'];
    const list = document.getElementById('subtasksList');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        list.innerHTML += subtaskHTML(subtask['title'], i);
    }
}


/**
 * due-Feld fokussieren
 */
function focusAddTaskDue() {
    const container = document.getElementById('addTaskDueContainer');
    unfocusAll();
    container.style.borderColor = 'var(--lightBlue1)';
    addTaskDueText.focus();
    document.addEventListener("mousedown", unfocusAddTaskDue); // reagiert auf Clicks abseits des Containers
}


/**
 * due-Fokus aufheben
 */
function unfocusAddTaskDue() {
    const container = document.getElementById('addTaskDueContainer');
    container.style.borderColor = '';
    setAddTaskDueText();
    document.removeEventListener("mousedown", unfocusAddTaskDue);
}


/**
 * an passenden Stellen automatisch '/' einfügen
 * @param {event} e 
 */
function autofillAddTaskDueText(e) {
    const value = addTaskDueText.value;
    const key = e.key;
    const length = value.length;
    addTaskDueContainer.style.borderColor = 'var(--lightBlue1)';
    if (key != ('Backspace' || '/') && (length == 2 || length == 5)) { // an den passenden Stellen...
        addTaskDueText.value = value + '/'; // ...automatisch '/' einfügen
    }
    checkAddTaskDueText(); // Eingabe prüfen
}


/**
 * Datumseingabe prüfen
 */
function checkAddTaskDueText() {
    const value = addTaskDueText.value;
    if (value.length >= 10) {
        let transformedValue = transformDate(value); // String-Format umwandeln
        if (isDateValid(transformedValue)) {
            addTaskDueContainer.style.borderColor = 'var(--lightBlue1)';
            addTaskDue.value = transformedValue;
        } else {
            addTaskDueContainer.style.borderColor = '#FF8190'; // Border rot färben und...
            addTaskDueText.value = value.substring(0, 10); // ...Text auf 10 Zeichen begrenzen
        }
    }
}


/**
 * Datumsstring umkehren
 * @param {string} ddmmyyyy
 * @returns yyyymmdd
 */
function transformDate(ddmmyyyy) {
    let yyyy = ddmmyyyy.substring(6);
    let mm = ddmmyyyy.substring(3, 5);
    let dd = ddmmyyyy.substring(0, 2);
    return yyyy + '-' + mm + '-' + dd;
}


/**
 * Datum auf Gültigkeit prüfen
 * @param {string} yyyymmdd 
 * @returns TRUE, falls Datum gültig, FALSE, falls ungültig
 */
function isDateValid(yyyymmdd) {
    let date = new Date(yyyymmdd); // Date-Objekt erzeugen
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return date !== 'Invalid Date' && // keine unerlaubten Zeichen
        Date.now() <= Date.parse(date) && // Datum liegt nicht in Vergangenheit
        monthContainsDay(day, month, year) // Tag in Monat enthalten
}


/**
 * Prüfen, ob der jeweilige Tag sich im Monat befindet (wird durch Default-Methoden für Date-Objekte noch nicht erfüllt)
 * @param {number} day 
 * @param {number} month
 * @param {number} year  
 * @returns TRUE, falls Tag in Monat enthalten, FALSE, falls nicht
 */
function monthContainsDay(day, month, year) {
    return (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) || // Monate mit 31 Tagen
        ((month == 4 || month == 6 || month == 9 || month == 11) && day <= 30) || // in bestimmten Monaten kleiner gleich 30
        (month == 2 && year % 4 == 0 && day <= 29) || // in Schaltjahren im Februar kleiner gleich 29
        (month == 2 && year % 4 !== 0 && day <= 28); // außerhalb von Schaltjahren kleiner gleich 28
}


/**
 * Text-Input an Date-Input anpassen
 */
function setAddTaskDueText() {
    if (addTaskDue.value) {
        const date = new Date(addTaskDue.value);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        mm = ('0' + mm).slice(-2); // füge vorher 0 hinzu (als String)
        let dd = date.getDate();
        dd = ('0' + dd).slice(-2); // füge vorher 0 hinzu (als String)
        addTaskDueText.value = dd + '/' + mm + '/' + yyyy;
    } else {
        addTaskDueText.value = '';
    }
}


/** 
 * Funktion bestimmt, was bei Klick auf einen der drei Prioritätsbuttons geschieht 
 * @param {number} btnNumber - Laufindex des geklickten Buttons (1: urgent, 2: medium, 3: low) 
 */
function handlePrioBtnClick(btnNumber) {
    for (let i = 1; i <= 3; i++) {
        stylePrioBtn(i, btnNumber);
    }
}


/** 
 * Prio-Button stylen
 * @param {number} index - Laufindex des zu stylenden Buttons
 * @param {*} btnNumber - Laufindex des geklickten Buttons
 */
function stylePrioBtn(index, btnNumber) {
    const btn = document.getElementById('addTaskPrio' + index);
    if (index == btnNumber) { // falls dieser Button geklickt wurde
        btn.classList.toggle('addTaskPrioBtnsSelected');
        btn.classList.toggle(`addTaskPrio${index}Selected`);
        togglePrioBtnImg(index);
    } else { // CSS-Klassen entfernen, falls anderer Button geklickt wurde
        unselectPrioBtn(index);
    }
}


/**
 * entfernt die bei Selektion hinzugefügten Klassen und Färbung
 * @param {*} index - Laufindex des zu stylenden Buttons 
 */
function unselectPrioBtn(index) {
    const btn = document.getElementById('addTaskPrio' + index);
    btn.classList.remove('addTaskPrioBtnsSelected');
    btn.classList.remove(`addTaskPrio${index}Selected`);
    colorPrioBtnImg(index);
}


/** 
 * <img> im Button durch Pfadänderung stylen
 * @param {number} index - Laufindex des Buttons 
 */
function togglePrioBtnImg(index) {
    const img = document.getElementById(`addTaskPrio${index}Img`);
    if (img.src.includes('white')) {
        colorPrioBtnImg(index);
    } else {
        let newSrc = img.src.replace('.svg', '_white.svg');
        img.src = newSrc;
    }
}


/** 
 * <img> im Button bunt färben
 * @param {number} index - Laufindex des Buttons 
 */
function colorPrioBtnImg(index) {
    const img = document.getElementById(`addTaskPrio${index}Img`);
    if (img.src.includes('white')) {
        let newSrc = img.src.replace('_white', '');
        img.src = newSrc;
    }
}


/**
 * Task-Priorität aus Formularstatus auslesen
 * @returns Priorität als Zahl (wie im globalem PRIOS-Array)
 */
function getTaskPrioId() {
    const prioBtn = document.getElementsByClassName('addTaskPrioBtnsSelected');
    let prioId = 0;
    if (prioBtn.length > 0) {
        prioId = prioBtn[0].id; // String
        prioId = prioId.slice(-1); // erhalte letztes Zeichen
        prioId = parseInt(prioId); // Umwandlung in Zahl
    }
    return prioId;
}


/** 
 * Fokussierung des Input-Feldes für Subtasks
 */
function focusSubtask() {
    const container = document.getElementById('addSubtaskInputContainer');
    const btnsPassive = document.getElementById('addSubtaskIconsPassive');
    const btnsActive = document.getElementById('addSubtaskIconsActive');
    unfocusAll();
    container.style.borderColor = 'var(--lightBlue1)';
    addSubtask.focus();
    btnsPassive.style.display = 'none';
    btnsActive.style.display = '';
    document.addEventListener("click", unfocusSubtask); // reagiert auf Clicks abseits des Containers
    submitOnEnter = false;
    document.addEventListener("keydown", createSubtaskOnEnter); // Subtasks mit Enter hinzufügen
}


/**
 * Fokus aufheben
 */
function unfocusSubtask() {
    const container = document.getElementById('addSubtaskInputContainer');
    container.style.borderColor = '';
    if (addSubtask.value == '') {
        const btnsPassive = document.getElementById('addSubtaskIconsPassive');
        const btnsActive = document.getElementById('addSubtaskIconsActive');
        btnsPassive.style.display = '';
        btnsActive.style.display = 'none';
    }
    document.removeEventListener("click", unfocusSubtask);
    submitOnEnter = true;
    document.removeEventListener("keydown", createSubtaskOnEnter);
}


/**
 * Cancel-Button löscht eingetragenen Wert und hebt Fokus auf
 */
function cancelSubtask() {
    addSubtask.value = '';
    unfocusSubtask();
}


/**
 * Check-Button erzeugt Subtask, falls Wert eingetragen
 */
function createSubtask() {
    if (addSubtask.value) {
        currentTask['subtasks'].push({
            title: addSubtask.value,
            status: 'toDo'
        });
        renderAddTaskSubtasks();
    }
    subtasksScrollBottom();
    cancelSubtask();
}


/**
 * Subtasks nach unten scrollen
 */
function subtasksScrollBottom() {
    let element = window;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0); // Viewport-Breite (Cross-Browser-Lösung)
    if(vw > 1050) { // falls zweispaltiges Layout
        element = subtasksList.parentNode.parentNode; // scrollen in Subtasks-Liste statt im Fenster
    }
    element.scrollTo(0, document.body.scrollHeight); // nach unten scrollen
}


/**
 * wird ein Subtask mittels Enter-Key erstellt, wird das Input-Feld danach wieder fokussiert
 * @param {event} e - Event zur Key-Abfrage
 */
function createSubtaskOnEnter(e) {
    if (e.key == 'Enter') {
        e.preventDefault();
        createSubtask();
        focusSubtask();
    }
}


/**
 * erstellt Input-Feld in Subtasks-Liste, um Subtask zu bearbeiten
 * @param {number} index - Laufindex innerhalb des subtasks-Array 
 */
function editSubtask(index) {
    let subtask = currentTask['subtasks'][index];
    const li = document.getElementById(`subtask${index}`);
    li.innerHTML = editSubtaskHTML(subtask['title'], index);
    li.classList.add('editSubtask');
    const input = document.getElementById('editSubtaskInput');
    const length = input.value.length;
    input.focus();
    input.setSelectionRange(length, length);
    document.addEventListener("click", renderAddTaskSubtasks); // Klick neben Liste wird als Abbruch der Bearbeitung gewertet
}


/**
 * Bestätigung der Subtask-Bearbeitung
 * @param {number} index - Laufindex innerhalb des subtasks-Array 
 */
function confirmSubtaskEdit(index) {
    const input = document.getElementById('editSubtaskInput');
    let subtasks = currentTask['subtasks'];
    if (input.value) {
        subtasks[index]['title'] = input.value;
    } else {
        subtasks.splice(index, 1);
    }
    renderAddTaskSubtasks();
}


/**
 * Subtask aus Liste und Daten entfernen
 * @param {number} index - Laufindex innerhalb des subtasks-Array 
 */
function removeSubtask(index) {
    let subtasks = currentTask['subtasks'];
    subtasks.splice(index, 1);
    renderAddTaskSubtasks();
}