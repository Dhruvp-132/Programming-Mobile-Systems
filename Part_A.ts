// Part 1: Basic TypeScript Inventory Management System

// Define the Item interface with strict typing
interface Item {
  id: string; // Unique identifier
  name: string; // Item name
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous'; // Restricted categories
  quantity: number; // Quantity in stock
  price: number; // Price per item
  supplier: string; // Supplier name
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'; // Stock status
  popular: boolean; // Is it a popular item?
  comment?: string; // Optional comment
}

// Global inventory array to store items (persists during session)
let inventory: Item[] = [];

// Function to validate if an ID is unique
function isIdUnique(id: string): boolean {
  return !inventory.some(item => item.id === id);
}

// Function to validate required fields (all except comment)
function validateItem(item: Partial<Item>): string | null {
  if (!item.id || !item.name || !item.category || item.quantity === undefined || item.price === undefined || !item.supplier || !item.status || item.popular === undefined) {
    return 'All fields except Comment are required.';
  }
  if (!isIdUnique(item.id!)) {
    return 'Item ID must be unique.';
  }
  if (item.quantity! < 0 || item.price! < 0) {
    return 'Quantity and Price must be non-negative.';
  }
  return null; // No errors
}

// Function to add a new item
function addItem(item: Item): string {
  const error = validateItem(item);
  if (error) return error;
  inventory.push(item);
  return 'Item added successfully.';
}

// Function to find an item by name (returns the first match, assuming names might not be unique)
function findItemByName(name: string): Item | undefined {
  return inventory.find(item => item.name.toLowerCase() === name.toLowerCase());
}

// Function to update an item by name (full update, replaces the item)
function updateItemByName(name: string, updatedItem: Item): string {
  const index = inventory.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  if (index === -1) return 'Item not found.';
  const error = validateItem(updatedItem);
  if (error) return error;
  // Ensure ID uniqueness, but since it's update, allow same ID if it's the same item
  if (updatedItem.id !== inventory[index].id && !isIdUnique(updatedItem.id)) {
    return 'Item ID must be unique.';
  }
  inventory[index] = updatedItem;
  return 'Item updated successfully.';
}

// Function to delete an item by name with confirmation (simulated via return message)
function deleteItemByName(name: string, confirm: boolean): string {
  if (!confirm) return 'Deletion not confirmed.';
  const index = inventory.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  if (index === -1) return 'Item not found.';
  inventory.splice(index, 1);
  return 'Item deleted successfully.';
}

// Function to search items by name (partial match)
function searchItemsByName(name: string): Item[] {
  return inventory.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}

// Function to get all items
function getAllItems(): Item[] {
  return inventory;
}

// Function to get popular items
function getPopularItems(): Item[] {
  return inventory.filter(item => item.popular);
}

// Function to render items as HTML string
function renderItems(items: Item[]): string {
  if (items.length === 0) return '<p>No items found.</p>';
  return items.map(item => `
    <div class="item">
      <h3>${item.name}</h3>
      <p>ID: ${item.id}</p>
      <p>Category: ${item.category}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Supplier: ${item.supplier}</p>
      <p>Status: ${item.status}</p>
      <p>Popular: ${item.popular ? 'Yes' : 'No'}</p>
      <p>Comment: ${item.comment || 'N/A'}</p>
    </div>
  `).join('');
}

// Example usage (for testing in console with HTML)
// console.log(addItem({ id: '1', name: 'Laptop', category: 'Electronics', quantity: 5, price: 1000, supplier: 'SupplierA', status: 'In Stock', popular: true, comment: 'Good item' }));
// console.log(getAllItems());
