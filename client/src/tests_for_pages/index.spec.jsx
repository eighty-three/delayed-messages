import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import 'jsdom-worker-fix';
global.performance = require('perf_hooks').performance;

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

jest.mock('next/link', () => ({ children }) => children);
// https://github.com/vercel/next.js/issues/16864

import { act, render, fireEvent, waitFor } from '@testing-library/preact';
import { getByLabelText, getByText } from '@testing-library/dom';

import Router from 'next/router';
import { submitMessage } from '@/lib/messages';
jest.mock('@/lib/messages');
jest.mock('next/router');

import Home from '@/pages/index';

describe('components are rendering', () => {
  test('for MessageForm', () => {
    const component = render(<Home />);
    expect(getByLabelText(component.container, 'Message:')).toBeInTheDocument;
  });

  test('for Navbar', () => {
    const component = render(<Home />);
    expect(getByText(component.container, 'Delayed Messages')).toBeInTheDocument;
  });
});

describe('for submitting', () => {
  submitMessage.mockResolvedValue(Router.push('/[id]'));

  afterEach(() => {
    submitMessage.mockClear();
  });

  test('submit success', async () => {
    const component = render(<Home />);
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

    await waitFor(() => {
      expect(submitMessage).toHaveBeenCalledTimes(1);
    });
    expect(Router.push).toHaveBeenCalledWith('/[id]');
  });

  test('submit fail', async () => {
    const component = render(<Home />);
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

    expect(submitMessage).toHaveBeenCalledTimes(0);
  });
});
