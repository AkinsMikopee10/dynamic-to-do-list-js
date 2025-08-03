// This ensures your JavaScript code runs after the HTML document has fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    
    //these are the DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // this s the addTask function
    function addTask() {

        // this function will retrieve and trim the value from the input field
        const taskText = taskInput.value.trim();

        //this is to check that the task field is not empty
        if (taskText === "") {
            alert("Please enter a task!");
        } else {
            // Create a new <li> element
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create a new button for removing the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            // Assign an onclick event to the remove button
            removeButton.onclick = function() {
            taskList.removeChild(listItem);
            };

            // Append the button to the list item
            listItem.appendChild(removeButton);

            // Append the new list item to the task list
            taskList.appendChild(listItem);

            // Clear the input field
            taskInput.value = '';

        }
    }
    
    //here are the event listeners
    // for the add button
    addButton.addEventListener('click', addTask);

    //to allow the enter key to add a new task
    taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

});

//here is the event listener that invokes the addTask function when the page loads.
document.addEventListener('DOMContentLoaded', addTask);