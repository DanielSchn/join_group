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

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
        generateSubtask(element);
    }
}

function updateInProgress(){
    let inprogress = tasks.filter(t => t['status'] == 'inProgress')

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }
}

function updateAwaitFeedback(){
    let feedback = tasks.filter(t => t['status'] == 'awaitFeedback');

    document.getElementById('awaitFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitFeedback').innerHTML += generateTask(element);
    }
}

function updateDone(){
    let done = tasks.filter(t => t['status'] == 'done')

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

function startDragging(id){
    currentDraggedElement = id;
}

function generateTask(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="inittest()" class="todo">
        <div class="toDoCategory"> ${categories[element['category']]} </div>

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
            <div class="toDoPrio">${element['prio']}</div>
        </div>
    </div>`

}

function inittest(){
    document.getElementById('test').innerHTML = generateTaskCard(tasks[0], 0);
}

function generateTaskCard(task, id){
    return `    
    <div id="taskContainer" onclick="closeTask()">
        <div id="taskCard" class="taskCard showTaskCard" onclick="event.stopPropagation()">
            <div class="taskCardHeader">
                <div class="taskCardCategory" id="taskCardCategory${id}"> ${task["category"]}</div>
                <div onclick="closeTask()">
                    <img class="closeTask" src="./assets/img/cancel.svg" alt="Close">
                </div>
            </div>
            <div class="taskTitle"> ${task["title"]}</div>
            <div class="taskDescription"> ${task["description"]}</div>
            <div class="taskDate">
              <div class="taskSection">Due date:</div>
              <div id="taskDate${id}">${task["due date"]}</div>
            </div>
            <div class="taskPrio" id="">
                <div class="taskSection">Priority:</div>
                <div class="taskPrioText">${task["prio"]}</div>
                <div class="taskPrioIcon" id="taskPrio${id}"></div>
            </div>

            <div class="taskAssignedContainer">
                <div class="taskSection">Assigned To:</div>
                <div class="taskAssigned" id="taskAssigned${id}"></div>
            </div>


            <div class="subtasksContainer">
                <div class="taskSection">Subtasks</div>
                <div class="subtasks" id="subtasks${id}"></div>
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

function moveTo(status){
    tasks[currentDraggedElement]['status'] = status;
    updateHTML();
}

function highlight(id){
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id){
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

    if (subtasks.length === 0) {
        subtasksDiv.classList.add("d-none");
    } else {
        updateProgressBar(subtasks, doneSubtasksDiv, progressbarFillerDiv);
        let trueCount = 0;
        for (let i=0; i<subtasks.length; i++){
            if (subtasks[i]['status'] == 'done'){
                trueCount++;
            }
        }
        let barWidth = 130;
        doneSubtasksDiv.innerHTML = `${trueCount}`;
        let fillWidth = barWidth * (trueCount / subtasks.length);
        progressbarFillerDiv.style.width = `${fillWidth}px`;
    }
}

function updateProgressBar (subtasks, doneSubtasksDiv, progressbarFillerDiv)  {
    let trueCount = 0;
    for (let i=0; i<subtasks.length; i++){
        if (subtasks[i]['status'] == 'done'){
            trueCount++;
        }
    }
    let barWidth = document.querySelector('.toDoSubtasksProgress').offsetWidth;
    doneSubtasksDiv.innerHTML = `${trueCount}`;
    let fillWidth = barWidth * (trueCount / subtasks.length);
    progressbarFillerDiv.style.width = `${fillWidth}px`;
}