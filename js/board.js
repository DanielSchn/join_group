let tasks = [{
    'id'            :  0,
    'titel'         : 'Putzen',
    'description'   : 'Schön bis in die Ecken :D',
    'assignedTo'   : 'Wilfred',
    'due date'      : '11/12/24',
    'prio'          : 'Medium',
    'category'      : 'Category1',
    'subtasks'      : ['bad', 'flur', 'küche'],
    'status'        : 'toDo',
}, {
    'id'            : 1,
    'titel'         : 'Kochen',
    'description'   : 'Was leckeres :D',
    'assignedTo'   : 'Wilfred',
    'due date'      : '11/12/24',
    'prio'          : 'Urgent',
    'category'      : 'Category2',
    'subtasks'      : ['schnibbeln', 'kochen', 'tisch decken'],
    'status'        : 'inProgress',
}, {
    'id'            : 2,
    'titel'         : 'Kochen',
    'description'   : 'Was leckeres :D',
    'assignedTo'   : 'Wilfred',
    'due date'      : '11/12/24',
    'prio'          : 'Urgent',
    'category'      : 'Category2',
    'subtasks'      : ['schnibbeln', 'kochen', 'tisch decken'],
    'status'        : 'inProgress',
}, {
    'id'            : 3,
    'titel'         : 'Kochen',
    'description'   : 'Was leckeres :D',
    'assignedTo'   : 'Wilfred',
    'due date'      : '11/12/24',
    'prio'          : 'Urgent',
    'category'      : 'Category2',
    'subtasks'      : ['schnibbeln', 'kochen', 'tisch decken'],
    'status'        : 'done',
}

];

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
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
        <div class="toDoCategory"> ${element['category']} </div>

        <div>
            <div class="toDoTitle"> ${element['titel']} </div>
            <div class="toDoDescription"> ${element['description']}</div>
        </div>

        <div class="toDoSubtasks">
            <div class="toDoSubtasksProgress">
                <div class="toDoSubtasksProgressFiller">
                </div>
            </div>
            <div class="toDoSubtasksCount"></div>
            <div id=""> ${element['subtasks'][0]}, ${element['subtasks'][1]}, ${element['subtasks'][2]} </div>
        </div>

        <div class="toDoBottom">
            <div class="toDoAssignedContainer"> ${element['assignedTo']} </div>
            <div class="toDoPrio">${element['prio']}</div>
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