import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      const { payload } = action;
      const existingItem = state.products.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.products.push({
          ...payload,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + payload.price;
      }
    },
    removeProduct(state, action) {
      const potIdx = state.products.findIndex(product => product?.id === action.payload.id);

      if (potIdx >= 0) {
        if (state.products[potIdx].quantity === 1) {
          // remove product if  only 1
          state.products = state.products.filter(currentItem => currentItem.id !== action.payload.id);
        } else {
          let { quantity, price, total } = state.products[potIdx];
          quantity--;
          total = price * quantity;
          state.products[potIdx] = {
            ...state.products[potIdx],
            quantity,
            total,
          };
        }
      }
    },
  },
});
