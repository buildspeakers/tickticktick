
function editOpen(dataId) {
  let listItem = qs("[data-id=\"" + dataId + "\"]");
  let labelText = listItem.querySelector('label').innerText;

  // Remove old els
  listItem.querySelector('label').remove();
  listItem.querySelector('i').remove();
  listItem.querySelector('i').remove();

  let input = document.createElement('input');
  input.className = 'edit-input';
  input.setAttribute('placeholder', labelText);
  input.addEventListener('blur', function(event) {
    // if input is empty - cancelEdit();
    // if not empty then save
  });
  input.addEventListener('keyup', function (event) {
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
