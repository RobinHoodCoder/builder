import { createSlice, current } from '@reduxjs/toolkit';
import { initialCartState } from './initialCartState';


const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      console.log({ ...current(state) });
      const { payload } = action;
      const existingItem = state.products?.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.products.push({
          ...payload,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + payload.price;
        state.changed = true;
      }
    },
    replaceCart(state, action) {
      state.products = action.payload.products;
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
export default cartSlice;
