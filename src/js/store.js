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
  // newId(newTitle);
  let todos = getTodos();
  let updatedTodo = Object.assign({}, todos[dataId]);
  console.log(updatedTodo);
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