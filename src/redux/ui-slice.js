import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'UI',
  initialState: {
    showCart: false,
  },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        ...action.payload, // status, message, title
      };
    },
  },
});

export default uiSlice;
