import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
  }),
}));
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useLocalSearchParams: () => ({ recipeId: 1 })
}));
jest.mock('../../data/recipes', () => ([{ id: 1, title: 'Test Recipe', steps: ['a', 'b', 'c'], description: 'desc', recipe: 'r' }]));

beforeEach(() => {
  jest.useFakeTimers();
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ message: 'New result saved 🔥' })
  }));
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});
afterEach(() => {
  jest.clearAllMocks();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('ChefGame', () => {
  it('should call fetch with correct payload on saveResult', async () => {
    const ChefGame = require('../../app/job/Chef/game.jsx').default;
    const correctSteps = ['a', 'b', 'c'];
    const { getByText } = render(<ChefGame recipeId={1} testSteps={correctSteps} />);
    fireEvent.press(getByText('Start Game'));
    fireEvent.press(getByText('Submit'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/game/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"email":"test@example.com"'),
        })
      );
    });
  });

  it('should show feedback Alert on new record', async () => {
    const ChefGame = require('../../app/job/Chef/game.jsx').default;
    const correctSteps = ['a', 'b', 'c'];
    const { getByText } = render(<ChefGame recipeId={1} testSteps={correctSteps} />);
    fireEvent.press(getByText('Start Game'));
    fireEvent.press(getByText('Submit'));
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'New result saved 🔥' })
    });
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        expect.stringMatching(/First time|Score saved successfully/i),
        expect.any(String)
      );
    });
  });

  it('should show error Alert on wrong order', async () => {
    const ChefGame = require('../../app/job/Chef/game.jsx').default;
    // Podamo napačen vrstni red!
    const wrongSteps = ['c', 'b', 'a'];
    const { getByText } = render(<ChefGame recipeId={1} testSteps={wrongSteps} />);
    fireEvent.press(getByText('Start Game'));
    fireEvent.press(getByText('Submit'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('❌ Wrong!', 'Try again...');
    });
  });
});
