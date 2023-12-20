let tasks = TEST_TASKS;

let currentDraggedElement;


function updateHTML() {
    updateToDo();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
}

function updateToDo() {
    let todo = tasks.filter(t => t['status'] == 'toDo');
    let status = 'to do';

    document.getElementById('toDo').innerHTML = '';

    if (todo.length == 0) {
        document.getElementById('toDo').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < todo.length; i++) {
            const element = todo[i];
            document.getElementById('toDo').innerHTML += generateTask(element);
            generateSubtask(element);
        }
}

function updateInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'inProgress')
    let status = 'in progress';

    document.getElementById('inProgress').innerHTML = '';

    if (inprogress.length == 0) {
        document.getElementById('inProgress').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < inprogress.length; i++) {
            const element = inprogress[i];
            document.getElementById('inProgress').innerHTML += generateTask(element);
            generateSubtask(element);
        }
}

function updateAwaitFeedback() {
    let feedback = tasks.filter(t => t['status'] == 'awaitFeedback');
    let status = 'await Feedback';

    document.getElementById('awaitFeedback').innerHTML = '';

    if (feedback.length == 0) {
        document.getElementById('awaitFeedback').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < feedback.length; i++) {
            const element = feedback[i];
            document.getElementById('awaitFeedback').innerHTML += generateTask(element);
            generateSubtask(element);
        }
    
}

function updateDone() {
    let done = tasks.filter(t => t['status'] == 'done')
    let status = 'done';

    document.getElementById('done').innerHTML = '';

    if (done.length == 0) {
        document.getElementById('done').innerHTML = generateNoTask(status);
    } else

        for (let i = 0; i < done.length; i++) {
            const element = done[i];
            document.getElementById('done').innerHTML += generateTask(element);
            generateSubtask(element);
        }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTask(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTaskCard(tasks[${element['id']}], ${element['id']})" class="todo">
        <div class="toDoCategory${element['category']}"> ${categories[element['category']]} </div>

        <div>
            <div class="toDoTitle"> ${element['title']} </div>
            <div class="toDoDescription"> ${element['description']}</div>
        </div>

        <div class="toDoSubtasks" id="toDoSubtasks${element['id']}">
            <div class="toDoSubtasksProgress">
                <div class="toDoSubtasksProgressFiller" id= "toDoSubtasksProgressFiller${element['id']}">
                </div>
            </div>
            <div class="toDoSubtasksCount">
                <div id="toDoSubtasksDone${element["id"]}">  
                </div>
                /${element['subtasks'].length} Subtask
            </div>
            
        </div>

        <div class="toDoBottom">
            <div class="toDoAssignedContainer"> ${element['assignedTo']} </div>
            <div class="toDoPrio">
                <img src="./assets/img/prio_icons/task_prio_${element['prio']}.svg" alt="icon">
            </div>
        </div>
    </div>`

}

function generateNoTask(status){
         return `
            <div class="noTaskContainer">
                <div class="noTask">No tasks ${status}</div>
            </div>`
}

function showTaskCard(element, id) {
    document.getElementById('taskCard').innerHTML = generateTaskCard(element, id);
    renderCardPrio(element, id);
    renderCardSubtasks(element, id)

}

function generateTaskCard(task, id) {
    return `    
    <div id="taskContainer" onclick="closeTask()">
        <div id="taskCard" class="taskCard showTaskCard" onclick="event.stopPropagation()">
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


            <div class="subtasksContainer">
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
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
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
        let trueCount = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i]['status'] == 'done') {
                trueCount++;
            }
        }
        let barWidth = 130;
        doneSubtasksDiv.innerHTML = `${trueCount}`;
        let fillWidth = barWidth * (trueCount / subtasks.length);
        progressbarFillerDiv.style.width = `${fillWidth}px`;
    }
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

function closeTask(){
    document.getElementById('taskCard').innerHTML = '';
}

function renderCardPrio(task, id){
    prio = task["prio"];
    result = prio.charAt(0).toUpperCase() + prio.slice(1);
    document.getElementById(`taskPrio${id}`).innerHTML = `${result}`;
}

function renderCardAssigned(){}
function renderCardDate(){}

function renderCardSubtasks(task, id){
    let subtasks = document.getElementById('subtasks');
    subtasks.innerHTML = '';

    if(task.subtasks.length === 0){
        subtasks.innerHTML = '<div class="taskCardSubtask"><span>No subtask createt</span></div>'
    } else
        for (let i = 0; i < task.subtasks.length; i++){
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

function updateSubtask(id, i){
    tasks[id].subtasks[i].status === 'done' ? 'toDo' : 'done';
    renderCardSubtasks (tasks[id], id);
}

function showAddTaskCard(){
    addtask = document.getElementById('taskCard');
    addtask.innerHTML = `
    <div class="addTaskCardContainer" onclick=closeTask()>
    <div class = "addTaskCard" id="addTaskCard" w3-include-html="assets/templates/add_task_template.html"></div>
    </div>`;

    init();
}