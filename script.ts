// script.ts (to be compiled to app.js)
// This file integrates the TypeScript functions with the HTML DOM

// Event listeners for Add Item
document.getElementById('add-form')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const item: Item = {
    id: (document.getElementById('add-id') as HTMLInputElement).value,
    name: (document.getElementById('add-name') as HTMLInputElement).value,
    category: (document.getElementById('add-category') as HTMLSelectElement).value as Item['category'],
    quantity: parseInt((document.getElementById('add-quantity') as HTMLInputElement).value),
    price: parseFloat((document.getElementById('add-price') as HTMLInputElement).value),
    supplier: (document.getElementById('add-supplier') as HTMLInputElement).value,
    status: (document.getElementById('add-status') as HTMLSelectElement).value as Item['status'],
    popular: (document.getElementById('add-popular') as HTMLSelectElement).value === 'true',
    comment: (document.getElementById('add-comment') as HTMLTextAreaElement).value || undefined
  };
  const message = addItem(item);
  document.getElementById('add-message')!.innerHTML = `<p class="${message.includes('successfully') ? 'success' : 'message'}">${message}</p>`;
  (document.getElementById('add-form') as HTMLFormElement).reset();
});

// Event listeners for Update Item
document.getElementById('load-update')!.addEventListener('click', () => {
  const name = (document.getElementById('update-name') as HTMLInputElement).value;
  const item = findItemByName(name);
  if (item) {
    (document.getElementById('update-id') as HTMLInputElement).value = item.id;
    (document.getElementById('update-item-name') as HTMLInputElement).value = item.name;
    (document.getElementById('update-category') as HTMLSelectElement).value = item.category;
    (document.getElementById('update-quantity') as HTMLInputElement).value = item.quantity.toString();
    (document.getElementById('update-price') as HTMLInputElement).value = item.price.toString();
    (document.getElementById('update-supplier') as HTMLInputElement).value = item.supplier;
    (document.getElementById('update-status') as HTMLSelectElement).value = item.status;
    (document.getElementById('update-popular') as HTMLSelectElement).value = item.popular.toString();
    (document.getElementById('update-comment') as HTMLTextAreaElement).value = item.comment || '';
    document.getElementById('update-form')!.style.display = 'block';
  } else {
    document.getElementById('update-message')!.innerHTML = '<p class="message">Item not found.</p>';
  }
});

document.getElementById('update-form')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const updatedItem: Item = {
    id: (document.getElementById('update-id') as HTMLInputElement).value,
    name: (document.getElementById('update-item-name') as HTMLInputElement).value,
    category: (document.getElementById('update-category') as HTMLSelectElement).value as Item['category'],
    quantity: parseInt((document.getElementById('update-quantity') as HTMLInputElement).value),
    price: parseFloat((document.getElementById('update-price') as HTMLInputElement).value),
    supplier: (document.getElementById('update-supplier') as HTMLInputElement).value,
    status: (document.getElementById('update-status') as HTMLSelectElement).value as Item['status'],
    popular: (document.getElementById('update-popular') as HTMLSelectElement).value === 'true',
    comment: (document.getElementById('update-comment') as HTMLTextAreaElement).value || undefined
  };
  const message = updateItemByName((document.getElementById('update-name') as HTMLInputElement).value, updatedItem);
  document.getElementById('update-message')!.innerHTML = `<p class="${message.includes('successfully') ? 'success' : 'message'}">${message}</p>`;
  document.getElementById('update-form')!.style.display = 'none';
});

// Event listeners for Delete Item
document.getElementById('confirm-delete')!.addEventListener('click', () => {
  const name = (document.getElementById('delete-name') as HTMLInputElement).value;
  if (findItemByName(name)) {
    document.getElementById('delete-confirm')!.style.display = 'block';
  } else {
    document.getElementById('delete-message')!.innerHTML = '<p class="message">Item not found.</p>';
  }
});

document.getElementById('yes-delete')!.addEventListener('click', () => {
  const name = (document.getElementById('delete-name') as HTMLInputElement).value;
  const message = deleteItemByName(name, true);
  document.getElementById('delete-message')!.innerHTML = `<p class="${message.includes('successfully') ? 'success' : 'message'}">${message}</p>`;
  document.getElementById('delete-confirm')!.style.display = 'none';
});

document.getElementById('no-delete')!.addEventListener('click', () => {
  document.getElementById('delete-confirm')!.style.display = 'none';
  document.getElementById('delete-message')!.innerHTML = '<p>Deletion cancelled.</p>';
});

// Event listeners for Search
document.getElementById('search-btn')!.addEventListener('click', () => {
  const name = (document.getElementById('search-name') as HTMLInputElement).value;
  const results = searchItemsByName(name);
  document.getElementById('search-results')!.innerHTML = renderItems(results);
});

// Event listeners for Display All
document.getElementById('display-all')!.addEventListener('click', () => {
  const items = getAllItems();
  document.getElementById('all-items')!.innerHTML = renderItems(items);
});

// Event listeners for Display Popular
document.getElementById('display-popular')!.addEventListener('click', () => {
  const items = getPopularItems();
  document.getElementById('popular-items')!.innerHTML = renderItems(items);
});
