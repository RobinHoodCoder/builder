import {  createStore, createSlice, configureStore, current } from '@reduxjs/toolkit';

const initialCounterState = {
  count: 0,
  isHidden: true,
};
const initialAuthState = {
  isAuthenticated: false,
};

const initialCartState = {
  products: [
    {
      id: '0001',
      title: 'iPhone 99',
      quantity: 1,
      price: 2,
      total: 2,
    },
    {
      id: '0002',
      title: 'Oneplus 20',
      quantity: 2,
      price: 4,
      total: 8,
    },
  ],
};

const cartSlice = createSlice({
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
        quantity ++;
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
        if (state.products[potIdx].quantity >= 1) {
          let { quantity, price, total } = state.products[potIdx];
          quantity--;
          total = price * quantity;
          state.products[potIdx] = {
            ...state.products[potIdx],
            quantity,
            total,
          };
        }
        if (state.products[potIdx].quantity === 1) {
          // remove product if  only 1
          state.products = state.products.filter(currentItem => currentItem.id !== action.payload.id);
        }
      }
    },
  },
});

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
export const { actions: cartActions } = cartSlice;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});


export default store;
