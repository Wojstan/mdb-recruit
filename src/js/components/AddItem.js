import {
  inputName,
  inputValue,
  selectCategory,
  selectFilter,
  selectType,
  table,
} from '../globalDom';
import SetGlobal from '../globalSets';
import DeleteItem from './DeleteItem';
import SelectToModify from './ModifyItem';
import FilterTable from './FilterTable';

// Adding item to local storage
const addLocalItem = () => {
  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }

  const maxID = items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0;
  const newItem = {
    id: maxID + 1,
    name: inputName.value,
    category: selectCategory.value,
    type: selectType.value,
    value: parseFloat(inputValue.value),
  };

  items.push(newItem);
  localStorage.setItem('items', JSON.stringify(items));
};

// Adding item to table
const AddItem = (event) => {
  event.preventDefault();

  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }
  if (!(inputName.value === '' || inputValue.value === '')) {
    const maxID = items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0;

    const trItem = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.innerText = maxID + 1;

    const tdName = document.createElement('td');
    tdName.innerText = inputName.value;

    const tdCategory = document.createElement('td');
    tdCategory.innerText = selectCategory.value;

    const tdValue = document.createElement('td');
    if (selectType.value === 'Amount') {
      tdValue.innerText = inputValue.value;
    } else {
      tdValue.innerText = `${inputValue.value} kg`;
    }

    //  Buttons for deleting and modifing tr
    const tdButtons = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('red-button');
    deleteButton.addEventListener('click', () => DeleteItem(trItem));

    const modifyButton = document.createElement('button');
    modifyButton.innerText = 'Modify';
    modifyButton.classList.add('blue-button');
    modifyButton.addEventListener('click', () => SelectToModify(trItem));

    //  Set current category filter to this category
    selectFilter.value = selectCategory.value;
    FilterTable();

    trItem.appendChild(tdId);
    trItem.appendChild(tdName);
    trItem.appendChild(tdCategory);
    trItem.appendChild(tdValue);
    tdButtons.appendChild(deleteButton);
    tdButtons.appendChild(modifyButton);
    trItem.appendChild(tdButtons);

    table.appendChild(trItem);
    addLocalItem();

    //  Update summary values
    SetGlobal();
  }
};
export default AddItem;
