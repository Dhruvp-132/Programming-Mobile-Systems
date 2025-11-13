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
