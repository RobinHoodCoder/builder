import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import PropTypes from 'prop-types';

const ProductItem = (props) => {
  const { product } = props;
  const { title, price, description } = props.product;

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={() => props.hAddProduct(product)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  hAddProduct: PropTypes.func,
  product: PropTypes.object,
};
