import { uiActions } from '../index';
import { FIREBASE_URL } from '../../config/consts';

import { cartActions } from '../index';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_URL}/cart.json`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('could not fetch');
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Fetch data could not be done',
      }));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      message: 'sending data...',
      title: 'Pending.',
    }));
    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_URL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error('Could not send cart data');
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({
        status: 'success',
        message: 'product added to cart :)',
        title: 'Success!',
      }));
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Cart data could not be send',
      }));
    }
  };
};
