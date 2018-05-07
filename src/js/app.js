// Filter vars
const ALL = "ALL";
const INCOMPLETE = "INCOMPLETE"
const COMPLETE = "COMPLETE";

// Initialise Local Storage
// Set counter if none exists
if (!localStorage.getItem("meta")) {
  let metaData = {
    count: 0,
    view: ALL
  }
  localStorage.setItem("meta", JSON.stringify(metaData))
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
let filterComplete = qs('.filter__complete')


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
  view = 'ALL';
  swapActiveClass(this);
  filterTodos();
});
filterIncomplete.addEventListener('click', function () {
  view = 'INCOMPLETE';
  swapActiveClass(this);
  filterTodos();
});
filterComplete.addEventListener('click', function () {
  view = 'COMPLETE';
  swapActiveClass(this);
  filterTodos();
});