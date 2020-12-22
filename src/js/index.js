import GetItems from './components/GetItems';
import SetGlobal from './globalSets';
import FilterTable from './components/FilterTable';

import { addButton, selectFilter } from './globalDom';
import AddItem from './components/AddItem';

document.addEventListener('DOMContentLoaded', GetItems);
document.addEventListener('DOMContentLoaded', SetGlobal);
selectFilter.addEventListener('change', FilterTable);
addButton.addEventListener('click', AddItem);

//  addButton.addEventListener("click", addItem);
//  categoryFilter.addEventListener("change", filterItems);
