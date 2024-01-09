let currentDraggedElement;
let prevent = false; // dient zur Ermittlung, ob Add Task-Karte bei Klick geschlossen werden soll
let filteredTasks = [];

async function loadData() {
    await init();
    filteredTasks = tasks;
    updateHTML();
}

async function updateHTML() {
    updateToDo();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
}

async function saveChanges() {
    await setItem('tasks', JSON.stringify(tasks));
    filteredTasks = tasks;
}

function updateToDo() {
    let todo = filteredTasks.filter(t => t['status'] == 'toDo');
    let status = 'to do';

    document.getElementById('toDo').innerHTML = '';

    if (todo.length == 0) {
        document.getElementById('toDo').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < todo.length; i++) {
            const element = todo[i];
            document.getElementById('toDo').innerHTML += generateTask(element);
            generateSubtask(element);
            renderBoardAssignedIcons(element);
        }
}

function updateInProgress() {
    let inprogress = filteredTasks.filter(t => t['status'] == 'inProgress')
    let status = 'in progress';

    document.getElementById('inProgress').innerHTML = '';

    if (inprogress.length == 0) {
        document.getElementById('inProgress').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < inprogress.length; i++) {
            const element = inprogress[i];
            document.getElementById('inProgress').innerHTML += generateTask(element);
            generateSubtask(element);
            renderBoardAssignedIcons(element);
        }
}

function updateAwaitFeedback() {
    let feedback = filteredTasks.filter(t => t['status'] == 'awaitFeedback');
    let status = 'await Feedback';

    document.getElementById('awaitFeedback').innerHTML = '';

    if (feedback.length == 0) {
        document.getElementById('awaitFeedback').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < feedback.length; i++) {
            const element = feedback[i];
            document.getElementById('awaitFeedback').innerHTML += generateTask(element);
            generateSubtask(element);
            renderBoardAssignedIcons(element);
        }

}

function updateDone() {
    let done = filteredTasks.filter(t => t['status'] == 'done')
    let status = 'done';

    document.getElementById('done').innerHTML = '';

    if (done.length == 0) {
        document.getElementById('done').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < done.length; i++) {
            const element = done[i];
            document.getElementById('done').innerHTML += generateTask(element);
            generateSubtask(element);
            renderBoardAssignedIcons(element);
        }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTask(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTaskCard(tasks[${element['id']}], ${element['id']})" class="todo">
        <div class=headerTaskCard>
        <div class="toDoCategory${element['category']}"> ${categories[element['category']]} </div>
        <div class=changeStatusMobile> 
            <div onclick="statusUp(${element['id']}); event.stopPropagation()"> <img  src="./assets/img/arrow-left-line.svg" class="statusUp" alt="up"> </div>
            <div onclick="statusDown(${element['id']}); event.stopPropagation()"> <img src="./assets/img/arrow-left-line.svg" class="statusDown" alt="down"> </div>
        </div>
        </div>
        <div>
            <div class="toDoTitle"> ${element['title']} </div>
            <div class="toDoDescription"> ${element['description']}</div>
        </div>

        <div class="toDoSubtasks" id="toDoSubtasks${element['id']}">
            <div class="toDoSubtasksProgress">
                <div class="toDoSubtasksProgressFiller" id= "toDoSubtasksProgressFiller${element['id']}">
                </div>
            </div>  closeTask();
            <div class="toDoSubtasksCount">
                <div id="toDoSubtasksDone${element["id"]}">  
                </div>
                /${element['subtasks'].length} Subtask
            </div>
            
        </div>

        <div class="toDoBottom">
            <div class="toDoAssignedContainer" id="taskCardAssignedTo${element['id']}">  </div>
            <div class="toDoPrio">
                <img src="./assets/img/prio_icons/task_prio_${element['prio']}.svg" alt="icon">
            </div>
        </div>
    </div>`

}


function generateNoTask(status) {
    return `
            <div class="noTaskContainer">
                <div class="noTask">No tasks ${status}</div>
            </div>`
}

function showTaskCard(element, id) {

    let taskCard = document.getElementById('taskCard');

    taskCard.innerHTML = generateTaskCard(element, id);
    renderCardPrio(element, id);
    renderCardSubtasks(element, id);
    renderCardAssigned(element, id);

    let taskContainer = document.getElementById('taskContainer');

    taskContainer.classList.remove('slideOut');
    taskContainer.classList.add('slideIn');
}

function generateTaskCard(task, id) {
    return `    
    <div id="taskContainer" onclick="closeTask()">
        <div id="taskCard2" class="taskCard showTaskCard textOverflow" onclick="preventClosing()">
            <div class="taskCardHeader">
                <div class="taskCardCategory${task['category']}" id="taskCardCategory${id}">
                    ${categories[task['category']]}
                </div>
                <div onclick="closeTask()">
                    <img class="closeTask" src="./assets/img/cancel.svg" alt="Close">
                </div>
            </div>
            <div class="taskTitle"> ${task["title"]}</div>
            <div class="taskDescription"> ${task["description"]}</div>
            <div class="taskDate">
              <div class="taskSection">Due date:</div>
              <div id="taskDate${id}">${task["due"]}</div>
            </div>
            <div class="taskPrio" id="">
                <div class="taskSection">Priority:</div>
                <div class="taskPrioText" id="taskPrio${id}">${task["prio"]}</div>
                <div class="taskPrioIcon" >
                <img src="./assets/img/prio_icons/task_prio_${task['prio']}.svg" alt="icon">
                </div>
            </div>

            <div class="taskAssignedContainer">
                <div class="taskSection">Assigned To:</div>
                <div class="taskAssigned" id="taskAssigned${id}"></div>
            </div>


            <div class="subtasksContainerBoard">
                <div class="taskSection">Subtasks:</div>
                <div class="subtasks" id="subtasks"></div>
            </div>
            <div class="taskFooter">

                <div onclick="deleteTask(${id})" class="deleteTask">
                    <img class="deleteTaskImg" src="./assets/img/delete.svg" alt="">
                    <div>Delete</div>
                </div>
                <div class="taskFooterSeparator"></div>
                <div onclick="editTask(${id})" class="editTask"> <img class="editTaskImg" src="./assets/img/edit.svg">
                    <div>Edit</div>
                </div>
            </div>

        </div>
    </div>`
}


function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    saveChanges();
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

function statusUp(id){
    let newStatus 
    let status = tasks[id]['status'];

    if (status === 'toDo'){
        newStatus = 'toDo';
    }
    else if (status === 'inProgress'){
        newStatus = 'toDo';
    }
    else if (status === 'awaitFeedback'){
        newStatus = 'inProgress';
    }
    else if (status === 'done' ){
        newStatus = 'awaitFeedback'}

    tasks[id]['status'] = newStatus;
    saveChanges();
    updateHTML();
}

function statusDown(id){
    let newStatus
    let status = tasks[id]['status'];

    if (status === 'done'){
        newStatus = 'done';
    }
    else if (status === 'awaitFeedback'){
        newStatus = 'done';
    }
    else if (status === 'inProgress'){
        newStatus = 'awaitFeedback';
    }
    else if (status === 'toDo'){newStatus = 'inProgress';}

    tasks[id]['status'] = newStatus;
    saveChanges();
    updateHTML();
}

/**
 * generate the html with the subtask of the selected task
 * @param {object} element - Selected Task Object
 */

function generateSubtask(element) {
    let subtasks = element['subtasks'];
    let subtasksDiv = document.getElementById(`toDoSubtasks${element['id']}`);
    let doneSubtasksDiv = document.getElementById(`toDoSubtasksDone${element['id']}`);
    let progressbarFillerDiv = document.getElementById(`toDoSubtasksProgressFiller${element['id']}`);

    if (subtasks.length == 0) {
        subtasksDiv.classList.add("d-none");
    } else {
        updateProgressBar(subtasks, doneSubtasksDiv, progressbarFillerDiv);
    }
}

function renderBoardAssignedIcons(element) {
    let assigned = element['assignedTo'];
    let assignedDiv = document.getElementById(`taskCardAssignedTo${element['id']}`);

    assignedDiv.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let contact = users[i];
        if (assigned.includes(i)) {
            assignedDiv.innerHTML += contactAssignedIconHTML(contact);
        }
    }
}

function renderCardAssigned(element, id) {
    let assignedDiv = document.getElementById(`taskAssigned${id}`)
    let assigned = element['assignedTo'];

    assignedDiv.innerHTML = '';
    for (let i = 0; i < assigned.length; i++) {
        let contact = users[i];

        assignedDiv.innerHTML += taskCardAssignedHTML(contact, id);

    }
}

function taskCardAssignedHTML(contact, id) {

    let html = '';
    html += `
    <div class="d-flex">
        ${contactAssignedIconHTML(contact)}
        <div class="contactDetails">
            <div>${contact['name']}     
    </div>`
    return html;
}


function updateProgressBar(subtasks, doneSubtasksDiv, progressbarFillerDiv) {
    let trueCount = 0;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i]['status'] == 'done') {
            trueCount++;
        }
    }
    let barWidth = document.querySelector('.toDoSubtasksProgress').offsetWidth;
    doneSubtasksDiv.innerHTML = `${trueCount}`;
    let fillWidth = barWidth * (trueCount / subtasks.length);
    progressbarFillerDiv.style.width = `${fillWidth}px`;
}


/**
 * Task-Karte entfernen
 */
function closeTask() {
    if (!prevent) {
        let taskContainer = document.getElementById('taskContainer');
        taskContainer.classList.remove('slideIn');
        taskContainer.classList.add('slideOut');
        updateHTML();
    }
    prevent = false;
}


/**
 * verhindern, dass Task-Karte entfernt wird
 */
function preventClosing() {
    prevent = true;
    // per Bubbling wird anschließend closeTask() aufgerufen und setzt im selben Klick wieder prevent = false
}


function renderCardPrio(task, id) {
    prio = task["prio"];
    result = prio.charAt(0).toUpperCase() + prio.slice(1);
    document.getElementById(`taskPrio${id}`).innerHTML = `${result}`;
}

function renderCardSubtasks(task, id) {
    let subtasks = document.getElementById('subtasks');
    subtasks.innerHTML = '';

    if (task.subtasks.length === 0) {
        subtasks.innerHTML = '<div class="taskCardSubtask"><span>No subtask createt</span></div>'
    } else
        for (let i = 0; i < task.subtasks.length; i++) {
            subtasks.innerHTML += `
            <div class="taskCardSubtask">
              <input
                id="checkboxSubtask${i}"
                type="checkbox"
                onclick="updateSubtask(${id}, ${i})"
                ${task.subtasks[i]['status'] === "done" ? "checked" : ""} 
              />
              <p onclick="updateSubtask(${id}, ${i})">${task.subtasks[i]['title']}</p>
            </div>`
        }

}

function updateSubtask(id, i) {
    if (tasks[id].subtasks[i].status == 'toDo') {
        tasks[id].subtasks[i].status = 'done';
    }
    else {
        tasks[id].subtasks[i].status = 'toDo';
    }

    renderCardSubtasks(tasks[id], id);
    saveChanges();
}


async function addTaskBtn(status) {
    if (window.innerWidth > 700) {
        await showAddTaskCard(status);
    } else {
        window.location.href = './add_task.html';
    }
}


/**
 * Add Task-Overlay aufrufen
 * @param {string} status - Bearbeitungsstatus des Tasks
 */
async function showAddTaskCard(status) {
    addTask = document.getElementById('taskCard');
    addTask.innerHTML = generateAddTaskTemplateAll();
    taskCard = document.getElementById('addTaskCard');
    await initAddTask(status);
    taskCard.style.display = '';
    taskCard.classList.add('slideIn');
    changeClearBtn(); // Clear-Button durch Cancel-Button ersetzen
}


function generateAddTaskTemplateAll() {
    let html = `<div id="taskContainer" class="addTaskCardContainer" onclick="closeTask()">`;
    html += generateAddTaskTemplateInner();
    html += `</div>`;
    return html
}


function generateAddTaskTemplateInner() {
    return /* html */ `
        <div class="addTaskCard" onclick="preventClosing()" style="display: none" id="addTaskCard" w3-include-html="assets/templates/add_task_template.html"></div>
    `;
}


async function showEditTaskCard(status) {
    addTask = document.getElementById('taskCard2');
    addTask.innerHTML = '';
    addTask.innerHTML += generateEditTaskHeader();
    addTask.innerHTML += generateAddTaskTemplateInner();
    taskCard = document.getElementById('addTaskCard');
    taskCard.classList.add('editTaskCard');
    await initAddTask(status);
    taskCard.style.display = '';
    hideClearBtn(); // Clear-Button verstecken   
}


function generateEditTaskHeader() {
    return /* html */ `
        <div class="taskCardHeader">
            <div></div>
            <div onclick="closeTask()">
                <img class="closeTask" src="./assets/img/cancel.svg" alt="Close">
            </div>
        </div>
    `;
}



function searchTask() {
    let search = document.getElementById('findTask').value.toLowerCase();
    filteredTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i]['title'].toLowerCase();
        let description = tasks[i]['description'].toLowerCase();
        if (title.includes(search) || description.includes(search)) {
            filteredTasks.push(tasks[i]);
        }
    }
    updateHTML();
}


document.addEventListener("DOMContentLoaded", function () {
    updateHTML();
    let searchInput = document.getElementById('findTask');
    searchInput.addEventListener("input", function () {
        searchTask();
    });
});

