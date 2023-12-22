const userName = [];


async function initSummary() {
    await init();
    setDaytime();
    renderUserName();
    renderTasksInBoard();
    renderTasksInProgress();
    renderTasksAwaitFeedback();
    renderToDo();
    renderDoneTasks();
    renderUrgentTasks();
    renderUrgentDeadline();
}


/**
 * Function to render the Daytime Greeting in the HTML
 * 
 * @param {string} daytime - Get the right greeting from the setDaytime function as string
 */
function renderSummaryGreeting(daytime) {
    let greeting = document.getElementById('greetOnSummary');
    greeting.innerHTML = daytime;
}


/**
 * Function to set the time of day in the greeting
 */
function setDaytime() {
    let today = new Date();
    let currentHour = today.getHours();
    console.log(currentHour);
    if (currentHour < 12) {
        renderSummaryGreeting('Good morning');
    } else if (currentHour < 18) {
        renderSummaryGreeting('Good afternoon');
    } else {
        renderSummaryGreeting('Good evening');
    }
}


/**
 * Fill in function for the guest login
 */
function fillInGuest() {
    document.getElementById('email').value = 'guest@guest.de';
    document.getElementById('signUpPassword').value = 'guest';
    login();
}


/**
 * Renderfunction for the Username at summary dashboard.
 */
function renderUserName() {
    let loadedUserName = localStorage.getItem('userName');
    let renderUserName = document.getElementById('userNameSummary');
    let capitalized = loadedUserName.charAt(0).toUpperCase() + loadedUserName.slice(1);
    renderUserName.innerHTML = capitalized;
}


function renderTasksInBoard() {
    let tasksInBoard = document.getElementById('tasksInBoardDashboard');
    tasksInBoard.innerHTML = TEST_TASKS.length;
}


function renderTasksInProgress() {
    let tasksInProgress = document.getElementById('tasksInProgressDashboard');
    let inProgressCount = 0;
    TEST_TASKS.forEach(task => {
        if (task.status === 'inProgress') {
            inProgressCount++;
        }
    });
    tasksInProgress.innerHTML = inProgressCount;
}


function renderTasksAwaitFeedback() {
    let tasksAwaitFeedback = document.getElementById('awaitFeedbackDashboard');
    let awaitFeedbackCount = 0;
    TEST_TASKS.forEach(task => {
        if (task.status === 'awaitFeedback') {
            awaitFeedbackCount++;
        }
    });
    tasksAwaitFeedback.innerHTML = awaitFeedbackCount;
}


function renderToDo() {
    let toDo = document.getElementById('toDoDashboard');
    let toDoCount = 0;
    TEST_TASKS.forEach(task => {
        if (task.status === 'toDo') {
            toDoCount++;
        }
    });
    toDo.innerHTML = toDoCount;
}


function renderDoneTasks() {
    let doneTasks = document.getElementById('doneTasksDashboard');
    let doneTasksCount = 0;
    TEST_TASKS.forEach(task => {
        if (task.status === 'done') {
            doneTasksCount++;
        }
    });
    doneTasks.innerHTML = doneTasksCount;
}


function renderUrgentTasks() {
    let urgentTask = document.getElementById('urgentTaskDashboard');
    let urgentTaskCount = 0;
    TEST_TASKS.forEach(task => {
        if (task.prio === 'urgent') {
            urgentTaskCount++;
        }
    });
    urgentTask.innerHTML = urgentTaskCount;
}


// function renderUrgentDeadline() {
//     let deadline = document.getElementById('deadlineDashboard');
//     TEST_TASKS.forEach(task => {
//         if (task.prio === 'urgent') {
//             const date = new Date(task.due);
//             const options = { year: 'numeric', month: 'long', day: 'numeric' };
//             const formattedDate = date.toLocaleDateString('en-US', options);
//             deadline.innerHTML = formattedDate;
//         }
//     });
// }


function renderUrgentDeadline() {
    let deadline = document.getElementById('deadlineDashboard');
    TEST_TASKS.forEach(task => {
        if (task.prio === 'urgent') {
            const [day, month, year] = task.due.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            deadline.innerHTML = formattedDate;
        }
    });
}