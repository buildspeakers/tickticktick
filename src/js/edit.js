
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

  let saveButton = document.createElement('i');
  saveButton.className = 'fas fa-save btn-item btn-item__save';
  saveButton.addEventListener('click', function (event) {
    editSave(event.target);
  });

  let cancelButton = document.createElement('i');
  cancelButton.className = 'fas fa-times btn-item btn-item__cancel';
  cancelButton.addEventListener('click', function (event) {
    editCancel(event.target);
  });

  listItem.appendChild(input);
  listItem.appendChild(cancelButton);
  listItem.appendChild(saveButton);

  listItem.querySelector('.edit-input').focus();

}

function editSave(target) {
  let li = target.parentNode; // li
  // get new input text
  console.log(li.querySelector('.edit-input').value);
  // stick it in storage
  // remove input and buttons & add label with new title and buttons  
}

function editCancel(target) {
  console.log("Cancel Edit");
}
