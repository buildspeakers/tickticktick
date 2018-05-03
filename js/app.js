// Storage / state
let todos = [];
let view = 'ALL';

// input field
let todoInput = qs(".todo-add__input");


// Add todo event listeners
qs('.todo-add__button').addEventListener('click', addTodo);
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

// Filter button event listeners
qs('.filter__all').addEventListener('click', function() {
  view = 'ALL';
  removeClass('.filter__button', 'filter__button--active');
  if (!this.classList.contains('filter__button--active')) {
    this.classList.add('filter__button--active');
  }
  renderTodos();
});
qs('.filter__incomplete').addEventListener('click', function () {
  view = 'INCOMPLETE';
  removeClass('.filter__button', 'filter__button--active');
  if (!this.classList.contains('filter__button--active')) {
    this.classList.add('filter__button--active');
  }
  renderTodos();
});
qs('.filter__complete').addEventListener('click', function () {
  view = 'COMPLETE';
  removeClass('.filter__button', 'filter__button--active');
  if (!this.classList.contains('filter__button--active')) {
    this.classList.add('filter__button--active');
  }
  renderTodos();
});

// render list
renderTodos();




////////////////////////////////////////////////////////
// functions


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

    // render list
    renderTodos();
  }
}


function deleteTodo(dataId) {
  // look over todos array for matched id and delete  
  for (let i = 0, l = todos.length; i < l; i++) {
    if (todos[i].id == dataId) {      
      todos = todos.slice(0, i).concat(todos.slice(i + 1));
      break;
    }
  }
  renderTodos();
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
  renderTodos();
}



// Write list to DOM
function renderTodos() {
  if (view == 'COMPLETE') {
    filteredTodos = todos.filter(todo => todo.completed == true);
  } else if (view == 'INCOMPLETE') {
    filteredTodos = todos.filter(todo => todo.completed == false);
  } else {
    filteredTodos = todos;
  }
  let listItems = "";
  for (let i = 0, l = filteredTodos.length; i < l; i++) {      
    if (filteredTodos[i].completed === false) {
      listItems += "<li class=\"todo-item\" data-id=\"" + filteredTodos[i].id + "\">"
      + "<input class=\"todo-item__checkbox\" type=\"checkbox\">";
    } else {
      listItems += "<li class=\"todo-item todo-item--complete\" data-id=\"" + filteredTodos[i].id + "\">"
      + "<input class=\"todo-item__checkbox\" type=\"checkbox\" checked>"
    }         
    listItems += filteredTodos[i].name
      + "<button class=\"todo-item__delete\">delete</button>"
      + "</li>";
  }
  qs('.todo-list').innerHTML = listItems;

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