import { table } from '../globalDom';
import DeleteItem from './DeleteItem';
import SelectToModify from './ModifyItem';

//  Get items from local storage
const GetItems = () => {
  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }
  items.forEach((item) => {
    const trItem = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.innerText = item.id;

    const tdName = document.createElement('td');
    tdName.innerText = item.name;

    const tdCategory = document.createElement('td');
    tdCategory.innerText = item.category;

    const tdValue = document.createElement('td');
    if (item.type === 'Amount') {
      tdValue.innerText = item.value;
    } else {
      tdValue.innerText = `${item.value} kg`;
    }

    //  Buttons for deleting and modifying tr
    const tdButtons = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('red-button');
    deleteButton.addEventListener('click', () => DeleteItem(trItem));

    const modifyButton = document.createElement('button');
    modifyButton.innerText = 'Modify';
    modifyButton.classList.add('blue-button');
    modifyButton.addEventListener('click', () => SelectToModify(trItem));

    tdButtons.appendChild(deleteButton);
    tdButtons.appendChild(modifyButton);

    trItem.appendChild(tdId);
    trItem.appendChild(tdName);
    trItem.appendChild(tdCategory);
    trItem.appendChild(tdValue);
    trItem.appendChild(tdButtons);

    table.appendChild(trItem);
  });
};

export default GetItems;
