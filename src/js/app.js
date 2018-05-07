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


// Storage / state
let todos = [];
let view = 'ALL';

// input field
let todoInput = qs(".todo-add__input");

// Initial event listeners

// Add todo
qs('.todo-button__add').addEventListener('click', addTodo);
// add event when enter key pressed
todoInput.addEventListener('keyup', function (event) {
  if (event.which === 13) {
    addTodo();
  }
});

// Filter todos
qs('.filter__all').addEventListener('click', function () {
  view = 'ALL';
  swapActiveClass(this);
  filterTodos();
});
qs('.filter__incomplete').addEventListener('click', function () {
  view = 'INCOMPLETE';
  swapActiveClass(this);
  filterTodos();
});
qs('.filter__complete').addEventListener('click', function () {
  view = 'COMPLETE';
  swapActiveClass(this);
  filterTodos();
});



//
// document loads
//

  // Look at local storage and render list based on what's there