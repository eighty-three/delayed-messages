import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import 'jsdom-worker-fix';
import * as workerTimers from 'worker-timers';
global.performance = require('perf_hooks').performance;

import { render } from '@testing-library/preact';

import Countdown from './Countdown';

describe('testing counting down', () => {
  const placeholderFn = jest.fn();

  test('down to 0', () => {
    const component = render(<Countdown setCounter={placeholderFn} timeRemaining={0} />);
    expect(component.container).toHaveTextContent(
      'Getting your message..'
    );
  });

  test('down to 1', () => {
    const testSpy = jest.spyOn(workerTimers, 'setTimeout');

    const component = render(<Countdown setCounter={placeholderFn} timeRemaining={1} />);

    expect(testSpy).toHaveBeenCalledTimes(1);

    expect(component.container).toHaveTextContent(
      '1 second until the message arrives!'
    );

    /* timeRemaining hasn't changed because the function passed to the setCounter param
     * is a placeholder. In the app, it should be a setState function that changes
     * the timeRemaining (which would, in this example, count it down to zero)
     */
  });
});
