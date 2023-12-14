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

function renderAddTaskForm() {
    renderSubtasks();
}

function renderSubtasks() {
    const subtasks = newTask['subtasks'];
    const list = document.getElementById('subtasksList');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        list.innerHTML += subtaskHTML(subtask, i);
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
function focusInputSubtask() {
    const container = document.getElementById('addSubtaskInputContainer');
    const btnsPassive = document.getElementById('addSubtaskIconsPassive');
    const btnsActive = document.getElementById('addSubtaskIconsActive');
    container.style.borderColor = 'var(--lightBlue1)';
    addSubtask.focus();
    btnsPassive.style.display = 'none';
    btnsActive.style.display = '';
    document.addEventListener("click", unfocusInputSubtask); // reagiert auf Clicks abseits des Containers
}

/**
 * Fokus aufheben
 */
function unfocusInputSubtask() {
    const container = document.getElementById('addSubtaskInputContainer');
    container.style.borderColor = 'var(--lightGray1)';
    if (addSubtask.value == '') {
        const btnsPassive = document.getElementById('addSubtaskIconsPassive');
        const btnsActive = document.getElementById('addSubtaskIconsActive');
        btnsPassive.style.display = '';
        btnsActive.style.display = 'none';
    }
}

/**
 * Cancel-Button löscht eingetragenen Wert und hebt Fokus auf
 */
function cancelInputSubtask() {
    addSubtask.value = '';
    unfocusInputSubtask();
}

/**
 * Check-Button erzeugt Subtask, falls Wert eingetragen
 */
function createInputSubtask() {
    if (addSubtask.value) {
        newTask['subtasks'].push(addSubtask.value);
        renderSubtasks();
    }
    cancelInputSubtask();
}

function editSubtask(index) {
    let subtasks = newTask['subtasks'];
    let subtask = subtasks[index];
}

/**
 * Subtask aus Liste und Daten entfernen
 * @param {number} index - Laufindex innerhalb des subtasks-Array 
 */
function removeSubtask(index) {
    let subtasks = newTask['subtasks'];
    subtasks.splice(index, 1);
    renderSubtasks();
}



// function createTask() {
//     Folgende Deklaration muss nicht leer erfolgen, sondern kann direkt die Werte aus dem Formular übernehmen:  
//     let task = {
//         id: ,            
//         title: ,
//         description: ,
//         assignedTo : ,
//         due: ,
//         prio: ,
//         category: ,
//         subtasks: ,
//         timestamp: ,
//         status:
//     };
//     tasks.push(task);
// }

function subtaskHTML(subtask, index) {
    return /* html */`
        <li id="subtask${index}">
            <span>${subtask}</span>
            <button type="button" onclick="editSubtask(${index})" class="subtasksButton">
                <img src="./assets/img/edit.svg" alt="edit subtask">
            </button>
            <button type="button" onclick="removeSubtask(${index})" class="subtasksButton">
                <img src="./assets/img/remove.svg" alt="remove subtask">
            </button>
        </li>`;
}