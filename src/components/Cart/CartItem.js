import classes from './CartItem.module.css';
import PropTypes from 'prop-types';

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  const { hAddProduct, hRemoveProduct } = props;

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemPrice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => hRemoveProduct(props.item)}>-</button>
          <button onClick={() => hAddProduct(props.item)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object,
  hIncrement: PropTypes.func,
  hDecrement: PropTypes.func,
  hAddProduct: PropTypes.func,
};
