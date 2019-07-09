import React, { Component } from 'react';

import Button from '../Button/Button';
import styles from './Container.module.css';

class Container extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Button number={7} />
        <Button number={8} />
        <Button number={9} />
        <Button number={4} />
        <Button number={5} />
        <Button number={6} />
        <Button number={1} />
        <Button number={2} />
        <Button number={3} />
      </div>
    );
  }
}

export default Container;