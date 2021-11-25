
import { useDispatch, useSelector } from 'react-redux';
import store from '../index';

test('Adds a new book', () => {
  const state = store.getState().cart;
  const initialProductCount = state.products.length;
});
