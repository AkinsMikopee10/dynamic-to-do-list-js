document.addEventListener('DOMContentLoaded', function() {
  // Select all the necessary DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when the page first loads
  loadTasks();

  // --- Functions for managing tasks and Local Storage ---

  /**
   * Adds a new task to the list and optionally to Local Storage.
   * @param {string} taskTextFromLoad - Optional. The text of a task to be loaded from Local Storage.
   */
  function addTask(taskTextFromLoad = '') {
    const taskText = taskTextFromLoad || taskInput.value.trim();

    if (taskText === "") {
      // Only show an alert if the function is triggered by a user's input, not on page load
      if (!taskTextFromLoad) {
        alert("Please enter a task!");
      }
      return; // Stop the function if the task is empty
    }

    // Create a new <li> element
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.textContent = taskText;

    // Create a new button for removing the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Assign an onclick event to the remove button
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      saveTasks(); // Update Local Storage after removing a task
    };

    // Append the button to the list item
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Only clear the input field if a new task was entered by the user
    if (!taskTextFromLoad) {
      taskInput.value = '';
    }

    saveTasks(); // Save after a new task is added
  }

  /**
   * Saves the current list of tasks from the DOM to Local Storage.
   */
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
      // Get the text content, excluding the remove button's text
      const taskText = item.textContent.replace('Remove', '').trim();
      tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Loads tasks from Local Storage and adds them to the DOM.
   */
  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(taskText => addTask(taskText));
    }
  }

  // --- Attach Event Listeners ---
  // Event listener for the "Add Task" button
  addButton.addEventListener('click', () => addTask());

  // Event listener for the input field to add a task with the "Enter" key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});

//here is the event listener that invokes the addTask function when the page loads.
document.addEventListener('DOMContentLoaded', addTask);