import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import store, { counterActions } from '../../redux/store';
import { useDispatch } from 'react-redux';

const Cart = (props) => {
  const dispatch = useDispatch();


  const hIncrement = amount => dispatch(counterActions.increment(amount));
  const hDecrement = amount => dispatch(counterActions.decrement(amount));

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          {...hIncrement}
          {...hDecrement}
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
