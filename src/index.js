import {
  taskInput,
  clearBtn,
  addBtn,
  taskContainer,
  resetBtn,
} from './variables.js';
import './style.css';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const convertToInput = () => {
  const taskDescription = document.querySelector('.taskDescription');
  if (taskDescription) {
    const inputElement = document.createElement('input');
    inputElement.value = taskDescription.innerText;
    inputElement.classList.add('inputElement');
    taskDescription.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener('blur', () => {
      const updatedDescription = inputElement.value.trim();
      if (inputElement !== '') {
        const taskIndex = tasks.findIndex(
          (task) => task.description === taskDescription.innerText,
        );
        tasks[taskIndex].description = updatedDescription;
        saveTasksToLocalStorage();
        displayTask();
      }
    });
  }
};

const displayTask = () => {
  taskContainer.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<div class='description'>
      <input class='checkbox' id='checkbox_${
  task.checkboxId
}' type='checkbox' ${task.completed ? 'checked' : ''}/>
      <div class='taskDescription'>${task.description}</div>
    </div>
    <div class='editBtn'><i class='bx bx-dots-vertical-rounded editBtn'></i></div>`;
    const checkbox = listItem.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasksToLocalStorage();
    });
    taskContainer.appendChild(listItem);
  });
  taskContainer.addEventListener('click', (event) => {
    const editBtn = event.target.closest('.editBtn'); // Find the closest ancestor with the class 'editBtn'
    if (editBtn) {
      convertToInput();
    }
  });
};

const addTask = () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    const newTask = {
      description: taskInput.value,
      index: tasks.length + 1,
      checkboxId: tasks.length + 1,
      completed: false,
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    displayTask();
    taskInput.value = '';
  }
};

const removeAll = () => {
  tasks = [];
  saveTasksToLocalStorage();
  displayTask();
};

const removeCheckedTasks = () => {
  const uncheckedTasks = tasks.filter(
    (task) => !document.getElementById(`checkbox_${task.checkboxId}`).checked,
  );
  uncheckedTasks.forEach((task, index) => {
    task.index = index + 1;
    task.checkboxId = index + 1;
  });
  tasks = uncheckedTasks;
  saveTasksToLocalStorage();
  displayTask();
};

addBtn.addEventListener('click', addTask);
resetBtn.addEventListener('click', removeAll);
clearBtn.addEventListener('click', removeCheckedTasks);

displayTask();
