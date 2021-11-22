import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
  name: 'UI',
  initialState: {
    showCart: false,
  },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});
