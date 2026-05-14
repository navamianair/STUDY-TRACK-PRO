// SUBJECT TASK COUNTS

let subjects = {

    maths: {
        total: 0,
        completed: 0
    },

    physics: {
        total: 0,
        completed: 0
    },

    programming: {
        total: 0,
        completed: 0
    }
};

// STREAK COUNTER

let streakCount =
    parseInt(localStorage.getItem("streakCount")) || 0;

// SHOW SAVED STREAK

document.getElementById("streak").innerText =
    streakCount + " Days";

// ADD TASK

function addTask() {

    let taskInput =
        document.getElementById("taskInput");

    let subject =
        document.getElementById("subjectSelect").value;

    let taskText =
        taskInput.value;

    if(taskText === "") {

        alert("Please enter a task");

        return;
    }

    let li =
        document.createElement("li");

    li.setAttribute("data-subject", subject);

    li.innerHTML = `
        ${subject.toUpperCase()} :
        ${taskText}

        <button onclick="completeTask(this)">
            Done
        </button>

        <button onclick="deleteTask(this)">
            Delete
        </button>
    `;

    document.getElementById("taskList")
        .appendChild(li);

    taskInput.value = "";

    subjects[subject].total++;

    updateProgress(subject);
}

// COMPLETE TASK

function completeTask(button) {

    let task =
        button.parentElement;

    // Prevent multiple completion

    if(task.classList.contains("completed")) {

        return;
    }

    task.classList.add("completed");

    task.style.textDecoration =
        "line-through";

    task.style.backgroundColor =
        "#d4edda";

    let subject =
        task.getAttribute("data-subject");

    subjects[subject].completed++;

    updateProgress(subject);

    // ===== CHECK ALL TASKS COMPLETED =====

    let allTasks =
        document.querySelectorAll("#taskList li");

    let completedTasks =
        document.querySelectorAll(
            "#taskList li.completed"
        );

    // If ALL tasks completed

    if(allTasks.length > 0 &&
       allTasks.length === completedTasks.length) {

        let today =
            new Date().toDateString();

        let lastStreakDate =
            localStorage.getItem("lastStreakDate");

        // Increase streak ONLY once per day

        if(lastStreakDate !== today) {

            streakCount++;

            localStorage.setItem(
                "streakCount",
                streakCount
            );

            localStorage.setItem(
                "lastStreakDate",
                today
            );

            document.getElementById("streak")
                .innerText =
                streakCount + " Days";
        }
    }
}

// DELETE TASK

function deleteTask(button) {

    let task =
        button.parentElement;

    let subject =
        task.getAttribute("data-subject");

    if(task.classList.contains("completed")) {

        subjects[subject].completed--;
    }

    subjects[subject].total--;

    task.remove();

    updateProgress(subject);
}

// UPDATE PROGRESS

function updateProgress(subject) {

    let total =
        subjects[subject].total;

    let completed =
        subjects[subject].completed;

    let progress = 0;

    if(total > 0) {

        progress =
            (completed / total) * 100;
    }

    progress = Math.round(progress);

    let progressBar =
        document.getElementById(
            subject + "Progress"
        );

    progressBar.style.width =
        progress + "%";

    progressBar.innerText =
        progress + "%";
}

// TIMER VARIABLES

let time = 1500;

let countdown = null;

// START TIMER

function startTimer() {

    // Prevent multiple timers

    if(countdown !== null) {

        return;
    }

    countdown = setInterval(function() {

        let minutes =
            Math.floor(time / 60);

        let seconds =
            time % 60;

        if(seconds < 10) {

            seconds = "0" + seconds;
        }

        document.getElementById("timer")
            .innerText =
            minutes + ":" + seconds;

        time--;

        if(time < 0) {

            clearInterval(countdown);

            countdown = null;

            alert("Study Session Completed!");
        }

    }, 1000);
}

// RESET TIMER

function resetTimer() {

    clearInterval(countdown);

    countdown = null;

    time = 1500;

    document.getElementById("timer")
        .innerText = "25:00";
}
