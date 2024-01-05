const PRIOS = [null, 'urgent', 'medium', 'low'];

let submitOnEnter = true; // Ergänzung zu automatischer HTML-Mechanik
let currentTask = {};


// falls Add Task im Board geöffnet und Fenster auf 1-Spalten-Layout skaliert wird, Fenster schließen
// (Add-Button leitet bei dieser Fenstergröße auf add_task.html weiter)
window.addEventListener('resize', function () {
    if (isAddTaskFromBoard()) {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth <= 700) {
            closeTask();
        }
    }
});


function isAddTaskFromBoard() {
    return document.getElementById('addTaskForm') && document.getElementById('taskContainer') && // falls Add Task im Board geöffnet
    !document.getElementById('addTaskCard').classList.contains('editTaskCard'); // falls nicht im Bearbeitungsmodus
}


/**
 * Initialisierung (bei Onload, Body)
 * @param {string} status - Bearbeitungsstatus des Tasks
 */
async function initAddTask(status) {
    initCurrentTask();
    await init();
    submitBtn.disabled = true;
    renderAddTaskForm();
    document.addEventListener('keydown', submitFormOnEnter);
    let today = new Date(); // heutiges Datum
    addTaskDue.min = today.toISOString().slice(0, -14); // Minimalwert von Date-Input auf heutigen Tag setzen
    submitBtn.disabled = false;
    currentTask['status'] = status;
}


function initCurrentTask() {
    currentTask = {
        id: -1,
        assignedTo: [],
        subtasks: [],
        status: ''
    }
}


async function editTask(id) {
    const task = tasks[id];
    await showEditTaskCard(task['status']);
    currentTask['id'] = id;
    currentTask['assignedTo'] = task['assignedTo'];
    currentTask['subtasks'] = task['subtasks'];
    renderAddTaskForm();
    togglePrioTransition();
    unselectPrioBtn(2); // Default-Prio entfernen
    prefillForm(task);
    togglePrioTransition();
    addTaskHeadline.style.display = 'none';
    addTaskCategoryContainer.style.display = 'none';
    addTaskCancelBtn.style.display = 'none';
    submitBtn.innerHTML = 'Ok';
}


async function deleteTask(id) { // Überprüfung: Stimmen nach Ausführung alle IDs mit der Position überein?
    tasks.splice(id, 1);
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        task['id'] = i;
    }
    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * allgemeine Render-Funktion
 */
function renderAddTaskForm() {
    renderAddTaskAssignedList();
    renderAddTaskSubtasks();
}


function prefillForm(task) {
    const prio = PRIOS.indexOf(task['prio']);
    addTaskTitle.value = task['title'];
    addTaskDescription.value = task['description'];
    precheckAssignedList();
    addTaskDueText.value = task['due'];
    addTaskDue.value = transformDate(task['due']);
    stylePrioBtn(prio, prio);
    addTaskCategory.value = categories[task['category']];
}


function changeClearBtn() {
    hideClearBtn();
    addTaskCancelBtn.style.display = '';
}


function hideClearBtn() {
    addTaskClearBtn.style.display = 'none';   
}


/**
 * assigned-Liste rendern
 */
function renderAddTaskAssignedList() {
    const list = document.getElementById('addTaskAssignedMenu');
    list.innerHTML = '';
    if (userId != -1) { // falls als vollständiger User, nicht als Gast eingeloggt
        let checkbox = 'assignedContact' + userId; // aktiver User
        list.innerHTML += contactAssignedHTML(users[userId], checkbox);
        for (let i = 0; i < users.length; i++) {
            if (i != userId) { // aktiver User bereits gerendert, wird daher übersprungen
                let checkbox = 'assignedContact' + i;
                list.innerHTML += contactAssignedHTML(users[i], checkbox);
            }
        }
    } else {
        list.innerHTML += contactAssignedHTML(guests[0], 'assignedContact' + '-1'); // aktiver User
    }
}


function precheckAssignedList() {
    const assigned = currentTask['assignedTo'];
    for (let i = 0; i < users.length; i++) {
        if (assigned.includes(i)) {
            let checkboxId = 'assignedContact' + i;
            let checkbox = document.getElementById(checkboxId);
            toggleAssignedStyle(checkbox);
        }
    }
}


/**
 * assigned-Icons rendern
 */
function renderAddTaskAssignedIcons() {
    const assigned = currentTask['assignedTo'];
    assignedIcons.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let contact = users[i];
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
    currentTask['assignedTo'] = []; // assigned resetten
    currentTask['subtasks'] = []; // Subtasks resetten
    renderAddTaskForm();
}


/**
 * Task hinzufügen
 */
async function submitTask() {
    setAddTaskDueText(); // Datum-Inputs synchronisieren
    const currentId = currentTask['id'];
    if (currentId == -1) { // falls neuer Task angelegt wurde
        tasks.push(generateTaskJSON(tasks.length)); // neuen Task am Ende des tasks-Arrays hinzufügen
    } else { // Bearbeitungsmodus
        tasks[currentId] = generateTaskJSON(currentId); // bestehenden Task überschreiben
    }
    submitBtn.disabled = true;
    await setItem('tasks', JSON.stringify(tasks));
    submitBtn.disabled = false;
    showTaskAddedMsg();
    goToBoard();
}


function generateTaskJSON(id) {
    return {
        id: id,
        title: addTaskTitle.value,
        description: addTaskDescription.value,
        assignedTo: currentTask['assignedTo'],
        due: addTaskDueText.value,
        prio: PRIOS[getTaskPrioId()],
        category: categories.indexOf(addTaskCategory.value),
        subtasks: currentTask['subtasks'],
        timestamp: getTimestamp(),
        status: currentTask['status']
    };
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