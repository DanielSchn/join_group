const PRIOS = [null, 'urgent', 'medium', 'low'];

let submitOnEnter = true; // Ergänzung zu automatischer HTML-Mechanik
let newTask = {
    assignedTo: [],
    subtasks: [],
    status: ''
};


/**
 * Initialisierung (bei Onload, Body)
 * @param {string} status 
 */
async function initAddTask(status) {
    // await init();
    await includeHTML();
    submitBtn.disabled = true;
    TEST_TASKS = '';
    TEST_TASKS = JSON.parse(await getItem('test')); // Tasks laden - SPÄTER ERSETZEN
    renderAddTaskForm();
    document.addEventListener('keydown', submitFormOnEnter);
    let today = new Date(); // heutiges Datum
    addTaskDue.min = today.toISOString().slice(0, -14); // Minimalwert von Date-Input auf heutigen Tag setzen
    submitBtn.disabled = false;
    newTask['status'] = status;
    init();
}


/**
 * allgemeine Render-Funktion
 */
function renderAddTaskForm() {
    renderAddTaskAssignedList();
    renderAddTaskAssignedIcons();
    renderAddTaskSubtasks();
}


/**
 * assigned-Liste rendern
 */
function renderAddTaskAssignedList() {
    const contacts = TEST_CONTACTS;
    const assigned = newTask['assignedTo'];
    const list = document.getElementById('addTaskAssignedMenu');
    list.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let checkboxId = 'assignedContact' + i;
        list.innerHTML += contactAssignedHTML(contact, checkboxId);
        if (assigned.includes(i)) {
            toggleAssigned(checkboxId);
        }
    }
}


/**
 * assigned-Icons rendern
 */
function renderAddTaskAssignedIcons() {
    const contacts = TEST_CONTACTS;
    const assigned = newTask['assignedTo'];
    assignedIcons.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (assigned.includes(i)) {
            assignedIcons.innerHTML += contactAssignedIconHTML(contact);
        }
    }
}


/**
 * bei Enter-Key Submit-Button auslösen (Ergänzung zu HTML-Mechanik)
 * @param {event} e - Event für Key-Abfrage
 */
function submitFormOnEnter(e) {
    if (submitOnEnter) {
        if (addTaskForm && e.key == 'Enter') { // falls "Add Task"-Formular geladen ist und Enter gedrückt wurde
            unfocusAll(); // Fokus aufheben
            submitBtn.click(); // Submit-Button auslösen
        }
        removeEventListener('keydown', submitFormOnEnter); // Listener entfernen
    }
}


/**
 * Formular resetten
 */
function resetTaskForm() {
    const prio = getTaskPrioId();
    if (prio) { // falls Priorität vorhanden
        unselectPrioBtn(prio); // Priorität entfernen
    }
    stylePrioBtn(2, 2); // Priorität resetten
    newTask['assignedTo'] = []; // assigned resetten
    newTask['subtasks'] = []; // Subtasks resetten
    renderAddTaskForm();
}


/**
 * Task hinzufügen
 */
async function submitTask() {
    setAddTaskDueText(); // Datum-Inputs synchronisieren
    TEST_TASKS.push({ // später durch echtes Tasks-Array (global oder user-individuell ersetzen - falls individuell, mit for-Schleife bei allen zugeordneten Usern hinzufügen)
        id: TEST_TASKS.length,
        title: addTaskTitle.value,
        description: addTaskDescription.value,
        assignedTo: newTask['assignedTo'],
        due: addTaskDueText.value,
        prio: PRIOS[getTaskPrioId()],
        category: addTaskCategory.value,
        subtasks: newTask['subtasks'],
        timestamp: getTimestamp(),
        status: newTask['status']
    });
    submitBtn.disabled = true;
    await setItem('test', JSON.stringify(TEST_TASKS));
    submitBtn.disabled = false;
    showTaskAddedMsg();
    goToBoard();
}


/**
 * Message "Task added to board" in Viewport bewegen
 */
function showTaskAddedMsg() {
    const message = document.getElementById('toastMsg');
    message.style.transform = 'translateY(-50vh)';
}


/**
 * Weiterleitung zum Kanban-Board
 */
function goToBoard() {
    window.setTimeout(function () {
        window.location.href = './board.html';
    }, 500);
}