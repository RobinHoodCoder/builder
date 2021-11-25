import store, { cartActions } from '../index';

describe('Adds a new book', () => {
  it('', () => {
    let state = store.getState().cart;
    const initialProductCount = state.products.length;

    store.dispatch(cartActions.addProduct({ id: '4', title: 'Tester', description: 'Testers manual' }));

    state = store.getState().cart;

    expect(state.products)
      .toHaveLength(1);

    const addedProduct = state.products.find(prdct => prdct.id === '4');

    expect(addedProduct?.title)
      .toBe('Tester');
  });
});
