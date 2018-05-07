// Increase / Reduce todo count
function getMeta() {
  return JSON.parse(localStorage.getItem("meta"));
}
function setMeta(meta) {
  localStorage.setItem("meta", JSON.stringify(meta));
}


function addLocalStore(todoText) {
  // Increase Count
  let meta = getMeta();
  meta.count++;
  setMeta(meta);

  // New todo for storage
  let newId = meta.count;  
  let todoData = {
    id: newId,
    title: todoText,
    complete: false
  }
  // Store new data object
  localStorage.setItem(newId, JSON.stringify(todoData));
  // Update count in local storage  
}