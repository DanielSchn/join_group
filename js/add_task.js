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


function deleteTask(id) {
    // Task löschen
    // OPTIONAL: IDs bei allen nachfolgenden Tasks neu zuweisen ODER ID-Lücken mit neuen Tasks füllen
    //      letzteres: gelöschte IDs in zusätzlichem Array speichern, falls ID nicht der letzte Task war
    //      bei Task-Erzeugung neu zuweisen??
    // EINFACHSTE LÖSUNG: Status "deleted" hinzufügen, beim Rendern der Tasks nur die nehmen, deren Status nicht deleted ist
    // EINFACHER: tasks[id] = null;
    // beim Rendern: tasks.indexOf(null) überprüfen
    // FRAGE: Muss auf dem Board die gespeicherte ID mit der tatsächlichen Array-ID identisch sein? Dann auf jeden Fall deleted-Status nutzen
    // erst umsetzen, wenn richtiges Task-Array geladen wird
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
    addTaskDueText.value = task['due'];
    addTaskDue.value = transformDate(task['due']);
    stylePrioBtn(prio, prio);
    addTaskCategory.value = categories.indexOf(task['category']);
}


function disableCategory() {
    // Dropdown: Event-Listener entfernen!
}


/**
 * assigned-Liste rendern
 */
function renderAddTaskAssignedList() {
    const assigned = currentTask['assignedTo'];
    const list = document.getElementById('addTaskAssignedMenu');
    list.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let contact = users[i];
        let checkboxId = 'assignedContact' + i;
        list.innerHTML += contactAssignedHTML(contact, checkboxId);
        // if (assigned.includes(i)) {
        //     toggleAssigned(checkboxId);
        // }
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
    if (currentId == -1) {
        tasks.push(generateTaskJSON(tasks.length)); // neuen Task hinzufügen
        // als ID ggf. ID des letzten Elements + 1 wählen (falls nicht mit Array identisch): "tasks[tasks.length - 1]['id'] + 1"
    } else {
        tasks[currentId] = generateTaskJSON(currentId); // bestehenden Task überschreiben (Bearbeitungsmodus)
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