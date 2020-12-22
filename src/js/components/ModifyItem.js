import {
  addHeader,
  inputName,
  inputValue,
  selectCategory,
  addButton,
  itemForm,
  selectType,
} from '../globalDom';
import SetGlobal from '../globalSets';

//  Unselect table's tr (abort modyfing of the row)
const Unselect = (event) => {
  event.target.remove();
  const modifyButton = document.querySelector('.modify-btn');
  modifyButton.remove();

  addButton.disabled = false;
};

// Modify values in local storage
const ModifyLocalStorage = (tr) => {
  const tds = tr.querySelectorAll('td');
  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }

  //  Find by item id
  const item = items.find((element) => element.id === parseInt(tds[0].innerText, 10));
  item.name = tds[1].innerText;
  item.category = tds[2].innerText;
  item.value = parseFloat(tds[3].innerText, 10);
  item.type = selectType.value;

  localStorage.setItem('items', JSON.stringify(items));
};

//  Modify values in the table
const ModifyValue = (tr) => {
  const tds = tr.querySelectorAll('td');
  tds[1].innerText = inputName.value;
  tds[2].innerText = selectCategory.value;
  if (selectType.value === 'Amount') {
    tds[3].innerText = inputValue.value;
  } else {
    tds[3].innerText = `${inputValue.value} kg`;
  }

  ModifyLocalStorage(tr);
  //  Update summary values
  SetGlobal();
};

//  Create button to submit changes
const CreateModifyButton = (tr, tds) => {
  const modifyButton = document.createElement('button');
  modifyButton.innerHTML = `Modify row: ${tds.innerText}`;
  modifyButton.classList.add('modify-btn');
  modifyButton.classList.toggle('btn');
  modifyButton.classList.toggle('blue-button');
  modifyButton.type = 'button';
  modifyButton.addEventListener('click', () => ModifyValue(tr));

  itemForm.appendChild(modifyButton);
};

//  Select tr to modify
const SelectToModify = (tr) => {
  //  Disable adding item during modifying
  addButton.disabled = true;

  const tds = tr.querySelectorAll('td');

  //  Cell tds[1] is name
  inputName.value = tds[1].innerText;
  //  Cell tds[2] is category
  selectCategory.value = tds[2].innerText;
  //  Get number value from tdValue (may contain 'kg')
  inputValue.value = tds[3].innerText.match(/[\d.]+/);

  //  Set the right type in typeSelect
  if (tds[3].innerText.includes('kg')) {
    selectType.value = 'Quantity';
  } else {
    selectType.value = 'Amount';
  }

  //  Add unselect button if there is no one
  if (!document.querySelector('.unselect-btn')) {
    const unselectButton = document.createElement('button');
    unselectButton.innerHTML = `unselect row: ${tds[0].innerText}`;
    unselectButton.classList.add('btn');
    unselectButton.classList.toggle('btn-danger');
    unselectButton.classList.toggle('btn-sm');
    unselectButton.classList.toggle('unselect-btn');
    unselectButton.addEventListener('click', Unselect);

    //  Also create the button to submit modyfication
    CreateModifyButton(tr, tds[0]);

    addHeader.appendChild(unselectButton);
  } else {
    const modifyButton = document.querySelector('.modify-btn');
    //  Delete previous modify button, it has not actual event listener
    modifyButton.remove();
    CreateModifyButton(tr, tds[0]);
    //  Edit unselect button
    const unselectButton = document.querySelector('.unselect-btn');
    unselectButton.innerText = `unselect row: ${tds[0].innerText}`;
    unselectButton.addEventListener('click', Unselect);
  }
};

export default SelectToModify;
