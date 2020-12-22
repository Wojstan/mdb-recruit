import SetGlobal from '../globalSets';

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

const DeleteItem = (tr) => {
  tr.remove();
  deleteLocalItems(tr);
  SetGlobal();
};

export default DeleteItem;
