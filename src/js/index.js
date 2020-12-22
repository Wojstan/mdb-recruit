import GetItems from './components/GetItems';
import SetGlobal from './globalSets';
import FilterTable from './components/FilterTable';

import { addButton, selectFilter } from './globalDom';
import AddItem from './components/AddItem';

//  Basic event listeners
document.addEventListener('DOMContentLoaded', GetItems);
document.addEventListener('DOMContentLoaded', SetGlobal);
selectFilter.addEventListener('change', FilterTable);
addButton.addEventListener('click', AddItem);
