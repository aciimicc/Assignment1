export type CategoryId = "appetizers" | "main-course" | "dessert";

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: CategoryId;
  image: string;
  inStock: boolean;
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: "appetizers", label: "Appetizers" },
  { id: "main-course", label: "Main Course" },
  { id: "dessert", label: "Dessert" },
];

export const products: Product[] = [
  {
    id: "buffalo-wings",
    name: "Buffalo Wings",
    price: 8.99,
    categoryId: "appetizers",
    image:
      "https://images.unsplash.com/photo-1608038509085-7bb9d5c0f11f?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "chicken-caesar-salad",
    name: "Chicken Caesar Salad",
    price: 7.5,
    categoryId: "appetizers",
    image:
      "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    price: 9.25,
    categoryId: "appetizers",
    image:
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "grilled-steak",
    name: "Grilled Steak",
    price: 18.5,
    categoryId: "main-course",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo Pasta",
    price: 14.25,
    categoryId: "main-course",
    image:
      "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "veggie-burger",
    name: "Veggie Burger",
    price: 11.9,
    categoryId: "main-course",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    inStock: false,
  },
  {
    id: "chocolate-brownie",
    name: "Warm Chocolate Brownie",
    price: 6.25,
    categoryId: "dessert",
    image:
      "https://images.unsplash.com/photo-1599785209796-88630776bd29?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "cheesecake",
    name: "New York Cheesecake",
    price: 6.75,
    categoryId: "dessert",
    image:
      "https://images.unsplash.com/photo-1505253216365-8a1fef3d8902?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "ice-cream-trio",
    name: "Ice Cream Trio",
    price: 5.5,
    categoryId: "dessert",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
];
