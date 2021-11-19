import styling from './Header.module.scss';
import { useSelector } from 'react-redux';
import { getTotalQuantity } from '../../utils/utils';
import { UIActions } from '../../redux/store';

const Header = () => {
  const { products } = useSelector(state => state.cart);
  const { toggleCart } = useSelector(state => state.UI);
  const amount = getTotalQuantity(products);

  return (
    <div className={styling.header}>
      <div className={styling.wrapper}>
        <h1>REDUX</h1>
        <nav className={styling.navbar}>
          <ul>
            <li>Products</li>
            <li>Sales</li>
            <li>
              <button className={styling.button}>
              Cart {!!amount && amount}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Header;
