const inputForm = document.getElementById("inputForm");
const taskInput = document.getElementById("userInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
restoreTasks(storedTasks);

// Handle submit event for both button click and Enter key press
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  taskInput.value = "";
});

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
    taskInput.value = "";
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  // Prevent empty tasks
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const listItem = document.createElement("li");
  listItem.classList.add("taskItem");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const task = {
    text: taskText,
    checked: false,
  };

  const deleteButton = document.createElement("i");
  deleteButton.className = "fas fa-trash-can";

  const span = document.createElement("div");
  span.appendChild(checkbox);
  span.appendChild(deleteButton);

  listItem.appendChild(span);
  listItem.textContent = taskText; // Set text after checkbox creation

  taskList.appendChild(listItem);

  storedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));

  // Toggle completed state on checkbox click
  checkbox.addEventListener("change", () => {
    listItem.classList.toggle("completed");
    task.checked = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  });

  // Remove task on delete button click
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(listItem);
    storedTasks = storedTasks.filter((t) => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  });
}

function restoreTasks(tasks) {
  taskList.innerHTML = "";

  for (const task of tasks) {
    const listItem = document.createElement("li");
    listItem.classList.add("taskItem");
    listItem.textContent = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.checked;

    if (task.checked) {
      listItem.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
      listItem.classList.toggle("completed");
      task.checked = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    });

    const deleteButton = document.createElement("i");
    deleteButton.className = "fas fa-trash-can";

    const span = document.createElement("div");
    span.appendChild(checkbox);
    span.appendChild(deleteButton);

    listItem.appendChild(span);
    taskList.appendChild(listItem);
  }
}

clearCompletedBtn.addEventListener("click", () => {
  const doneTasks = document.querySelectorAll(".taskItem.completed");

  for (const task of doneTasks) {
    taskList.removeChild(task);
    storedTasks = storedTasks.filter((t) => !t.checked);
  }

  localStorage.setItem("tasks", JSON.stringify(storedTasks));
});

clearAllBtn.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear all tasks? This action cannot be undone.");

  if (confirmation) {
    taskList.innerHTML = "";
    storedTasks = [];
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
});

