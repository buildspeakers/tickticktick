// Increase / Reduce todo count
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


function getTodo(id) {
  // return individual todo
  return JSON.parse(localStorage.getItem(id));
}
function setTodo(todo) {
  deleteLocalStore(todo.id);  
  localStorage.setItem(todo.id, JSON.stringify(todo));
}

function addLocalStore(newTodo) {

  // Increase Count
  let meta = getMeta();
  meta.count++;
  setMeta(meta);

  // Get todos obj from localStorage
  let todos = JSON.parse(localStorage.getItem("todos"));
  // Give it new todo obj
  todos[newTodo.id] = newTodo;
  // Restore todos obj
  localStorage.setItem("todos", JSON.stringify(todos));   

}

function deleteLocalStore(id) {
  localStorage.removeItem(id);
}

// Complete / Incomplete
function toggleLocalStore(id) {

  // Get todos obj from localStorage
  let todos = JSON.parse(localStorage.getItem("todos"));
  // Toggle
  if (todos[id].complete == false ? todos[id].complete = true : todos[id].complete = false);
  // Restore todos obj
  localStorage.setItem("todos", JSON.stringify(todos));  
  
}