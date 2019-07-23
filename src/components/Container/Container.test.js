import React from 'react';
import Container from './Container';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Calculator Component', () => {
  it('renders without crashing', () => {
    const wrapper = renderer.create(<Container />)

    expect(wrapper).toMatchSnapshot();
  });

  it('handlePressNumber shows the correct number on screen', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'setNumberOnScreen');

    let e = {
      target: {
        value: '1'
      }
    }

    instance.handlePressNumber(e);
    expect(spy).toHaveBeenCalledWith(e.target.value);
  });

  it('handlePressNumber number property in the state correctly', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    expect.assertions(2);

    const e = {
      target: {
        value: '1'
      }
    }

    instance.handlePressNumber(e);
    expect(instance.state.number).toEqual(['1']);
    
    instance.handlePressNumber(e);
    expect(instance.state.number).toEqual(['1', '1']);
  });

  it('handleOnPressCalculation changes the state correctly', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    const e = {
      target: {
        value: '+'
      }
    }

    instance.setState({
      number: ['1']
    });

    instance.handleOnPressCalculation(e);

    expect(instance.state.queue).toEqual(['1', '+']);
  });

  it('handleOnPressCalculation calls setNumberOnScreen and clearNumber', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'setNumberOnScreen');
    const spy2 = jest.spyOn(wrapper.instance(), 'clearNumber');

    expect.assertions(2);

    const e = {
      target: {
        value: '+'
      }
    }

    instance.setState({
      number: ['1']
    });

    instance.handleOnPressCalculation(e);

    expect(spy).toHaveBeenCalledWith(e.target.value);
    expect(spy2).toHaveBeenCalled();
  });

  it('handleEquals sets the properties on state correctly', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    expect.assertions(4);

    instance.setState({
      number: ['1'],
      queue: ['2', '+']
    });

    instance.handleEquals();

    expect(instance.state.queue).toEqual([3]);
    expect(instance.state.number).toEqual([]);
    expect(instance.state.currentNumberOnScreen).toEqual(3);
    expect(instance.state.currentValue).toEqual(3);
  });

  it('handleEquals calls setNumberOnScreen with the correct value', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'setNumberOnScreen');

    instance.setState({
      number: ['1'],
      queue: ['2', '+']
    });

    instance.handleEquals();

    expect(spy).toHaveBeenCalledWith(3);
  });

  it('clearNumber clears the number property on state correctly', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    instance.setState({
      number: ['1']
    });

    instance.clearNumber();

    expect(instance.state.number).toEqual([]);
  });

  it('handleOnClear clear the state correclty', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    instance.setState({
      number: ['1'],
      queue: ['1'],
      currentNumberOnScreen: 1234,
      currentValue: 1234
    });

    instance.handleOnClear();

    expect(instance.state).toMatchObject({
      number: [],
      queue: [],
      currentNumberOnScreen: null,
      currentValue: null
    });
  });

  it('does not call set State to update the properties if the = is pressed with one number', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'setState');

    instance.handleEquals();

    expect(spy).not.toHaveBeenCalled();
  });

  it('makes sure you cannot choose more than 1 zero', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'setNumberOnScreen');
    const e = {
      target: {
        value: '0'
      }
    }

    instance.setState({
      number: ['0'],
      currentNumberOnScreen: '0',
      queue: []
    });

    instance.handlePressNumber(e);

    expect(spy).not.toHaveBeenCalledWith();
  });

  it('does not allow you to add another . if you already have one', () => {
    const wrapper = shallow(<Container />)
    const instance = wrapper.instance();

    const e = {
      target: {
        value: '.'
      }
    }

    instance.setState({
      number: ['0', '.', '0', '1'],
      queue: []
    });

    instance.handlePressNumber(e);

    expect(instance.state.number).toEqual(['0', '.', '0', '1']);
  });
});