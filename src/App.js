import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import { AuthContext } from './context/auth-context';
import Auth from './components/Auth';

import { Provider } from 'react-redux';
import store from './redux/store';
import Counter from './components/Counter/Counter';

const App = (props) => {
  const authContext = useContext(AuthContext);

  let content  = <Auth/>;

  if (authContext.isAuth) {
    content = <Ingredients/>;
  }

  return (
    <Provider store={store}>
      {content}
      <Counter/>
    </Provider>
  );
};

export default App;
