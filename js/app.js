// Storage / state
let todos = [];
let view = 'ALL';

// input field
let todoInput = qs(".todo-add__input");


// Add todo event listeners
qs('.todo-button__add').addEventListener('click', addTodo);
// add event when enter key pressed
todoInput.addEventListener('keyup', function (event) {
  if (event.which === 13) {
    addTodo();
  }
});



function removeClass(selector, classname) {
  let buttons = qsa(selector);  
  for (let i = 0, l = buttons.length; i < l; i++) {
    if (buttons[i].classList.contains(classname)) {
      buttons[i].classList.remove(classname)
    }
  }
}

function swapActiveClass(target) {
  removeClass('.todo-button', 'todo-button__filter--active');
  if (!target.classList.contains('todo-button__filter--active')) {
    target.classList.add('todo-button__filter--active');
  }
}

// Filter button event listeners
qs('.filter__all').addEventListener('click', function() {
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

// filter list
filterTodos();


// helpers
function qs(selector) {
  return document.querySelector(selector);      
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}


// main functions
function bindTodoEvents() {
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
    })
  }
}


function addTodo() {
  let taskText = todoInput.value;
  // only add new todo if input field contains text
  if (taskText != "") {

    // New todo
    let newTodo = {};
    newTodo.name = todoInput.value;
    newTodo.completed = false;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);    

    // clear input field maintaining focus
    todoInput.value = "";
    todoInput.focus();
    // Append and bind events
    appendTodo(newTodo);
    bindTodoEvents();

    let dataId = "[data-id=\"" + newTodo.id + "\"]";

    let tl1 = new TimelineMax();
    let tl2 = new TimelineMax();
    // GSAP staggerTo...
    // FIRST VALUE IS DURATION
    // SECOND VALUE IS STAGGER GAP/DELAY
    tl1.staggerTo( dataId, 0.15, {
      ease: Power2.easeIn,
      display: "list-item",
      opacity: 1
    }, 0.05);

    tl2.staggerTo(dataId, 0.15, {
      ease: Power2.easeIn,
      x: 0
    }, 0.05);

  }
}


/*
*
* Using document.createElement() here as must mas element 
* of type 'Node' to appendChild() for it to work
*
*/

function appendTodo(newTodo) {
  let listItem = createListItem(newTodo);
  qs('.todo-list').appendChild(listItem);
}


function createListItem(newTodo) {
  let listItem = document.createElement('li');
  listItem.className = 'todo-item';
  listItem.setAttribute('data-id', newTodo.id);

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-item__checkbox';

  let name = document.createElement('span');
  name.innerText = newTodo.name;

  let button = document.createElement('button');
  button.className = 'todo-item__delete';
  button.innerText = 'Delete';

  if (newTodo.completed === true) {
    listItem.classList.add('todo-item--complete');
    checkbox.setAttribute('checked', 'checked');
  } 

  listItem.appendChild(checkbox);
  listItem.appendChild(name);
  listItem.appendChild(button);

  return listItem;

}


function deleteTodo(dataId) {
  // look over todos array for matched id and delete  
  for (let i = 0, l = todos.length; i < l; i++) {
    if (todos[i].id == dataId) {      
      todos = todos.slice(0, i).concat(todos.slice(i + 1));
      break;
    }
  }
  filterTodos();
}


function changeCheckbox(dataId) {  
  for (let i = 0, l = todos.length; i < l; i++) {
    if (todos[i].id == dataId) {
      if (todos[i].completed === false) {
        todos[i].completed = true;
      } else {
        todos[i].completed = false;
      }
      break;
    }
  }
  filterTodos();
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