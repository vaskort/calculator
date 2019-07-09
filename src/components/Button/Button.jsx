import React from 'react';

import styles from './Button.module.css';

const Button = ({ number }) => {
  return (
    <button className={styles.button} value={number}>{number}</button>
  );
};

export default Button;