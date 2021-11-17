import React from 'react';
import styles from './styles.module.scss';

import { useSelector } from 'react-redux';
const Counter = () => {
  const counter = useSelector(state => state.counter);
  const toggleCounterHandler = () => {};
  return (
    <main className={styles.component}>
      <h1>Redux counter</h1>
      <div className={styles.value}>
          -- counter value -- {counter}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.counter}>Increment</button>
        <button className={styles.counter}>Decrement</button>

      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.counter}
          onClick={toggleCounterHandler}>Toggle counter
        </button>
      </div>

    </main>
  );
};

export default Counter;
