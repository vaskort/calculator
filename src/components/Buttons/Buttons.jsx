import React from 'react';

import styles from './Buttons.module.css';

const Buttons = ({ onPressNumber, onClear, onEquals, onPressCalculation }) => {
  const numbers = [1,2,3,4,5,6,7,8,9]
  return (
    <div>
      <div className={styles.calcContainer}>
        <button className={styles.button} onClick={onPressCalculation} value={"+"}>+</button>
        <button className={styles.button} onClick={onPressCalculation} value={"-"}>-</button>
        <button className={styles.button} onClick={onPressCalculation} value={"/"}>/</button>
        <button className={styles.button} onClick={onEquals}>=</button>
      </div>
      {numbers.map(number => (
        <button 
          key={number} 
          className={styles.button}
          value={number}
          onClick={onPressNumber}
        >
          {number}
        </button>
      ))}
      <button className={styles.button} onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default Buttons;