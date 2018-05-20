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