import SetGlobal from '../globalSets';

// Delete item from local storage
const deleteLocalItems = (tr) => {
  let items;
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
  } else {
    items = [];
  }
  const positions = tr.querySelectorAll('td');
  const selectedRow = positions[0].innerHTML;

  const filteredItems = items.filter((item) => item.id !== parseInt(selectedRow, 10));
  localStorage.setItem('items', JSON.stringify(filteredItems));
};

// Delete item from table
const DeleteItem = (tr) => {
  tr.remove();
  deleteLocalItems(tr);

  //  Update summary values
  SetGlobal();
};

export default DeleteItem;
