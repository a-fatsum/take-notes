let myToDoList = [];
const todoBox = document.querySelector(".todoBox");

const todoInput = document.createElement("input");
todoInput.type = "text";
todoInput.placeholder = "Enter a new to-do item";
todoInput.classList.add("todo-input");

const addButton = document.createElement("button");
addButton.innerHTML = "Add";
addButton.classList.add("smallButton");

todoBox.appendChild(todoInput);
todoBox.appendChild(addButton);

// Function to update the displayed to-do list

function updateToDoList() {
  if (todoInput.value.trim() === "") {
    return; // Ignore empty input
  }
  // Create a new to-do item object
  const newTodoItem = {
    id: Date.now(),
    text: todoInput.value.trim(),
    completed: false,
  };

  // Add the new item to the list
  myToDoList.push(newTodoItem);
  // renderToDoItems();
  todoInput.value = ""; // Clear input field
}

// Container to hold the to-do items
function renderToDoItems() {
  // Clear the existing list

  // Render each to-do item
  myToDoList.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <input type="checkbox" id="todo-${item.id}" ${
      item.completed ? "checked" : ""
    }>
      <label for="todo-${item.id}">${item.text}</label>
      <button class="delete-button" data-id="${item.id}">Delete</button>
    `;
    // check for duplicates before adding
    const existingItem = todoBox.querySelector(`input[id="todo-${item.id}"]`);
    if (!existingItem) {
      todoBox.appendChild(todoItem);
      const checkboxes = todoBox.querySelectorAll("input");
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleTodoActions);
      });
      console.log("XXXX", checkboxes);
    }
  });
}

// complete and delete functionality
function handleTodoActions(e) {
  console.log("Checkbox clicked", e.target.value);
  const checkbox = e.target;
  if (checkbox.checked) {
    // Mark item as completed
    console.log("Checkbox checked", checkbox.id);
    checkbox.nextElementSibling.style.textDecoration = "line-through";
    //
  } else {
    // Mark item as not completed
    console.log("Checkbox unchecked", checkbox.id);
    checkbox.nextElementSibling.style.textDecoration = "none";
  }

  // Delete functionality
  const deleteButtons = todoBox.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      //
      deleteButton.parentElement.remove();
      myToDoList = myToDoList.filter((item) => {
        // keep items that do not match the deleted item's id
        return item.id != deleteButton.getAttribute("data-id");
      });
    });
  });
}

// Event listener for the Add button
addButton.addEventListener("click", () => {
  updateToDoList();
  renderToDoItems();
});

const checkboxes = todoBox.querySelectorAll("input");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleTodoActions);
});
