import React from 'react';
import { shallow } from 'enzyme';
import Time from './Time';
import 'jsdom-global/register';

describe('basic behavior', () => {
  test('hours, minutes, seconds', () => {
    const time = {
      hours: 3,
      minutes: 2,
      seconds: 2
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hours`);
    expect(component.find('span').at(1).text()).toEqual(', ');
    expect(component.find('span').at(2).text()).toEqual(`${time.minutes} minutes`);
    expect(component.find('span').at(3).text()).toEqual(' and ');
    expect(component.find('span').at(4).text()).toEqual(`${time.seconds} seconds`);
  });

  test('zero/null/mistaken key', () => {
    const time = {
      days: 0,
      seconds: 0
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.children().exists()).toEqual(false); //Component still renders but without any content, just the Fragment
  });
});

describe('testing specific combinations', () => {
  test('hours, minutes, seconds (testing singular noun)', () => {
    const time = {
      hours: 1,
      minutes: 1,
      seconds: 1
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hour`);
    expect(component.find('span').at(1).text()).toEqual(', ');
    expect(component.find('span').at(2).text()).toEqual(`${time.minutes} minute`);
    expect(component.find('span').at(3).text()).toEqual(' and ');
    expect(component.find('span').at(4).text()).toEqual(`${time.seconds} second`);
  });

  test('hours, seconds', () => {
    const time = {
      hours: 3,
      seconds: 2
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hours`);
    expect(component.find('span').at(1).text()).toEqual(' and ');
    expect(component.find('span').at(2).text()).toEqual(`${time.seconds} seconds`);
  });

  test('hours, minutes', () => {
    const time = {
      hours: 3,
      minutes: 2,
      seconds: 0
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hours`);
    expect(component.find('span').at(1).text()).toEqual(' and ');
    expect(component.find('span').at(2).text()).toEqual(`${time.minutes} minutes`);
  });

  test('minutes, seconds', () => {
    const time = {
      minutes: 2,
      seconds: 2
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.minutes} minutes`);
    expect(component.find('span').at(1).text()).toEqual(' and ');
    expect(component.find('span').at(2).text()).toEqual(`${time.seconds} seconds`);
  });

  test('hours', () => {
    const time = {
      hours: 1
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hour`);
  });

  test('minutes', () => {
    const time = {
      minutes: 2,
      seconds: 0
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.minutes} minutes`);
  });

  test('seconds', () => {
    const time = {
      seconds: 2
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.seconds} seconds`);
  });

  test('hours, minutes, seconds', () => {
    const time = {
      hours: 3,
      minutes: 2,
      seconds: 2
    };

    const component = shallow(<Time hours={time.hours} minutes={time.minutes} seconds={time.seconds} />);
    expect(component.find('span').at(0).text()).toEqual(`${time.hours} hours`);
    expect(component.find('span').at(1).text()).toEqual(', ');
    expect(component.find('span').at(2).text()).toEqual(`${time.minutes} minutes`);
    expect(component.find('span').at(3).text()).toEqual(' and ');
    expect(component.find('span').at(4).text()).toEqual(`${time.seconds} seconds`);
  });

});
