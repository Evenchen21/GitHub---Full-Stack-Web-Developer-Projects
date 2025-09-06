"use strict";

// global tasks array

let tasks = [];

// global filter: "completed" / "pending" / "all"

let filter = "all";

addEventListener("DOMContentLoaded", () => initialize());

function getTasks() {
  const LSTasks = localStorage.getItem("tasks");

  if (LSTasks) {
    return JSON.parse(LSTasks);
  } else {
    return [];
  }
}

function setTasks(tasks) {
  const jsonString = JSON.stringify(tasks);

  localStorage.setItem("tasks", jsonString);
}

function renderTasks() {
  const tasksListElement = document.getElementById("tasksList");
  tasksListElement.innerHTML = "";

  tasks.forEach((task) => {
    if (filter === "all") {
      const liElement = document.createElement("li");
      liElement.innerHTML = `${task.title} ${
        task.dueDate ? "- " + task.dueDate : ""
      }`;
      tasksListElement.appendChild(liElement);
      // add css rules depends on the task status
    }
  });
}

function addTask() {
  const taskDescription = document.getElementById("taskDescription");
  const taskDueDate = document.getElementById("taskDueDate");

  const title = taskDescription.value.trim();
  const dueDate = taskDueDate.value;

  if (!title || !dueDate) {
    alert("Please fill in both fields.");
    return;
  }

  const newTask = {
    title: title,
    dueDate: dueDate,
    completed: false,
  };

  tasks.push(newTask);
  setTasks(tasks);
  renderTasks();

  taskDescription.value = "";
  taskDueDate.value = "";
}

//fetch tasks from the server

async function fetchAPITasks() {
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
  try {
    const response = await fetch(url);

    // ok means that the status is 200

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
  }
}
function deleteButton() {
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      tasks.splice(id, 1);
      setTasks(tasks);
      renderTasks();
    });
  });
}

li.innerHTML = `
  <span>${task.text} - ${task.dueDate}</span>
  <span class="task-buttons">
    <button data-id="${index}" class="complete-btn">✔️</button>
    <button data-id="${index}" class="delete-btn">🗑️</button>
  </span>
`;

async function initialize() {
  const LSTasks = getTasks();

  if (LSTasks.length > 0) {
    tasks = LSTasks;
  } else {
    try {
      const serverTasks = await fetchAPITasks();

      // refactor: instead of directly put tasks from the server, use the addTask method for each one
      serverTasks.forEach((task) => {
        // Convert server task to local format if needed
        addTask({
          title: task.title,
          dueDate: task.dueDate || "",
          completed: !!task.completed,
        });
      });

      setTasks(tasks);
    } catch (error) {
      console.error(error.message);
    }
  }
  renderTasks();
}
