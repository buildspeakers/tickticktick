// Increase / Reduce todo count
function getMeta() {
  return JSON.parse(localStorage.getItem("meta"));
}
function setMeta(meta) {
  localStorage.setItem("meta", JSON.stringify(meta));
}

function addLocalStore(newTodo) {
  // Increase Count
  let meta = getMeta();
  meta.count++;
  setMeta(meta);
  // Store new data object
  localStorage.setItem(newTodo.id, JSON.stringify(newTodo));    
}

function deleteLocalStore(id) {
  localStorage.removeItem(id);
}