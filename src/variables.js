export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export const taskInput = document.querySelector('.addListField');
export const clearBtn = document.getElementById('clearBtn');
export const addBtn = document.querySelector('.bx-list-plus');
export const taskContainer = document.querySelector('.dynamicContent');
export const resetBtn = document.querySelector('.bx-recycle');