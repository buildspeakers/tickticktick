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
let todos = ['item1', 'item2', 'item3'];


// input field
let todoInput = qs(".todo-add__input");


// Add new task text to storage
qs('.todo-add__button').addEventListener('click', function(){

  todos.push(todoInput.value);  
  
    // render list
  renderTodos();
});


// Write list to DOM
function renderTodos() {
    let listItems = "";
    for (let i = 0, l = todos.length; i < l; i++) {
      listItems += "<li>" + todos[i] + "</li>";
    }
    qs('.todo-list').innerHTML = listItems;
}

