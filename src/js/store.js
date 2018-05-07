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

  // Store new data object
  let todos = JSON.parse(localStorage.getItem("todos"));

  console.log(todos);

  console.log("newTodo.id : "+newTodo.id);

  let id = newTodo.id; 
  todos[id] = newTodo;

  console.log(newTodo.id);

  localStorage.setItem("todos", JSON.stringify(todos));    
}

function deleteLocalStore(id) {
  localStorage.removeItem(id);
}

// Complete / Incomplete
function toggleLocalStore(id) {
  let todo = getTodo(id);
  if (todo.complete == false ? todo.complete = true : todo.complete = false);
  setTodo(todo);
}