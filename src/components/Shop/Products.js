import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { cartActions } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
    {
      id: '9928cs',
      title: 'Papegaai',
      description: 'KraaaA!',
      total: 3,
      price: 3,
      quantity: 1,
    },
  ];

  const dispatch = useDispatch();
  const hAddProduct = (payload) => {
    return dispatch(cartActions.addProduct(payload));
  };

  const { cart } = useSelector(state => state);

  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch('https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),

        });
      const data = await response.json();

      const { ok } = await response;

      if (!ok) {
        throw new Error('Sending cart data failed.');
      }

      console.log({ data });
    };
    sendCartData().catch((e) => {


    });
  }, [cart]);

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
