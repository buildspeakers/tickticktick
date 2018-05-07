/*
*
*    HELPERS
*
*/
function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function removeClassFromAll(selector, classname) {
  let buttons = qsa(selector);
  for (let i = 0, l = buttons.length; i < l; i++) {
    if (buttons[i].classList.contains(classname)) {
      buttons[i].classList.remove(classname)
    }
  }
}


/*
*
*   Handle events
*
*/ 

// Bound to add button
function addTodo() {
  let todoText = todoInput.value;
  if (todoText != "") {    
    let newTodo = storeTodo(todoText);
    // clear input field maintaining focus
    todoInput.value = "";
    todoInput.focus();
    // Append and bind events
    appendTodo(newTodo);
    bindTodoEvents();
    // Animate it
    let dataId = "[data-id=\"" + newTodo.id + "\"]";
    TweenMax.to(dataId, 0.15, {
      ease: Power2.easeIn,
      display: "list-item",
      opacity: 1
    });
    TweenMax.to(dataId, 0.15, {
      ease: Power2.easeIn,
      x: 0
    });
  }
}

// Bound to delete button
function deleteTodo(dataId) {
  unStoreTodo(dataId);
  unappendTodo(dataId)
}


// ADD TO OR REMOVE FORM STORAGE
function storeTodo(todoText) {

  // Old storage
  let newTodo = {};
  newTodo.name = todoText;
  newTodo.completed = false;
  newTodo.id = todos.length + 1;

  // Existing meta data
  let meta = JSON.parse(localStorage.getItem("meta"));
  meta.count++;  
  let newId = meta.count;
  console.log('new id: ' + newId);
  // New local data object
  let todoData = {
    id: newId,
    title: todoText,
    complete: false
  }
  // Store new data object
  localStorage.setItem(newTodo.id, JSON.stringify(todoData));
  // Update count in local storage
  localStorage.setItem("meta", JSON.stringify(meta));

  // Old storage
  todos.push(newTodo);
  return newTodo;
}


function unStoreTodo(dataId) {
  for (let i = 0, l = todos.length; i < l; i++) {
    if (todos[i].id == dataId) {
      todos = todos.slice(0, i).concat(todos.slice(i + 1));
      break;
    }
  }
}


/*
*
*   CHANGE DOM
*
*/

function appendTodo(newTodo) {
  let listItem = createListItem(newTodo);
  qs('.todo-list').appendChild(listItem);
}

function unappendTodo(dataId) {
  let dataIdVal = "[data-id=\"" + dataId + "\"]";
  let todoNode = qs(dataIdVal);
  TweenMax.to(todoNode, 0.15, {
    ease: Power2.easeIn,
    opacity: 0
  });
  TweenMax.to(todoNode, 0.15, { ease: Power2.easeIn, x: 10, onComplete: deleteNode });
  function deleteNode() {
    setTimeout(function () {
      todoNode.parentNode.removeChild(todoNode);
    }, 150);
  }
}


function createListItem(newTodo) {
  let listItem = document.createElement('li'); // Using document.createElement() - element must be of type 'Node' to use appendChild()
  listItem.className = 'todo-item';
  listItem.setAttribute('data-id', newTodo.id);

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-item__checkbox';

  let name = document.createElement('span');
  name.innerText = newTodo.name;

  let deleteButton = document.createElement('button');
  deleteButton.className = 'todo-button todo-item__delete';
  deleteButton.innerText = 'Delete';

  if (newTodo.completed === true) {
    listItem.classList.add('todo-item--complete');
    checkbox.setAttribute('checked', 'checked');
  }

  listItem.appendChild(checkbox);
  listItem.appendChild(name);
  listItem.appendChild(deleteButton);

  return listItem;

}





function changeCheckbox(dataId) {
  console.log('Checkbox Fires!!!');
  for (let i = 0, l = todos.length; i < l; i++) {
    if (todos[i].id == dataId) {
      if (todos[i].completed === false ? todos[i].completed = true : todos[i].completed = false)      
      break;
    }
  }
  if (view != 'ALL') unappendTodo(dataId);
}


/*
*
*   Filter List
*
*/

function swapActiveClass(target) {
  removeClassFromAll('.todo-button', 'todo-button__filter--active');
  if (!target.classList.contains('todo-button__filter--active')) {
    target.classList.add('todo-button__filter--active');
  }
}

// Write list to DOM
function filterTodos() {
  if (view == 'COMPLETE') {
    filteredTodos = todos.filter(todo => todo.completed == true);
  } else if (view == 'INCOMPLETE') {
    filteredTodos = todos.filter(todo => todo.completed == false);
  } else {
    filteredTodos = todos;
  }
  let ul = qs('.todo-list');
  ul.innerHTML = '';
  for (let i = 0, l = filteredTodos.length; i < l; i++) {
    ul.appendChild(createListItem(filteredTodos[i]));
  }
  // animatey
  let tl1 = new TimelineMax();
  let tl2 = new TimelineMax();
  // GSAP staggerTo...
  // FIRST VALUE IS DURATION
  // SECOND VALUE IS STAGGER GAP/DELAY
  tl1.staggerTo('.todo-item', 0.15, {
    ease: Power2.easeIn,
    display: "list-item",
    opacity: 1
  }, 0.05);

  tl2.staggerTo('.todo-item', 0.15, {
    ease: Power2.easeIn,
    x: 0
  }, 0.05);
  bindTodoEvents();
}

function bindTodoEvents() {
  console.log("bindTodoEvents fires");
  let todoEls = qsa('.todo-item');
  for (let i = 0, l = todoEls.length; i < l; i++) {
    let todo = todoEls[i];
    let dataId = todo.getAttribute('data-id');
    // delete event
    todo.querySelector('.todo-item__delete').addEventListener('click', function() {
      deleteTodo(dataId);
    });
    // checkbox event
    todo.querySelector('.todo-item__checkbox').addEventListener('change', function() {
      changeCheckbox(dataId);
    });
  }
}
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