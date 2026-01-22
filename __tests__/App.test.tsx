import { render, screen } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '../app/(tabs)/index';

jest.mock('expo-router', () => {
  const React = require('react');
  const View = require('react-native').View;
  
  const Link = (props: any) => {
    return React.createElement(View, props, props.children);
  };
  
  Link.Trigger = ({ children }: any) => React.createElement(View, {}, children);
  Link.Preview = () => null;
  Link.Menu = ({ children }: any) => React.createElement(View, {}, children);
  Link.MenuAction = () => null;
  
  return {
    Link,
  };
});


describe('HomeScreen', () => {
  it('renders successfully', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Welcome :D!')).toBeTruthy();
  });
});
