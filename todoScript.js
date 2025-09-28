// todoScript.js
// ============ To-Do Tab ===================================

// Import icons
import { createIcons, icons } from "https://cdn.skypack.dev/lucide";
createIcons({ icons });

// Main container
const todoBox = document.querySelector(".todoBox");

// App state: array of to-do objects
let myToDoList = [];

// ========== Input + Button UI ==========
const todoInput = document.createElement("input");
todoInput.type = "text";
todoInput.placeholder = "Enter a new to-do item";
todoInput.classList.add("todo-input");

const addButton = document.createElement("button");
addButton.textContent = "Add"; // 🔄 changed: safer than innerHTML
addButton.classList.add("smallButton");

todoBox.appendChild(todoInput);
todoBox.appendChild(addButton);

// ========== Render To-Do Items ==========
function renderToDoItems() {
  // 🔄 changed: clear list before rendering (prevents duplicates)
  const oldItems = todoBox.querySelectorAll(".todo-item");
  oldItems.forEach((el) => el.remove());

  // Render each item
  myToDoList.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <button class="delete-button" data-id="${item.id}">Delete</button>
      <input class="todo-checkbox" type="checkbox" id="todo-${item.id}" ${
      item.completed ? "checked" : ""
    }>
      <label class="todo-label" for="todo-${item.id}">${item.text}</label>
    `;

    // Append
    todoBox.appendChild(todoItem);

    // Delete button handler
    const deleteButton = todoItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      const confirmClear = confirm("Are you sure?");
      if (!confirmClear) return;
      myToDoList = myToDoList.filter((t) => t.id !== item.id);
      renderToDoItems(); // 🔄 changed: re-render instead of manual DOM remove
    });

    // Checkbox handler
    const checkbox = todoItem.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked; // 🔄 changed: update state
      checkbox.nextElementSibling.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
    });

    // Initial UI sync
    if (item.completed) {
      checkbox.nextElementSibling.style.textDecoration = "line-through";
    }
  });
}

// ========== Add Item ==========
function addToDo() {
  const text = todoInput.value.trim();
  if (!text) return; // ignore empty

  // Create new item object
  const newTodoItem = {
    id: Date.now(),
    text,
    completed: false,
  };

  // Push into state
  myToDoList.push(newTodoItem);

  // Clear input
  todoInput.value = "";

  // Re-render
  renderToDoItems();
}

// Event listener for Add button
addButton.addEventListener("click", addToDo);
