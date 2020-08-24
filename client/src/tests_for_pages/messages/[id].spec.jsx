import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

import { act, render, fireEvent } from '@testing-library/react';
import { getByLabelText, getByText } from '@testing-library/dom';

import { getMessageData } from '@/lib/messages';
jest.mock('@/lib/messages');

import DelayedMessage from '@/pages/messages/[id]';

describe('components are rendering', () => {
  test('for Navbar', () => {
    const component = render(<DelayedMessage />);
    expect(getByText(component.container, 'Delayed Messages')).toBeInTheDocument;
  });
});

describe('for submitting', () => {
  getMessageData.mockResolvedValue('s');

  afterEach(() => {
    getMessageData.mockClear();
  });

  test('submit success', async () => {
    const component = render(<DelayedMessage />);
    const message = getByLabelText(component.container, 'Message:');
    const hours = getByLabelText(component.container, 'Hours');
    const minutes = getByLabelText(component.container, 'Minutes');
    const form = component.container.querySelector('form');

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

    expect(getMessageData).toHaveBeenCalledTimes(1);
  });

  test('submit fail', async () => {
    const component = render(<DelayedMessage />);
    const hours = getByLabelText(component.container, 'Hours');
    const minutes = getByLabelText(component.container, 'Minutes');
    const form = component.container.querySelector('form');

    await act(async () => {
      fireEvent.change(hours, {
        target: { value: 23 }
      });
      fireEvent.change(minutes, {
        target: { value: 59 }
      });

      // Missing a field so submitting should fail
      fireEvent.submit(form);
    });

    expect(getMessageData).toHaveBeenCalledTimes(0);
  });
});
