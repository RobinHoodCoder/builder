import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { cartActions } from '../../redux/store';
import { useDispatch } from 'react-redux';

const Products = (props) => {
  const products = [
    {
      id: '00092x',
      title: 'Buetooth headphone',
      description: 'Nice to have',
      total: 3,
      price: 3,
      quantity: 1,
    },
  ];

  const dispatch = useDispatch();
  const hAddProduct = (payload) => {
    console.log('Added', payload);
    return dispatch(cartActions.addProduct(payload));
  };
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                hAddProduct={() => hAddProduct(product)}
                product={product}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Products;
