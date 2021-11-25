import store, { cartActions } from '../index';
import { initialCartState } from './initialCartState';

const products = [
  {
    description: 'Nice to have',
    id: '0001',
    price: 2,
    quantity: 7,
    title: 'Buetooth headphone',
    total: 21,
  },
  {
    description: 'Nice to have',
    id: '0001',
    price: 2,
    quantity: 7,
    title: 'Buetooth headphone',
    total: 21,
  },
  {
    description: 'Nice to have',
    id: '000933x',
    price: 3,
    quantity: 7,
    title: 'iMac',
    total: 21,
  },
];

describe('Adds various products', () => {
  products.forEach((product, i) => {
    it(`Adds a single product called ${product.title}`, () => {
      store.dispatch(cartActions.addProduct(product));

      const state = store.getState().cart;

      const addedProduct = state.products.find(prdct => prdct.id === product.id);

      const { title, price, quantity, total } = addedProduct;

      [title, price, quantity, total].forEach((productProperty) => {
        expect(addedProduct[productProperty])
          .toBe(product[productProperty]);
      });
    });
  });


  it.only(`Adds 2 products`, () => {
    const [product1, product2] = products;
    const dualProduct = [product1, product2];

    let state = store.getState().cart;

    dualProduct.forEach((product, i) => {
      console.log({ product });
      store.dispatch(cartActions.addProduct(product));
    });
    state = store.getState().cart;


    const addedProduct2 = state.products.find(prdct => prdct.id === product2.id);

    console.log(state);

    const { title, price, quantity, total, id } = product2;

    [
      title,
      price,
      quantity,
      total,
      id,
    ].forEach((productProperty) => {
      expect(addedProduct2[productProperty])
        .toBe(product2[productProperty]);
    });
  });
});
