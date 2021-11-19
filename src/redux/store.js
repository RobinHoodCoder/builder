import {  createStore, createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = {
  counter: 0,
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
      !action.payload ? state.counter++ : state.counter += action.payload;
    },
    decrement(state, action) {
      !action.payload ? state.counter-- : state.counter -= action.payload;
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

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});


export default store;
