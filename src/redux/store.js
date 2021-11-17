import {  createStore } from '@reduxjs/toolkit';

const counterReducer = (
  state = {
    counter: 0,
    isHidden: true,
  },
  action
) => {
  const { type, amount = 1 } = action;
  if (type === 'increment') {
    return {
      ...state,
      counter: state.counter + amount,
    };
  } else if (type === 'decrement') {
    return {
      ...state,
      counter: state.counter - amount,
    };
  } else if (type === 'toggleVisibility') {
    return {
      ...state,
      isHidden: !state.isHidden,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
