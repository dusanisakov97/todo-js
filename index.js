const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodo);

function addTodo(e) {
  // Prevent reloading the list
  e.preventDefault();

  // Check if the input field is blank
  if (todoInput.value.trim() === "") {
    return;
  }

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  /*const todoItem = {
    text: todoInput.value,
    completed: false,
  };*/

  saveLocalTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  // Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function handleTodo(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.remove();
  }
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    const todoText = todo.children[0];

    todoText.setAttribute("contenteditable", true);
    todoText.focus();

    todoText.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newText = todoText.innerText;
        todoText.setAttribute("contenteditable", false);
        todoText.innerText = newText;
        updateLocalTodos(todoText.innerText, todo);
      }
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");

    if (todo.classList.contains("completed")) {
      item.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      item.innerHTML = '<i class="fas fa-check"></i>';
    }

    updateLocalTodos(todo.children[0].innerText, todo);
  }
}

/*function reverseTodo(e) {
  const item = e.target;
  if (item.classList[0] === "todo-item") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}*/

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodos(newText, todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoIndex;
  for (let i = 0; i < todo.parentNode.children.length; i++) {
    if (todo.parentNode.children[i] === todo) {
      todoIndex = i;
      break;
    }
  }

  todos[todoIndex] = newText;
  todo.children[0].innerText = newText;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
