import classes from './CartItem.module.css';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef(0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  const { hAddProduct, hRemoveProduct } = props;


  const sprinProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: { duration: 450 } });

  const prevTotal = usePrevious(total);


  const { number } = useSpring({
    from: { number: prevTotal },
    to: { number: total },
    delay: 200,
    onRest: () => (prevTotal),
  });

  console.log({ total, prevTotal });


  return (
    <animated.li className={classes.item} style={sprinProps}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          <animated.div>{number.to(n => n.toFixed(2))}</animated.div>
          <span className={classes.itemPrice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <>{quantity}</>
        </div>
        <div className={classes.actions}>
          <button onClick={() => hRemoveProduct(props.item)}>-</button>
          <button onClick={() => hAddProduct(props.item)}>+</button>
        </div>
      </div>
    </animated.li>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object,
  hIncrement: PropTypes.func,
  hDecrement: PropTypes.func,
  hAddProduct: PropTypes.func,
};
