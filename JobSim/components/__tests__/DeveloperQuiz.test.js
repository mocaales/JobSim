import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DeveloperQuiz from '../../app/job/Developer/quiz';

// Mock Clerk useUser hook
jest.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
  }),
}));

// Mock Math.random and Array.prototype.sort for deterministic quiz
beforeAll(() => {
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ ok: true }) }));
  jest.spyOn(global.Math, 'random').mockReturnValue(0); // always pick first questions
  jest.spyOn(Array.prototype, 'sort').mockImplementation(function () { return this; }); // no shuffle
});
afterAll(() => {
  jest.restoreAllMocks();
});

test('Poveča score, če izbereš pravilen odgovor', async () => {
  const { getByText, getByTestId } = render(<DeveloperQuiz />);
  await waitFor(() => getByText(/1\./));
  // Prva možnost je vedno pravilna zaradi mocka
  const firstOptionButton = getByTestId('option-0');
  fireEvent.press(firstOptionButton);
  fireEvent.press(getByText('Next'));
  await waitFor(() => getByText(/2\./));
});

test('Pravilni odgovori na vsa vprašanja dajo 100% score', async () => {
  const { getByText, getByTestId } = render(<DeveloperQuiz />);
  for (let i = 1; i <= 8; i++) { // 8 vprašanj zaradi mocka
    await waitFor(() => getByText(new RegExp(`^${i}\\.`)));
    const firstOptionButton = getByTestId('option-0');
    fireEvent.press(firstOptionButton);
    // Po zadnjem vprašanju je še vedno gumb Next, ne Finish
    fireEvent.press(getByText('Next'));
  }
  // Po zadnjem Next se prikaže rezultat
  await waitFor(() => getByText(/Quiz Completed/i));
  expect(getByText(/100%/)).toBeTruthy();
});
