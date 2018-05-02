//
//
// helper functions
//
//
function qs(selector) {
  return document.querySelector(selector); 
  alert('works')   
}


// Storage
let todos = [];


// input field
let todoInput = qs(".todo-add__input");


// Add new task text to storage
qs('.todo-add__button').addEventListener('click', function(){
  let taskText = todoInput.value;
  if (taskText != "") {
    todos.push(todoInput.value);
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
        + todos[i]
        + "<button class=\"todo-item__delete\">delete</button>"
        + "</li>";
    }
    qs('.todo-list').innerHTML = listItems;
}




// on load

// render list
renderTodos();