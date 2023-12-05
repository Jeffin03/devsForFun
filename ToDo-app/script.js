document.addEventListener('DOMContentLoaded', function () {
  const inputForm = document.getElementById('inputForm');
  const userInput = document.getElementById('userInput');
  // const addTaskBtn = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const clearCompletedBtn = document.getElementById('clearCompleted');
  const clearAllBtn = document.getElementById('clearAll');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.className = `taskItem ${task.completed ? 'completed' : ''}`;
          li.innerHTML = `
              <span>${task.text}</span>
              <div>
              <i class="fas fa-check-circle checkbox"></i>
              <i class="fas fa-trash deleteBtn"></i>
              </div>
          `;
          li.querySelector('.checkbox').addEventListener('click', () => toggleTask(index));
          li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
          taskList.appendChild(li);
      });
  }

  renderTasks();

  function addTask(text) {
      tasks.push({ text, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
  }

  function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
  }

  function deleteTask(index) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
  }

  inputForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const taskText = userInput.value.trim();
      if (taskText !== '') {
          addTask(taskText);
          userInput.value = '';
      }
  });

  clearCompletedBtn.addEventListener('click', function () {
      tasks.forEach((task, index) => {
          if (task.completed) {
              deleteTask(index);
          }
      });
  });

  clearAllBtn.addEventListener('click', function () {

    const confirmation = confirm("Are you sure you want to clear all tasks? This action cannot be undone.");

    if(confirmation){
      localStorage.removeItem('tasks');
      tasks.length = 0;
      renderTasks();
    }
      
  });

  userInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          const taskText = userInput.value.trim();
          if (taskText !== '') {
              addTask(taskText);
              userInput.value = '';
          }
      }
  });
});
