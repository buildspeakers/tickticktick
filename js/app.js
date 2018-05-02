//
//
// helper functions
//
//
function qs(selector) {
  return document.querySelector(selector);      
}


// Storage
let todos = [];

// prototype for todo
let todo = {
  name: "",
  complete: "false"
}


// input field
let todoInput = qs(".todo-add__input");


// Add new task text to storage
qs('.todo-add__button').addEventListener('click', function(){
  let taskText = todoInput.value;
  // only add new todo if input field contains text
  if (taskText != "") {
    // New todo
    let newTodo = Object.create(todo);
    newTodo.name = todoInput.value;
    todos.push(newTodo);
    // clear input field maintaining focus
    todoInput.value = "";
    todoInput.focus();
    // render list
    renderTodos();
  } 
});


// Write list to DOM
function renderTodos() {
    let listItems = "";
    for (let i = 0, l = todos.length; i < l; i++) {
      listItems += "<li>"
        + "<input class=\"todo-item__checkbox\" type=\"checkbox\">"
        + todos[i].name
        + "<button class=\"todo-item__delete\">delete</button>"
        + "</li>";
    }
    qs('.todo-list').innerHTML = listItems;
    console.log(todos);
}




// on load

// render list
renderTodos();