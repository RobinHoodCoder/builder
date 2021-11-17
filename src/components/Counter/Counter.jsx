import React from 'react';
import styles from './styles.module.scss';

import { useDispatch, useSelector } from 'react-redux';
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const isHidden = useSelector(state => state.isHidden);
  const hIncrement = amount => dispatch({ type: 'increment', amount });
  const hDecrement = amount => dispatch({ type: 'decrement', amount });
  const toggleCounterHandler = () => {
    dispatch({ type: 'toggleVisibility' });
  };

  return (
    <main className={styles.component}>
      <h1>Redux counter</h1>
      <div className={styles.value}>
        {counter}
      </div>
      {!isHidden &&
       (<div className={styles.btnContainer}>
         <button onClick={() => hDecrement()} className={styles.counter}>Decrement</button>
         <button onClick={() => hIncrement(5)} className={styles.counter}>Increment by 5</button>
         <button onClick={() => hIncrement()} className={styles.counter}>Increment</button>
       </div>)
      }
      <div className={styles.btnContainer}>
        <button
          className={styles.counterToggle}
          onClick={toggleCounterHandler}>Toggle counter
        </button>
      </div>

    </main>
  );
};

export default Counter;
