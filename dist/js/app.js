// Access view data
function getView() {
  return JSON.parse(localStorage.getItem("meta")).view;
}

function setView(newView) {
  let newMeta = JSON.parse(localStorage.getItem("meta"));
  newMeta.view = newView;
  localStorage.setItem("meta", JSON.stringify(newMeta))
}


// Update todo data
function getTodos() {
  return JSON.parse(localStorage.getItem("todos"));
}

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));  
}

function addLocalStore(newTodo) {
  let todos = getTodos();  
  todos[newTodo.id] = newTodo;
  setTodos(todos); 
}

function deleteLocalStore(id) {
  let todos = getTodos();
  delete todos[id];
  setTodos(todos); 
}

function toggleLocalStore(id) {
  let todos = getTodos();
  if (todos[id].complete == false ? todos[id].complete = true : todos[id].complete = false);
  setTodos(todos);
}
function staggerIn() {
  // Fade in one by one
  let todosTl = new TimelineMax();
  // duration: 0.15s
  // delay/gap: 0.05s
  todosTl.staggerTo('.todo-item', 0.15, {
    ease: Power2.easeIn,
    display: "list-item",
    opacity: 1,
    x: 0
  }, 0.05);
}

function fadeIn(dataId) {
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

function fadeOut(dataId, deleteNode) {
  TweenMax.to(dataId, 0.15, {
    ease: Power2.easeIn,
    opacity: 0
  });
  TweenMax.to(dataId, 0.15, {
    ease: Power2.easeIn,
    x: 10,
    onComplete: deleteNode
  });
}
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

// Filter Helpers
function markActiveClass(target) {
  let buttons = target.parentNode.querySelectorAll('button');
  for (let i = 0, l = buttons.length; i < l; i++) {
    if (buttons[i].classList.contains('todo-button__filter--active')) {
      buttons[i].classList.remove('todo-button__filter--active')
    }
  }
  target.classList.add('todo-button__filter--active');
}

function filter(newView, target) {
  setView(newView);
  // Must remove active class from whatever filter button has it
  // Then add filter class to button that's been clicked
  markActiveClass(target);
  renderTodos();
}

/*
*   Update todos
*/ 

function newId(title) {
  return `${title}_${Math.floor(Math.random() * 1000000000)}`;
}

// Bound to add button
function addTodo() {
  let todoText = todoInput.value;
  if (todoText != "") {
    // New todo Obj to play with
    let newTodo = {
      id: newId(todoText),
      title: todoText,      
      complete: false
    }
    // Update local storage
    addLocalStore(newTodo);
    // Clear inout field
    todoInput.value = "";
    todoInput.focus();
    // Append new DOM element
    appendTodo(newTodo);
    // Animate it
    let dataId = "[data-id=\"" + newTodo.id + "\"]";
    fadeIn(dataId);
  }
}

// Bound to delete button
function deleteTodo(dataId) {
  deleteLocalStore(dataId);
  unappendTodo(dataId)
}




function createListItem(newTodo) {
  let listItem = document.createElement('li'); // Using document.createElement() - element must be of type 'Node' to use appendChild()
  listItem.className = 'todo-item';
  listItem.setAttribute('data-id', newTodo.id);

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-item__checkbox toggle';
  checkbox.addEventListener('change', function(event) {
    changeCheckbox(newTodo.id, event.target);
  });

  let title = document.createElement('label');
  title.innerText = newTodo.title;

  let deleteButton = document.createElement('button');
  deleteButton.className = 'todo-button todo-item__delete';
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteTodo(newTodo.id);
  });

  if (newTodo.complete === true) {
    listItem.classList.add('todo-item--complete');
    checkbox.setAttribute('checked', 'checked');
  }

  listItem.appendChild(checkbox);
  listItem.appendChild(title);
  listItem.appendChild(deleteButton);

  return listItem;

}

// Toggle complete/incomplete
function changeCheckbox(id, target) {
  toggleLocalStore(id);
  if (target.parentNode.classList.contains('todo-item--complete')) {
    target.parentNode.classList.remove('todo-item--complete');
  } else {
    target.parentNode.classList.add('todo-item--complete');
  }
  if (getView() != ALL) unappendTodo(id);
}


/*
*
*   CHANGE DOM
*
*/

function appendTodo(newTodo) {
  let listItem = createListItem(newTodo);
  todoListUl.appendChild(listItem);
}

function unappendTodo(dataId) {
  let dataIdVal = "[data-id=\"" + dataId + "\"]";  
  // Animate (pass deleteNode function as it's called when animation ends)
  fadeOut(dataIdVal, deleteNode);
  // Delete node
  let todoNode = qs(dataIdVal);  
  function deleteNode() {
    setTimeout(function () {
      todoNode.parentNode.removeChild(todoNode);
    }, 150);
  }
}

// Render Whole List
function renderTodos() {  
  let todos = getTodos();  
  let todosArray = []; // create array to filter based on view
  for (let key in todos) todosArray.push(todos[key]);
  if (getView() == COMPLETE) {
    filteredTodos = todosArray.filter(todo => todo.complete == true);
  } else if (getView() == INCOMPLETE) {
    filteredTodos = todosArray.filter(todo => todo.complete == false);
  } else {
    filteredTodos = todosArray;
  }
  // Clear list and re-render
  todoListUl.innerHTML = '';
  for (let i = 0, l = filteredTodos.length; i < l; i++) {
    todoListUl.appendChild(createListItem(filteredTodos[i]));
  }
  // Animate
  staggerIn();
}
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