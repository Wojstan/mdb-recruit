//  Setting summary values here
const SetGlobal = () => {
  let itemsAmount = 0;
  let itemsQuantity = 0;
  const allItems = JSON.parse(localStorage.getItem('items'));
  if (allItems) {
    //  Summary quantity
    const quantityItems = allItems.filter((item) => item.type === 'Quantity');
    let summaryQuantity = { value: 0 };
    if (quantityItems.length > 0) {
      summaryQuantity = quantityItems.reduce((prev, curr) => {
        return {
          value: prev.value + curr.value,
        };
      });
    }

    //  Summary amount
    const amountItems = allItems.filter((item) => item.type === 'Amount');
    let summaryAmount = { value: 0 };
    if (amountItems.length > 0) {
      summaryAmount = amountItems.reduce((prev, curr) => {
        return {
          value: prev.value + curr.value,
        };
      });
    }

    itemsAmount = summaryAmount.value;
    itemsQuantity = parseFloat(summaryQuantity.value).toFixed(2);

    const positions = document.querySelector('.positions');
    positions.innerHTML = allItems.length;
  }
  const quantity = document.querySelector('.quantity');
  quantity.innerHTML = `${itemsQuantity} kg`;

  const amount = document.querySelector('.amount');
  amount.innerHTML = itemsAmount;
};

export default SetGlobal;
