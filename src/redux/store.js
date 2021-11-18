import {  createStore, createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  isHidden: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
    increment(state, action) {
      !action.payload ? state.counter++ : state.counter += action.payload;
    },
    decrement(state, action) {
      !action.payload ? state.counter-- : state.counter -= action.payload;
    },
    toggleCounter: (state) => {
      state.isHidden = !state.isHidden;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { actions: counterActions } = counterSlice;

export default store;
