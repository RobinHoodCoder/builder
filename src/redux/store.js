import {  createStore, createSlice, configureStore, current } from '@reduxjs/toolkit';
import { cartSlice } from './cart-slice';
import { UISlice } from './ui-slice';

const initialCounterState = {
  count: 0,
  isHidden: true,
};
const initialAuthState = {
  isAuthenticated: false,
};


const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state, action) {
      !action.payload ? state.count++ : state.count += action.payload;
    },
    decrement(state, action) {
      !action.payload ? state.count-- : state.count -= action.payload;
    },
    toggleCounter(state) {
      state.isHidden = !state.isHidden;
    },
  },
});


const authSlice = createSlice({
  name: 'Authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = true;
    },
  },
});
export const { actions: counterActions } = counterSlice;
export const { actions: authActions } = authSlice;
export const { actions: UIActions } = UISlice;
export const { actions: cartActions } = cartSlice;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    [UISlice.name]: UISlice.reducer,
  },
});


export default store;
