import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items:
      localStorage.getItem("items") !== null
        ? JSON.parse(localStorage.getItem("items"))
        : [],
    totalQuantity: 0,
    totalAllPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      localStorage.setItem(
        "items",
        JSON.stringify(state.items.map((item) => item))
      );
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      const item = JSON.parse(localStorage.getItem("items"));
      const filtered = item.filter((item) => item.id !== id);
      localStorage.setItem("items", JSON.stringify(filtered));
    },

    totalAllItems(state, action) {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount += item.quantity;
        total += item.quantity * item.price;
      });
      state.totalQuantity = amount;
      state.totalAllPrice = total;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
