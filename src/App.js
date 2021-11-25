import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import { AuthContext } from './context/auth-context';
import Auth from './components/Auth';

import Counter from './components/Counter/Counter';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux';
import Notification from './components/UI/Notification/Notification';


const App = (props) => {
  const authContext = useContext(AuthContext);


  let content  = <Auth/>;

  const { showCart } = useSelector(state => state.ui);
  const { notification } = useSelector(state => state.ui);

  if (authContext.isAuth) {
    content = <Ingredients/>;
  }

  return (
    <>
      {
        notification && (
          <Notification {...notification}/>
        )
      }

      <Header/>
      {showCart && <Cart/>}
      <Products/>
      <hr/>
      {content}
      <Counter/>
    </>
  );
};

export default App;
