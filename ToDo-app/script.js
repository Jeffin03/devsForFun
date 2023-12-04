const inputForm = document.getElementById("inputForm");
const taskInput = document.getElementById("userInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
restoreTasks(storedTasks);

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTask(taskText);
    taskInput.value = "";

    const currentTasks = getTaskList();
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  }
});

function addTask(taskText) {
  const listItem = document.createElement("li");
  listItem.classList.add("taskItem");
  listItem.textContent = taskText;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    listItem.classList.toggle("completed");
  });

  const deleteButton = document.createElement("i");
  deleteButton.className = "fas fa-trash-can";

  const span = document.createElement("div");
  span.appendChild(checkbox);
  span.appendChild(deleteButton);

  listItem.appendChild(span);
  taskList.appendChild(listItem);
}

taskList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("fa-trash-can")) {
    taskList.removeChild(target.parentNode.parentNode);
    const currentTasks = getTaskList();
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  }
});

function restoreTasks(tasks) {
  taskList.innerHTML = "";

  for (const task of tasks) {
    const listItem = document.createElement("li");
    listItem.classList.add("taskItem");
    listItem.textContent = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    if (task.includes("[DONE]")) {
      listItem.classList.add("completed");
      checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
      listItem.classList.toggle("completed");
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

function getTaskList() {
  const taskItems = document.querySelectorAll("#taskList .taskItem");
  const tasks = [];

  for (const item of taskItems) {
    tasks.push(item.innerText.trim());
  }
  return tasks;
}

clearCompletedBtn.addEventListener("click", () => {
  const doneTasks = document.querySelectorAll(".taskItem.completed");

  for (const task of doneTasks) {
    taskList.removeChild(task);
  }

  const currentTasks = getTaskList();
  localStorage.setItem("tasks", JSON.stringify(currentTasks));
});

clearAllBtn.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear all tasks? This action cannot be undone.");

  if (confirmation) {
    const allTasks = document.querySelectorAll('.taskItem');

    for (const task of allTasks) {
      taskList.removeChild(task);
    }

    const currentTasks = getTaskList();
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
  }
});
