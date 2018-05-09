// Filter vars
const ALL = "ALL";
const INCOMPLETE = "INCOMPLETE"
const COMPLETE = "COMPLETE";

// Initialise Local Storage
if (!localStorage.getItem("meta")) {
  let metaData = {    
    view: ALL
  }
  localStorage.setItem("meta", JSON.stringify(metaData));
  localStorage.setItem("todos", JSON.stringify({}));
} 


// Get DOM elements 
let todoListUl = qs('.todo-list');
let todoInput = qs(".todo-add__input");
let addButton = qs('.todo-button__add');
let filterAll = qs('.filter__all');
let filterIncomplete = qs('.filter__incomplete');
let filterComplete = qs('.filter__complete');
let todoFilter = qs('todo-filter');
let filterButtons = qsa('button', todoFilter);


// Add todo events
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keyup', function (event) {
  // if key is return
  if (event.which === 13) {
    addTodo();
  }
});

// Filter events
filterAll.addEventListener('click', function(event) {
  filter(ALL, event.target);
});
filterIncomplete.addEventListener('click', function(event) {
  filter(INCOMPLETE, event.target);
});
filterComplete.addEventListener('click', function(event) {
  filter(COMPLETE, event.target);
});

// Render stored todos
renderTodos();