import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { cartActions, counterActions } from '../../redux/';
import { useDispatch, useSelector } from 'react-redux';

const Cart = (props) => {
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.cart);

  console.log(products, 'cart');

  const hIncrement = amount => dispatch(counterActions.increment(1));
  const hAddProduct = (payload) => {
    console.log('Added', payload);
    return dispatch(cartActions.addProduct(payload));
  };

  const hRemoveProduct = (payload) => {
    console.log('Removed', payload);
    return dispatch(cartActions.removeProduct(payload));
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {!!products?.length ? (
          products.map((product) => {
            return (
              <CartItem
                key={product.id}
                hAddProduct={hAddProduct}
                hRemoveProduct={hRemoveProduct}
                item={product}
              />
            );
          })
        ) : (
          <p>Your cart is empty now. Add some products!</p>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
