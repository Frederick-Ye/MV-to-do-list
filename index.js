import {
  tasks,
  taskInput,
  clearBtn,
  addBtn,
  taskContainer,
  resetBtn,
} from "./src/variables.js";

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const displayTask = () => {
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div>
      <input class="checkbox" id="checkbox_${task.checkboxId}" type="checkbox"/>
      ${task.description}
    </div>
    <div><i class="bx bx-dots-vertical-rounded"></i></div>`;
    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasksToLocalStorage();
    });
    taskContainer.appendChild(listItem);
  });
};

const addTask = () => {
  const newTask = {
    description: taskInput.value,
    index: tasks.length + 1,
    checkboxId: tasks.length + 1,
    completed: false,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
  displayTask();
  taskInput.value = "";
};

const removeAll = () => {
  tasks = [];
  saveTasksToLocalStorage();
  displayTask();
};

const removeCheckedTasks = () => {
  tasks = tasks.filter(
    (task) => !document.getElementById(`checkbox_${task.checkboxId}`).checked
  );
  tasks.forEach((task, index) => {
    task.index = index + 1;
    task.checkboxId = index + 1;
  });
  saveTasksToLocalStorage();
  displayTask();
};

addBtn.addEventListener("click", addTask);
resetBtn.addEventListener("click", removeAll);
clearBtn.addEventListener("click", removeCheckedTasks);
displayTask();
