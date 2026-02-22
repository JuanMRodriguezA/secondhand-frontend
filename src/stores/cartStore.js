import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    itemCount: (state) => state.items.length,
    subtotal: (state) =>
      state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  },
  actions: {
    addItem(item) {
      const existing = this.items.find(
        (i) => i.id === item.id && i.size === item.size,
      );
      if (existing) existing.quantity += item.quantity;
      else this.items.push(item);
    },
    removeItem(item) {
      this.items = this.items.filter(
        (i) => !(i.id === item.id && i.size === item.size),
      );
    },
    clearCart() {
      this.items = [];
    },
    updateQuantity(item, quantity) {
      const existing = this.items.find(
        (i) => i.id === item.id && i.size === item.size,
      );
      if (existing) {
        if (quantity <= 0) this.removeItem(item);
        else existing.quantity = quantity;
      }
    },
  },
});
