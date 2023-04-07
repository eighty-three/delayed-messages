import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import { render } from '@testing-library/preact';

import Time from './Time';


describe('basic behavior', () => {
  test('hours, minutes, seconds', () => {
    const time = {
      hours: 3,
      minutes: 2,
      seconds: 2
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds`
    );
  });

  test('zero/null/mistaken key', () => {
    const time = {
      days: 0,
      seconds: 0
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).not.toHaveTextContent();
  });
});

describe('testing specific combinations', () => {
  test('hours, minutes, seconds (testing singular noun)', () => {
    const time = {
      hours: 1,
      minutes: 1,
      seconds: 1
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.hours} hour, ${time.minutes} minute and ${time.seconds} second`
    );
  });

  test('hours, seconds', () => {
    const time = {
      hours: 3,
      seconds: 2
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.hours} hours and ${time.seconds} seconds`
    );
  });

  test('hours, minutes', () => {
    const time = {
      hours: 3,
      minutes: 2,
      seconds: 0
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.hours} hours and ${time.minutes} minutes`
    );
  });

  test('minutes, seconds', () => {
    const time = {
      minutes: 2,
      seconds: 2
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.minutes} minutes and ${time.seconds} seconds`
    );
  });

  test('hours', () => {
    const time = {
      hours: 2
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.hours} hours`
    );
  });

  test('minutes', () => {
    const time = {
      minutes: 2,
      seconds: 0
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.minutes} minutes`
    );
  });

  test('seconds', () => {
    const time = {
      seconds: 2
    };

    const component = render(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.container).toHaveTextContent(
      `${time.seconds} seconds`
    );
  });
});
