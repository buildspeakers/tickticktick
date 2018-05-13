
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
  // stick it in storage
  updateLocalStore(newTitle, dataId);
  // remove input and buttons & add label with new title and buttons  
}

function editCancel(target) {
  console.log("Cancel Edit");
}
