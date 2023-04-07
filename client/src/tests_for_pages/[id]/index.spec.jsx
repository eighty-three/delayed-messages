import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import 'jsdom-worker-fix';
import * as workerTimers from 'worker-timers';
global.performance = require('perf_hooks').performance;

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

import { render, act } from '@testing-library/preact';
import { getByText, queryByText } from '@testing-library/dom';

import ky from 'ky-universal';
jest.mock('ky-universal');

import { getTime } from '@/lib/time';
jest.mock('@/lib/time');

jest.mock('next/link', () => ({ children }) => children);

import DelayedMessage from '@/pages/[id]';
import { getServerSideProps } from '@/pages/[id]';

describe('components are rendering', () => {
  test('for Navbar', () => {
    const component = render(<DelayedMessage />);
    expect(getByText(component.container, 'Delayed Messages')).toBeInTheDocument;
  });

  test('for DelayedMessage with error', () => {
    const component = render(<DelayedMessage error={'Invalid URL'} />);
    expect(getByText(component.container, 'Invalid URL')).toBeInTheDocument;
  });

  test('for Countdown with time left', () => {
    const target = 100;
    const currentTime = 40;
    const component = render(<DelayedMessage target={target} currentTime={currentTime} />);
    expect(getByText(component.container, '1 minute')).toBeInTheDocument;
    expect(getByText(component.container, 'until the message arrives!')).toBeInTheDocument;
  });

  test('for Countdown with no time left', () => {
    const target = 40;
    const currentTime = 40;
    const component = render(<DelayedMessage target={target} currentTime={currentTime} />);
    expect(getByText(component.container, 'Getting your message..')).toBeInTheDocument;
  });

  test('for DelayedMessage with message', () => {
    const message = 'test message';
    const component = render(<DelayedMessage message={message} />);
    expect(getByText(component.container, 'test message')).toBeInTheDocument;
  });
});

describe('testing getServerSideProps', () => {
  const argGSSP = 
    { 
      query: { id: 'testUrl' }, 
      res: 
        { 
          statusCode: 0 
        }
    };

  beforeEach(() => {
    jest.resetAllMocks();
    getTime.mockResolvedValue({ currentTime: 100 });
    //getMessageData.mockImplementation(jest.requireActual('@/lib/messages').getMessageData);

    /* I wanted to mock `getMessageData` for the `testing countdown` test suite but 
     * I can't temporarily unmock* it for the `testing getServerSideProps` test suite.
     * If I add the code that's commented out, the `ky` mock implementations in each
     * of the tests fail. I don't understand how it works and I'm just guessing but
     * I think it's because setting a mock implementation for the main function, which
     * in this case is `getMessageData`, turns it into some opaque function whose contents
     * aren't subject to change (which is why mocking `ky` doesn't affect it, because `ky`
     * doesn't exist on the function after it's mocked). That's what I think at least.
     * So for the `testing countdown` test suite, instead of mocking `getMessageData`, 
     * I'll just resort to mocking `ky` again. Maybe one day, someone else will look at 
     * this long-as-shit comment block and help me out. 
     * *https://github.com/facebook/jest/issues/2649
     */ 
  });

  test('invalid URL', async () => {
    ky.mockImplementation(() => Promise.resolve({ 
      json: () => Promise.resolve({ error: 'Not Found', statusCode: 404 })
    }));

    const message = await getServerSideProps(argGSSP);

    expect(message).toEqual({
      props: {
        currentTime: 100,
        error: 'Not Found',
        statusCode: 404,
        url: 'testUrl'
      }
    });
  });

  test('target', async () => {
    ky.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ target: 120 })
    }));

    const message = await getServerSideProps(argGSSP);

    expect(message).toEqual({
      props: {
        currentTime: 100,
        target: 120,
        url: 'testUrl'
      }
    });
  });

  test('message', async () => {
    ky.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ message: 'Test message', expire: 120 })
    }));

    const message = await getServerSideProps(argGSSP);

    expect(message).toEqual({
      props: {
        currentTime: 100,
        message: 'Test message',
        expire: 120,
        url: 'testUrl'
      }
    });
  });
});

describe('testing countdown', () => {
  test('it works', async () => {
    const testSpy = jest.spyOn(workerTimers, 'setTimeout');

    const target = 100;
    const currentTime = 40;
    const component = render(<DelayedMessage target={target} currentTime={currentTime} />);

    expect(testSpy).toHaveBeenCalledTimes(1);

    expect(getByText(component.container, '1 minute')).toBeInTheDocument();
    expect(queryByText(component.container, '2 minutes')).not.toBeInTheDocument();
    expect(getByText(component.container, 'until the message arrives!')).toBeInTheDocument;
  });
});
