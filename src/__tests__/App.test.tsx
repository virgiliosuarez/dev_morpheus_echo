import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

describe('App root', () => {
it('renders the Chat screen title', () => {
  const { getByText } = render(<App />);
  expect(getByText("Morpheus' Echo")).toBeTruthy();
});
});