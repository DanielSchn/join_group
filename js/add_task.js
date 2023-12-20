let newTask = {
    id: -1,
    title: '',
    description: '',
    assignedTo: [],
    due: '',
    prio: '',
    category: '',
    subtasks: [],
    timestamp: 0,
    status: ''
};

async function initAddTask() {
    await init();
    renderAddTaskForm();
}

function renderAddTaskForm() {
    renderAddTaskAssigned();
    renderAddTaskSubtasks();
}

function renderAddTaskAssigned() {
    // const contacts = [LADEN VON USER-DATEN]
    const assigned = [];
    const contacts = [0, 1, 2];
    // const assigned = newTask['assigned']
    // ...
    const list = document.getElementById('addTaskAssignedMenu');
    list.innerHTML = '';
    for (let i = 0; i < 3; i++) { // ersetze 3 durch contacts.length
        let contact = contacts[i];
        let checkboxId = 'assignedContact' + i;
        list.innerHTML += contactAssignedHTML(contact, checkboxId);
        if (assigned.includes(i)) {
            toggleCheckbox(checkboxId);
        }
    }
}

function renderAddTaskSubtasks() {
    const subtasks = newTask['subtasks'];
    const list = document.getElementById('subtasksList');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        list.innerHTML += subtaskHTML(subtask, i);
    }
}

function focusAddTaskDue() {
    const container = document.getElementById('addTaskDueContainer');
    unfocusAll();
    console.log('focus');
    container.style.borderColor = 'var(--lightBlue1)';
    addTaskDueText.focus();
    document.addEventListener("mousedown", unfocusAddTaskDue); // reagiert auf Clicks abseits des Containers
}

function unfocusAddTaskDue() {
    console.log('unfocus');
    const container = document.getElementById('addTaskDueContainer');
    container.style.borderColor = '';
    setAddTaskDueText();
    document.removeEventListener("mousedown", unfocusAddTaskDue);
}

function autofillAddTaskDueText(e) {
    const value = addTaskDueText.value;
    const key = e.key;
    const length = value.length;
    addTaskDueContainer.style.borderColor = 'var(--lightBlue1)';
    if (key != ('Backspace' || '/') && (length == 2 || length == 5)) { // an den passenden Stellen...
        addTaskDueText.value = value + '/'; // ...automatisch '/' einfügen
    }
    checkAddTaskDueText();
}

function checkAddTaskDueText() {
    const value = addTaskDueText.value;
    if (value.length >= 10) {
        let transformedValue = transformDate(value); // String-Format umwandeln
        if (isDateValid(transformedValue)) {
            addTaskDueContainer.style.borderColor = 'var(--lightBlue1)';
            addTaskDue.value = transformedValue;
            setAddTaskDueText();
        } else {
            addTaskDueContainer.style.borderColor = '#FF8190'; // Border rot färben und...
            addTaskDueText.value = value.substring(0, 10); // ...Text auf 10 Zeichen begrenzen
        }
    }
}

function transformDate(ddmmyyyy) {
    let yyyy = ddmmyyyy.substring(6);
    let mm = ddmmyyyy.substring(3, 5);
    let dd = ddmmyyyy.substring(0, 2);
    return yyyy + '-' + mm + '-' + dd;
}

function isDateValid(yyyymmdd) {
    let date = new Date(yyyymmdd); // Date-Objekt erzeugen
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return date !== 'Invalid Date' && // keine unerlaubten Zeichen
        Date.now() <= Date.parse(date) && // Datum liegt in Zukunft
        (
            day <= 31 || // Tag kleiner als 31
            ((month == 4 || month == 6 || month == 9 || month == 11) && day <= 30) || // in bestimmten Monaten kleiner als 30
            (month == 2 && year % 4 == 0 && day <= 29) || // in Schaltjahren im Februar kleiner als 29
            (month == 2 && year % 4 !== 0 && day <= 28) // außerhalb von Schaltjahren kleiner als 28
        );
}

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
 * Button stylen
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
        btn.classList.remove('addTaskPrioBtnsSelected');
        btn.classList.remove(`addTaskPrio${index}Selected`);
        colorPrioBtnImg(index);
    }
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
        newTask['subtasks'].push(addSubtask.value);
        renderAddTaskSubtasks();
    }
    cancelSubtask();
}

/**
 * erstellt Input-Feld in Subtasks-Liste, um Subtask zu bearbeiten
 * @param {number} index - Laufindex innerhalb des subtasks-Array 
 */
function editSubtask(index) {
    let subtask = newTask['subtasks'][index];
    const li = document.getElementById(`subtask${index}`);
    li.innerHTML = editSubtaskHTML(subtask, index);
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
    let subtasks = newTask['subtasks'];
    if (input.value) {
        subtasks[index] = input.value;
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
    let subtasks = newTask['subtasks'];
    subtasks.splice(index, 1);
    renderAddTaskSubtasks();
}

function contactAssignedHTML(contact, id) {
    return /* html */`
        <li onclick="toggleCheckbox(${id})">
            <div class="contactInitials">
                <span id="user_name">AM</span>
            </div>
            <div class="contactDetails">
                        <div><span id="name">Anton</span><span id="lastname"> Mayer</span></div>
            </div>
            <button type="button" onclick="event.stopPropagation(); toggleCheckbox(${id})">
                <img id="${id}" src="./assets/img/checkbox.svg" alt="unchecked">
            </button>
        </li>`;
}

function subtaskHTML(subtask, index) {
    return /* html */`
        <li id="subtask${index}">
            &bull;
            <span ondblclick="editSubtask(${index})">${subtask}</span>
            <button type="button" onclick="event.stopPropagation(); editSubtask(${index})">
                <img src="./assets/img/edit.svg" alt="edit subtask">
            </button>
            <div class="vr"></div>
            <button type="button" onclick="removeSubtask(${index})">
                <img src="./assets/img/remove.svg" alt="remove subtask">
            </button>
        </li>`;
}

function editSubtaskHTML(subtask, index) {
    return /* html */`
        <input id="editSubtaskInput" onclick="event.stopPropagation()" type="text" value="${subtask}">    
        <button type="button" onclick="event.stopPropagation(); removeSubtask(${index})" class="subtasksButton">
            <img src="./assets/img/remove.svg" alt="remove subtask">
        </button>
        <div class="vr"></div>
        <button type="button" onclick="event.stopPropagation(); confirmSubtaskEdit(${index})" class="subtasksButton">
            <img src="./assets/img/check.svg" alt="confirm subtask edit">
        </button>
    `;
}