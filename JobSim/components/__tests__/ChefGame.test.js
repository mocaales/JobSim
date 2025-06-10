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
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ message: 'New result saved 🔥' })
  }));
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('ChefGame', () => {
  it('should call fetch with correct payload on saveResult', async () => {
    const ChefGame = require('../../app/job/Chef/game.jsx').default;
    // Render game and simuliraj konec igre
    render(<ChefGame recipeId={1} />);
    // Počakaj, da se fetch pokliče
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
    render(<ChefGame recipeId={1} />);
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
});
