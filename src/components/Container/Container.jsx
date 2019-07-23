import React, { Component } from 'react';

import Buttons from '../Buttons/Buttons';
import Screen from '../Screen/Screen';
import calculate from '../../utilities/calculator';
import styles from './Container.module.css';

class Container extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      number: [],
      queue: [],
      currentNumberOnScreen: null,
      currentValue: 0
    }
    this.handlePressNumber = this.handlePressNumber.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
    this.handleOnPressCalculation = this.handleOnPressCalculation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handlePressNumber(e) {
    const value = e.target.value;

    if (value === "." && this.state.number.indexOf(".") !== -1) return false;
    if (value === "0" && this.state.currentNumberOnScreen === "0") return false;

    this.state.number.push(value);
    this.setNumberOnScreen(this.state.number.join(''));
  }

  handleOnPressCalculation(e) {
    this.state.queue.push(this.state.number.join(''));
    this.state.queue.push(e.target.value);

    this.setNumberOnScreen(e.target.value);
    this.clearNumber();
  }

  handleEquals() {
    if (this.state.queue.length < 2) return;
    this.state.queue.push(this.state.number.join(''));
    const result = calculate(this.state.queue);
    this.setState({
      currentNumberOnScreen: result,
      currentValue: result,
      number: [],
      queue: [result]
    })

    this.setNumberOnScreen(result);
  }

  clearNumber() {
    this.setState({
      number: []
    })
  }

  handleOnClear() {
    this.setState({
      number: [],
      queue: [],
      currentNumberOnScreen: null,
      currentValue: null
    })
  }

  setNumberOnScreen(value) {
    this.setState({
      currentNumberOnScreen: value
    })
  }

  render() {
    const { currentNumberOnScreen } = this.state;

    return (
      <div className={styles.container}>
        <Screen value={currentNumberOnScreen} />
        <Buttons
          onPressNumber={this.handlePressNumber}
          onPressCalculation={this.handleOnPressCalculation}
          onClear={this.handleOnClear}
          onEquals={this.handleEquals}
        />
      </div>
    );
  }
}

export default Container;