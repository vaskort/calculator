import React, { Component } from 'react';

import Buttons from '../Buttons/Buttons';
import styles from './Container.module.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
    }
    this.handlePressNumber = this.handlePressNumber.bind(this);
  }

  onCalculation() {
    console.log("on calculation");
  }

  handlePressNumber(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className={styles.container}>
        <Buttons onPressNumber={this.handlePressNumber} />
      </div>
    );
  }
}

export default Container;