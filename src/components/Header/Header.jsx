import styling from './Header.module.scss';

const Header = () => {
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
              Cart
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Header;
