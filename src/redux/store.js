import {  createStore } from '@reduxjs/toolkit';

const counterReducer = (
  state = {
    counter: 0,
  },
  action
) => {
  const { type } = action;
  if (type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  } else if (type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
