import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Leaderboard from '../Home/Leaderboard';

// mock za url
beforeAll(() => {
  process.env.EXPO_PUBLIC_API_URL = 'http://localhost';
});

// mock za fetch, da vrne prazen seznam
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

test('Leaderboard renders correctly', async () => {
  const { getByText } = render(<Leaderboard />);
  await waitFor(() => {
    expect(getByText('🏆 Games Leaderboard 🏆')).toBeTruthy();
  });
});

// po testu počitsti mock
afterAll(() => {
  global.fetch.mockRestore && global.fetch.mockRestore();
});