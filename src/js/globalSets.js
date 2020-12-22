const SetGlobal = () => {
  let itemsAmount = 0;
  let itemsWeight = 0;
  const allItems = JSON.parse(localStorage.getItem('items'));
  if (allItems) {
    const quantityItems = allItems.filter((item) => item.type === 'Quantity');
    let summaryQuantity = { value: 0 };
    if (quantityItems.length > 0) {
      summaryQuantity = quantityItems.reduce((prev, curr) => {
        return {
          value: prev.value + curr.value,
        };
      });
    }

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
    itemsWeight = parseFloat(summaryQuantity.value).toFixed(2);

    const positions = document.querySelector('.positions');
    positions.innerHTML = allItems.length;
  }
  const weight = document.querySelector('.quantity');
  weight.innerHTML = `${itemsWeight} kg`;

  const number = document.querySelector('.amount');
  number.innerHTML = itemsAmount;
};

export default SetGlobal;
