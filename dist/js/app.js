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

function updateLocalStore(newTitle, dataId) {  
  let todos = getTodos();
  let updatedTodo = Object.assign({}, todos[dataId]);
  delete todos[dataId];
  updatedTodo.title = newTitle;
  updatedTodo.id = newId(newTitle);
  todos[updatedTodo.id] = updatedTodo;
  setTodos(todos);
  return updatedTodo.id;
}

function toggleLocalStore(id) {
  let todos = getTodos();
  if (todos[id].complete == false ? todos[id].complete = true : todos[id].complete = false);
  setTodos(todos);
}
function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function newId(title) {
  return `${Math.floor(Math.random() * 1000)}`
       + `${Math.floor(Math.random() * 1000)}`
       + `${Math.floor(Math.random() * 1000)}`;
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

function editOpen(dataId) {
  let listItem = qs("[data-id=\"" + dataId + "\"]");
  let labelText = listItem.querySelector('label').innerText;

  // Remove old els
  listItem.querySelector('label').remove();
  listItem.querySelector('i').remove();
  listItem.querySelector('i').remove();

  let input = document.createElement('input');
  input.className = 'edit-input';
  input.value = labelText;
  input.addEventListener('blur', function(event) {
    // if input is empty - cancelEdit();
    // if not empty then save
  });
  // Select all input text automatically
  input.addEventListener('focus', function (event) {
    event.target.select();
  });  
  input.addEventListener('keyup', function (event) {
    // Return key saves too
    if (event.which === 13) {
      editSave(event.target);
    }
  });

  let saveButton = document.createElement('i');
  saveButton.className = 'fas fa-save btn-item btn-item__save';
  saveButton.addEventListener('click', function(event) {
    editSave(event.target);
  });

  let cancelButton = document.createElement('i');
  cancelButton.className = 'fas fa-times btn-item btn-item__cancel';
  cancelButton.addEventListener('click', function(event) {
    editCancel(event.target);
  });

  listItem.appendChild(input);
  listItem.appendChild(cancelButton);
  listItem.appendChild(saveButton);

  listItem.querySelector('.edit-input').focus();

}

function editSave(target) {  
  let listItem = target.parentNode;
  let newTitle = listItem.querySelector('.edit-input').value;
  let dataId = listItem.getAttribute('data-id');
  let newId = updateLocalStore(newTitle, dataId);
  let checkedAttribute = listItem.querySelector('input').getAttribute('checked');
  // New status data
  listItem.setAttribute('data-id', newId);

  // New checkbox
  let newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';
  if (checkedAttribute !== null) newCheckbox.setAttribute('checked', checkedAttribute);;
  newCheckbox.className = 'todo-item__checkbox toggle';
  newCheckbox.addEventListener('change', function (event) {
    changeCheckbox(newId, event.target);
  });

  // New label
  let title = document.createElement('label');
  title.innerText = newTitle;
  title.addEventListener('dblclick', function () {
    editOpen(newId);
  });

  // new buttons
  let editButton = document.createElement('i');
  editButton.className = 'fas fa-pencil-alt btn-item btn-item__edit';
  editButton.addEventListener('click', function () {
    editOpen(newId);
  });
  let deleteButton = document.createElement('i');
  deleteButton.className = 'fas fa-trash-alt btn-item btn-item__delete';
  deleteButton.addEventListener('click', function () {
    deleteTodo(newId);
  });

  // remove and replace
  listItem.innerHTML = '';
  listItem.appendChild(newCheckbox);
  listItem.appendChild(title);
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

}

function editCancel(target) {
  console.log("Cancel Edit");
}

// Filter Helpers
function markActiveClass(target) {
  target.parentNode.querySelectorAll('button')
    .forEach(button => {
      if (button.classList.contains('todo-button__filter--active')) {
        button.classList.remove('todo-button__filter--active')
      }
    });
  target.classList.add('todo-button__filter--active');
}

function filter(newView, target) {
  setView(newView);  
  markActiveClass(target);
  renderTodos();
}

/*
*   Update todos
*/ 

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
  title.addEventListener('dblclick', function() {
    editOpen(newTodo.id);
  })

  let editButton = document.createElement('i');
  editButton.className = 'fas fa-pencil-alt btn-item btn-item__edit';
  editButton.addEventListener('click', function () {
    editOpen(newTodo.id);
  });

  let deleteButton = document.createElement('i'); 
  deleteButton.className = 'fas fa-trash-alt btn-item btn-item__delete';
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
  listItem.appendChild(editButton);

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
  filteredTodos.forEach(todo => todoListUl.appendChild(createListItem(todo)));
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