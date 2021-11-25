import store, { cartActions } from '../index';

describe('Adds a new book', () => {
  const products = [
    { id: '4', title: 'Tester', description: 'Testers manual' },
    { id: '5', title: 'Berendt', description: 'Testers manual' },
  ];

  products.forEach((product) => {
    it(`Adds a product called ${product.title}`, () => {
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
});
