import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

import { act, render, fireEvent, waitFor } from '@testing-library/preact';
import { getByLabelText } from '@testing-library/dom';

import MessageForm from './MessageForm';

describe('message form', () => {
  let placeholderFn, component, message, hours, minutes, form;

  beforeEach(async () => { // using mockFn.mockClear() isn't working for some reason so I resorted to this...
    placeholderFn = jest.fn();
    component = render(<MessageForm onSubmit={placeholderFn} />);
    message = getByLabelText(component.container, 'Message:');
    hours = getByLabelText(component.container, 'Hours');
    minutes = getByLabelText(component.container, 'Minutes');
    form = component.container.querySelector('form');
  });

  test('basic behaviour', async () => {
    await act(async () => {
      fireEvent.change(message, {
        target: { value: 'test message form' }
      });
      fireEvent.change(hours, {
        target: { value: 23 }
      });
      fireEvent.change(minutes, {
        target: { value: 59 }
      });

      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(placeholderFn).toHaveBeenCalledTimes(1);
    });

    expect(placeholderFn).toHaveBeenCalledWith({
      content: 'test message form',
      hours: '23',
      minutes: '59'
    }, expect.anything());

    expect(message.value).toEqual('test message form');
    expect(hours.value).toEqual('23');
    expect(minutes.value).toEqual('59');
  });

  test('no fields', async () => {
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(placeholderFn).toHaveBeenCalledTimes(0);

    expect(message.value).toEqual('');
    expect(hours.value).toEqual('');
    expect(minutes.value).toEqual('');
  });

  test('incomplete fields', async () => {
    await act(async () => {
      fireEvent.change(minutes, {
        target: { value: 59 }
      });
      fireEvent.submit(form);
    });

    expect(placeholderFn).toHaveBeenCalledTimes(0);

    expect(message.value).toEqual('');
    expect(hours.value).toEqual('');
    expect(minutes.value).toEqual('59');
  });

  test('wrong values', async () => {
    await act(async () => {
      fireEvent.change(message, {
        target: { value: 'test message form' }
      });
      fireEvent.change(hours, {
        target: { value: 24 } 
        // Jest's tests don't recognize the form's restrictions, but the browser does, for some reason
      });
      fireEvent.change(minutes, {
        target: { value: 'a' }
      });

      fireEvent.submit(form);
    });

    expect(placeholderFn).toHaveBeenCalledTimes(0);

    expect(message.value).toEqual('test message form');
    expect(hours.value).toEqual('24');
    expect(minutes.value).toEqual('');
  });

  test('jest doesnt recognize the min and max of the forms', async () => {
    /* it is largely irrelevant because the server-side has a validator (Joi)
     * that only accepts correct values anyway (hours < 24 && minutes < 60)
     */
    await act(async () => {
      fireEvent.change(message, {
        target: { value: 'test message form' }
      });
      fireEvent.change(hours, {
        target: { value: 9999 }
      });
      fireEvent.change(minutes, {
        target: { value: 9999 }
      });

      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(placeholderFn).toHaveBeenCalledTimes(1);
    });
    expect(placeholderFn).toHaveBeenCalledWith({
      content: 'test message form',
      hours: '9999',
      minutes: '9999'
    }, expect.anything());

    expect(message.value).toEqual('test message form');
    expect(hours.value).toEqual('9999');
    expect(minutes.value).toEqual('9999');
  });

});
