const PRIOS = [null, 'urgent', 'medium', 'low'];

let submitOnEnter = true; // Ergänzung zu automatischer HTML-Mechanik
let currentTask = {
    id: -1,
    assignedTo: [],
    subtasks: [],
    status: ''
};


/**
 * Initialisierung (bei Onload, Body)
 * @param {string} status - Bearbeitungsstatus des Tasks
 */
async function initAddTask(status) {
    await init();
    submitBtn.disabled = true;
    renderAddTaskForm();
    document.addEventListener('keydown', submitFormOnEnter);
    let today = new Date(); // heutiges Datum
    addTaskDue.min = today.toISOString().slice(0, -14); // Minimalwert von Date-Input auf heutigen Tag setzen
    submitBtn.disabled = false;
    currentTask['status'] = status;
}


async function editTask(id) {
    const task = tasks[id];
    currentTask['id'] = id;
    currentTask['assignedTo'] = task['assignedTo'];
    currentTask['subtasks'] = task['subtasks'];
    await showAddTaskCard(task['status']);
    unselectPrioBtn(2); // Default-Prio entfernen
    prefillForm(task);
    disableCategory();
}


async function deleteTask(id) {
    tasks[id] = null;
    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * allgemeine Render-Funktion
 */
function renderAddTaskForm() {
    renderAddTaskAssignedList();
    renderAddTaskAssignedIcons();
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


function disableCategory() {
    addTaskCategoryInputContainer.onclick = null;
    addTaskCategoryIcon.style.display = 'none';
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
                let checkbox = 'assignedContact' + i
                list.innerHTML += contactAssignedHTML(users[i], checkbox);
            }
        }
    } else {
        list.innerHTML += contactAssignedHTML(guests[0], 'assignedContact' + '-1'); // aktiver User
    }
}


function precheckAssignedList() { // FRAGE: FUNKTIONIERT TOGGLE ASSIGNED NOCH??
    const assigned = currentTask['assignedTo'];
    for (let i = 0; i < users.length; i++) {
        if (assigned.includes(i)) {
            let checkbox = 'assignedContact' + i;
            toggleAssigned(checkbox);
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
        const blank = tasks.indexOf(null); // erste Leerstelle im tasks-Array
        if (blank == -1) { // falls keine Leerstelle vorhanden
            tasks.push(generateTaskJSON(tasks.length)); // neuen Task am Ende des tasks-Arrays hinzufügen
        } else {
            tasks[blank] = generateTaskJSON(blank); // neuen Task an Leerstelle hinzufügen
        }
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