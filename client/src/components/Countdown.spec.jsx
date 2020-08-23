import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import { render } from '@testing-library/react';

import Countdown from './Countdown';


describe('testing counting down', () => {
  const placeholderFn = jest.fn();
  let component;

  jest.useFakeTimers();

  afterEach(() => {
    component.unmount();
  });

  test('down to 0', () => {
    component = render(<Countdown setCounter={placeholderFn} timeRemaining={0} />);

    expect(component.container).toHaveTextContent(
      'Getting your message..'
    );
  });

  test('down to 1', () => {
    component = render(<Countdown setCounter={placeholderFn} timeRemaining={1} />);

    jest.runAllTimers();

    expect(placeholderFn).toHaveBeenCalledTimes(1);

    expect(component.container).toHaveTextContent(
      '1 second until the message arrives!'
    );

    /* timeRemaining hasn't changed because the function passed to the setCounter param
     * is a placeholder. In the app, it should be a setState function that changes
     * the timeRemaining (which would, in this example, count it down to zero)
     */
  });
});
