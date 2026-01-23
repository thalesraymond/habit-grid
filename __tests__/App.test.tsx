import { render, screen } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '../app/(tabs)/index';

jest.mock('expo-router', () => {
  const Link = ({ children }: { children: React.ReactNode }) => children;

  Link.Trigger = ({ children }: { children: React.ReactNode }) => children;
  Link.Preview = () => null;
  Link.Menu = ({ children }: { children: React.ReactNode }) => children;
  Link.MenuAction = () => null;

  return {
    Link,
  };
});


describe('HomeScreen', () => {
  it('renders successfully', () => {
    render(<HomeScreen />);
    expect(screen.getByText('My Habits')).toBeTruthy();
  });

  it('has accessible GitHub link', () => {
    render(<HomeScreen />);
    expect(screen.getByLabelText('Visit Habit Grid repository on GitHub')).toBeTruthy();
  });

  it('has accessible Add Habit button', () => {
    render(<HomeScreen />);
    expect(screen.getByRole('button', { name: '+ Add Habit' })).toBeTruthy();
  });
});
