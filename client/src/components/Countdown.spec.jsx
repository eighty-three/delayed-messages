import React from 'react';
import { mount } from 'enzyme';
import Countdown from './Countdown';
import Time from './Time';
import 'jsdom-global/register';

describe('testing counting down', () => {
  const placeholderFn = jest.fn();
  let component;

  jest.useFakeTimers();

  afterEach(() => {
    component.unmount();
  });

  test('down to 0', () => {
    component = mount(<Countdown setCounter={placeholderFn} timeRemaining={0} />);
    const timeComponent = component.find(Time);
    expect(timeComponent.exists()).toEqual(false);


    expect(component.find('p').at(0).text()).toEqual('Getting your message..');
  });

  test('down to 1', () => {
    component = mount(<Countdown setCounter={placeholderFn} timeRemaining={1} />);
    const timeComponent = component.find(Time);
    expect(timeComponent.exists()).toEqual(true);

    jest.runAllTimers();

    expect(placeholderFn).toHaveBeenCalledTimes(1);

    expect(component.find('span').at(0).text()).toEqual('1 second');
    expect(component.find('span').at(1).text()).toEqual(' until the message arrives!');
    /* timeRemaining hasn't changed because the function passed to the setCounter param
     * is a placeholder. In the app, it should be a setState function that changes
     * the timeRemaining (which would, in this example, count it down to zero)
     */
  });
});
