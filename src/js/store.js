// Change view
function getMeta() {
  return JSON.parse(localStorage.getItem("meta"));
}
function setMeta(meta) {
  localStorage.setItem("meta", JSON.stringify(meta));
}
function setView(newView) {
  let newMeta = getMeta();
  newMeta.view = newView;
  setMeta(newMeta);
}


// Update todos
function getTodos() {
  return JSON.parse(localStorage.getItem("todos"));
}

function addLocalStore(newTodo) {

  let todos = getTodos();
  // Give it new todo obj
  todos[newTodo.id] = newTodo;
  // Restore todos obj
  localStorage.setItem("todos", JSON.stringify(todos));   

}

function deleteLocalStore(id) {

  let todos = getTodos();
  // Remove todo
  delete todos[id];
  // Restore todos obj
  localStorage.setItem("todos", JSON.stringify(todos)); 

}

// Complete / Incomplete
function toggleLocalStore(id) {

  let todos = getTodos();
  // Toggle
  if (todos[id].complete == false ? todos[id].complete = true : todos[id].complete = false);
  // Restore todos obj
  localStorage.setItem("todos", JSON.stringify(todos));  

}