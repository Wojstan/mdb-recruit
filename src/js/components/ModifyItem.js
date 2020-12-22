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

const Unselect = (event) => {
  event.target.remove();
  const modifyButton = document.querySelector('.modify-btn');
  modifyButton.remove();

  addButton.disabled = false;
};

const ModifyLocalStorage = (tr) => {
  const tds = tr.querySelectorAll('td');
  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }

  const item = items.find((element) => element.id === parseInt(tds[0].innerText, 10));
  item.name = tds[1].innerText;
  item.category = tds[2].innerText;
  item.value = parseFloat(tds[3].innerText, 10);
  item.type = selectType.value;

  localStorage.setItem('items', JSON.stringify(items));
};

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
  SetGlobal();
};

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

const ModifyItem = (tr) => {
  addButton.disabled = true;

  const tds = tr.querySelectorAll('td');

  inputName.value = tds[1].innerText;
  selectCategory.value = tds[2].innerText;
  inputValue.value = tds[3].innerText.match(/[\d.]+/);
  if (tds[3].innerText.includes('kg')) {
    selectType.value = 'Quantity';
  } else {
    selectType.value = 'Amount';
  }

  if (!document.querySelector('.unselect-btn')) {
    const unselectButton = document.createElement('button');
    unselectButton.innerHTML = `unselect row: ${tds[0].innerText}`;
    unselectButton.classList.add('btn');
    unselectButton.classList.toggle('btn-danger');
    unselectButton.classList.toggle('btn-sm');
    unselectButton.classList.toggle('unselect-btn');
    unselectButton.addEventListener('click', Unselect);

    CreateModifyButton(tr, tds[0]);

    addHeader.appendChild(unselectButton);
  } else {
    const modifyButton = document.querySelector('.modify-btn');
    modifyButton.remove();
    CreateModifyButton(tr, tds[0]);
    const unselectButton = document.querySelector('.unselect-btn');
    unselectButton.innerText = `unselect row: ${tds[0].innerText}`;
    unselectButton.addEventListener('click', Unselect);
  }
};

export default ModifyItem;
