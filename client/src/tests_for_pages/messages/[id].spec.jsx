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
