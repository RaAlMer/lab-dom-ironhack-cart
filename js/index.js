// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');
  const priceNum = parseFloat(price.innerHTML);
  const quantityNum = parseFloat(quantity.value);
  const total = priceNum * quantityNum;
  const subtotal = product.querySelector(".subtotal span");
  subtotal.innerHTML = total;
}

function calculateAll() {
  // ITERATION 2
  const products = document.getElementsByClassName("product");
  for (let product of products){
    updateSubtotal(product)
  }

  // ITERATION 3
  const total = document.querySelector("#total-value span");
  const subtotal = document.querySelectorAll(".subtotal span");
  // Mapping the subtotal span into an array of its value
  const newSubtotal = Array.from(subtotal).map(value => {
    return parseFloat(value.innerHTML);
  });
  // Getting the sum of the subtotals
  const newerSubtotal = newSubtotal.reduce((accu, currentValue) => {
    return accu + currentValue;
  }, 0);
  total.innerHTML = newerSubtotal;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  const parent = target.parentNode;
  const parentCell = parent.parentNode;
  parentCell.remove();
  calculateAll();
}

// ITERATION 5

function createProduct() {
  const name = document.querySelector('.create-product input:first-child');
  const unitPr = document.querySelector('.create-product td:nth-child(2) input');
  
  const tbody = document.getElementById('cart').getElementsByTagName('tbody')[0];
  const newRow = document.createElement('tr');
  newRow.className = 'product';
  tbody.appendChild(newRow);
  const newCell = document.createElement('td');
  newCell.className = 'name';
  newCell.innerHTML = `<span>${name.value}</span>`;
  newRow.appendChild(newCell);
  const newCellPr = document.createElement('td');
  newCellPr.className = 'price';
  newCellPr.innerHTML = `$<span>${unitPr.value}</span>`;
  newRow.appendChild(newCellPr);
  const newCellQ = document.createElement('td');
  newCellQ.className = 'quantity';
  newCellQ.innerHTML = '<input type="number" value="0" min="0" placeholder="Quantity" />';
  newRow.appendChild(newCellQ);
  const newCellSub = document.createElement('td');
  newCellSub.className = 'subtotal';
  newCellSub.innerHTML = '$<span>0</span>';
  newRow.appendChild(newCellSub);
  const newCellBtn = document.createElement('td');
  newCellBtn.className = 'action';
  newCellBtn.innerHTML = '<button class="btn btn-remove">Remove</button>';
  newRow.appendChild(newCellBtn);
  newCellBtn.onclick = () => {
    const parentBtn = newCellBtn.parentNode;
    parentBtn.remove();
  };
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeElementBtn = document.getElementsByClassName("btn-remove");
  for (let rmvBtn of removeElementBtn){
    rmvBtn.addEventListener('click', removeProduct);
  };

  const createElementBtn = document.getElementById('create');
  createElementBtn.addEventListener('click', createProduct);
});
