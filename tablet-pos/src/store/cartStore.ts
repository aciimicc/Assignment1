import { create } from "zustand";
import type { Product } from "../data/products";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
};

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, note?: string) => void;
  clear: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity, note) => {
    if (quantity <= 0) {
      return;
    }

    set((state) => {
      const normalizedNote = note?.trim() || undefined;

      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === product.id &&
          (item.note || "") === (normalizedNote || "")
      );

      const updated = [...state.items];

      if (existingIndex >= 0) {
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: current.quantity + quantity,
        };
      } else {
        updated.push({
          id: `${product.id}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 6)}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          note: normalizedNote,
        });
      }

      return { items: updated };
    });
  },

  clear: () => set({ items: [] }),

  getSubtotal: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),

  getTax: () => {
    const subtotal = get().getSubtotal();
    return subtotal * 0.1; // 10% tax
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const tax = get().getTax();
    return subtotal + tax;
  },
}));
