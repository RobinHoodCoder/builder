import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      const potIdx = state.products.findIndex(product => product?.id === action.payload.id);
      potIdx < 0 && (
        state.products.push(action.payload)
      );

      if (potIdx >= 0) {
        let { quantity, price, total } = state.products[potIdx];
        quantity++;
        total = price * quantity;

        state.products[potIdx] = {
          ...state.products[potIdx],
          quantity,
          total,
        };
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
