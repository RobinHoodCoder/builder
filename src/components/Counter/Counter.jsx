import React from 'react';
import styles from './styles.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../redux/store';

const Counter = () => {
  const dispatch = useDispatch();
  const { count, isHidden } = useSelector(state => state.counter);

  const hIncrement = amount => dispatch(counterActions.increment(amount));
  const hDecrement = amount => dispatch(counterActions.decrement(amount));


  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter(false));
  };


  return (
    <main className={styles.component}>
      <h1>Redux counter</h1>
      <div className={styles.value}>
        {count}
      </div>
      {!isHidden &&
       (<div className={styles.btnContainer}>
         <button onClick={() => hDecrement()} className={styles.countBtn}>Decrement</button>
         <button onClick={() => hIncrement(5)} className={styles.countBtn}>Increment by 5</button>
         <button onClick={() => hIncrement()} className={styles.countBtn}>Increment</button>
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
