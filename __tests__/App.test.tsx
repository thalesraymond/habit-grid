import { render, screen } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '../app/(tabs)/index';

describe('HomeScreen', () => {
  it('renders successfully', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Welcome :D!')).toBeTruthy();
  });
});
