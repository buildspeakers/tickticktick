// Filter vars
const ALL = "ALL";
const INCOMPLETE = "INCOMPLETE"
const COMPLETE = "COMPLETE";

// Initialise Local Storage
// Set counter if none exists
if (!localStorage.getItem("meta")) {
  let metaData = {    
    view: ALL
  }
  localStorage.setItem("meta", JSON.stringify(metaData));
  localStorage.setItem("todos", JSON.stringify({}));
} 

// On load

  // If there is already data render todos based on that



// Storage / state
let todos = [];
let view = 'ALL';

// Get DOM elements 
let todoInput = qs(".todo-add__input");
let addButton = qs('.todo-button__add');
let filterAll = qs('.filter__all');
let filterIncomplete = qs('.filter__incomplete');
let filterComplete = qs('.filter__complete');

let todoListUl = qs('.todo-list');


//
// document loads
//

  // Look at local storage and render list based on what's there




//
// Initial Button event listeners
//
// Add todo
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keyup', function (event) {
  // if key is return
  if (event.which === 13) {
    addTodo();
  }
});

// Filter todos
filterAll.addEventListener('click', function () {
  setView(ALL);
  view = 'ALL';
  swapActiveClass(this);
  renderTodos();
});
filterIncomplete.addEventListener('click', function () {
  setView(INCOMPLETE);
  view = 'INCOMPLETE';
  swapActiveClass(this);
  renderTodos();
});
filterComplete.addEventListener('click', function () {
  setView(COMPLETE);
  view = 'COMPLETE';
  swapActiveClass(this);
  renderTodos();
});

