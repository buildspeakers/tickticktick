
// helpers
function qs(selector) {
  return document.querySelector(selector);      
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}


// main functions
function bindTodoEvents() {
  let todos = qsa('.todo-item');
  for (let i = 0, l = todos.length; i < l; i++) {
    let todo = todos[i]
    todos[i].querySelector('.todo-item__delete').addEventListener('click', function() {
      deleteTodo(todos[i].getAttribute('data-id'));
    })
  }
}


function addTodo() {
  let taskText = todoInput.value;
  // only add new todo if input field contains text
  if (taskText != "") {

    // New todo
    let newTodo = {};
    newTodo.name = todoInput.value;
    newTodo.completed = false;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);    

    // clear input field maintaining focus
    todoInput.value = "";
    todoInput.focus();

    // render list
    renderTodos();
  }
}


function deleteTodo(id) {
  // look over todos array for matched id and delete
  console.log("todo id: " + id);
  // render again
}


// Storage
let todos = [];


// input field
let todoInput = qs(".todo-add__input");


// Add new task text to storage
qs('.todo-add__button').addEventListener('click', addTodo);


// Write list to DOM
function renderTodos() {
    // create load of <li>'s from store
    // bind events
    // write to dom
    let listItems = "";
    for (let i = 0, l = todos.length; i < l; i++) {
      listItems += "<li class=\"todo-item\" data-id=\"" + todos[i].id + "\">"
        + "<input class=\"todo-item__checkbox\" type=\"checkbox\">"
        + todos[i].name
        + "<button class=\"todo-item__delete\">delete</button>"
        + "</li>";
    }
    qs('.todo-list').innerHTML = listItems;
    bindTodoEvents();
}




// on load

// render list
renderTodos();