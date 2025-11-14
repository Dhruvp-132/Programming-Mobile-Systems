// Part 1: Basic TypeScript Inventory Management System
// Global inventory array to store items (persists during session)
var inventory = [];
// Function to validate if an ID is unique
function isIdUnique(id) {
    return !inventory.some(function (item) { return item.id === id; });
}
// Function to validate required fields (all except comment)
function validateItem(item) {
    if (!item.id || !item.name || !item.category || item.quantity === undefined || item.price === undefined || !item.supplier || !item.status || item.popular === undefined) {
        return 'All fields except Comment are required.';
    }
    if (!isIdUnique(item.id)) {
        return 'Item ID must be unique.';
    }
    if (item.quantity < 0 || item.price < 0) {
        return 'Quantity and Price must be non-negative.';
    }
    return null; // No errors
}
// Function to add a new item
function addItem(item) {
    var error = validateItem(item);
    if (error)
        return error;
    inventory.push(item);
    return 'Item added successfully.';
}
// Function to find an item by name (returns the first match, assuming names might not be unique)
function findItemByName(name) {
    return inventory.find(function (item) { return item.name.toLowerCase() === name.toLowerCase(); });
}
// Function to update an item by name (full update, replaces the item)
function updateItemByName(name, updatedItem) {
    var index = inventory.findIndex(function (item) { return item.name.toLowerCase() === name.toLowerCase(); });
    if (index === -1)
        return 'Item not found.';
    var error = validateItem(updatedItem);
    if (error)
        return error;
    // Ensure ID uniqueness, but since it's update, allow same ID if it's the same item
    if (updatedItem.id !== inventory[index].id && !isIdUnique(updatedItem.id)) {
        return 'Item ID must be unique.';
    }
    inventory[index] = updatedItem;
    return 'Item updated successfully.';
}
// Function to delete an item by name with confirmation (simulated via return message)
function deleteItemByName(name, confirm) {
    if (!confirm)
        return 'Deletion not confirmed.';
    var index = inventory.findIndex(function (item) { return item.name.toLowerCase() === name.toLowerCase(); });
    if (index === -1)
        return 'Item not found.';
    inventory.splice(index, 1);
    return 'Item deleted successfully.';
}
// Function to search items by name (partial match)
function searchItemsByName(name) {
    return inventory.filter(function (item) { return item.name.toLowerCase().includes(name.toLowerCase()); });
}
// Function to get all items
function getAllItems() {
    return inventory;
}
// Function to get popular items
function getPopularItems() {
    return inventory.filter(function (item) { return item.popular; });
}
// Function to render items as HTML string
function renderItems(items) {
    if (items.length === 0)
        return '<p>No items found.</p>';
    return items.map(function (item) { return "\n    <div class=\"item\">\n      <h3>".concat(item.name, "</h3>\n      <p>ID: ").concat(item.id, "</p>\n      <p>Category: ").concat(item.category, "</p>\n      <p>Quantity: ").concat(item.quantity, "</p>\n      <p>Price: $").concat(item.price.toFixed(2), "</p>\n      <p>Supplier: ").concat(item.supplier, "</p>\n      <p>Status: ").concat(item.status, "</p>\n      <p>Popular: ").concat(item.popular ? 'Yes' : 'No', "</p>\n      <p>Comment: ").concat(item.comment || 'N/A', "</p>\n    </div>\n  "); }).join('');
}
// Example usage (for testing in console with HTML)
console.log(addItem({ id: '1', name: 'Laptop', category: 'Electronics', quantity: 5, price: 1000, supplier: 'SupplierA', status: 'In Stock', popular: true, comment: 'Good item' }));
console.log(getAllItems());
