import React from 'react';

import styles from './Buttons.module.css';

const Buttons = ({ number, onPressNumber }) => {
  const numbers = [1,2,3,4,5,6,7,8,9]
  return (
    numbers.map(number => <button key={number} className={styles.button} value={number} onClick={onPressNumber}>{number}</button>
  ));
};

export default Buttons;