import { selectFilter, table } from '../globalDom';

const FilterTable = () => {
  const items = table.querySelectorAll('tr');

  items.forEach((item) => {
    const tdCategory = item.querySelectorAll('td')[2].innerText;
    switch (selectFilter.value) {
      case 'All':
        item.style.display = '';
        break;
      case 'Groceries':
        if (tdCategory === 'Groceries') {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
        break;
      case 'Meat':
        if (tdCategory === 'Meat') {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
        break;
      case 'Diary':
        if (tdCategory === 'Diary') {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
        break;
      case 'Other':
        if (tdCategory === 'Other') {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
        break;

      default:
        item.style.display = '';
        break;
    }
  });
};
export default FilterTable;
