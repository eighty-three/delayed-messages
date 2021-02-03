import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';
import { render } from '@testing-library/preact';

import Navbar from './Navbar';

describe('navbar', () => {
  test('correct text', () => {
    const component = render(<Navbar />);

    expect(component.container).toHaveTextContent(
      'Delayed Messages'
    );
  });

  test('correct link', () => {
    const { getByText } = render(<Navbar />);

    expect(getByText('Delayed Messages').closest('a')).toHaveAttribute(
      'href', '/'
    );
  });
});
