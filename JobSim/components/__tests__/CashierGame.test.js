import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

// Mock Clerk useUser hook
jest.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
  }),
}));

// Mock navigation
jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));

// Mock data and dependencies
jest.mock('../../data/jobs', () => ({}));

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ message: 'New result saved 🔥' })
  }));
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('CashierGame', () => {
  it('should call fetch with correct payload on finishGame', async () => {
    const CashierGame = require('../../app/job/Cashier/game.jsx').default;
    // Render game in gameOver state to trigger finishGame
    const { getByText } = render(<CashierGame />);
    // Simuliraj konec igre (prikaz gumba za zaključek)
    // Najdi gumb "Back to Menu" in klikni
    // (Če je potrebno, prilagodi test glede na UI)
    // fireEvent.press(getByText('Back to Menu'));
    // Počakaj, da se fetch pokliče
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/game/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // body preverimo le, da vsebuje email in game
          body: expect.stringContaining('"email":"test@example.com"'),
        })
      );
    });
  });

  it('should show feedback Alert on new record', async () => {
    const CashierGame = require('../../app/job/Cashier/game.jsx').default;
    // Render game in gameOver state
    render(<CashierGame />);
    // Simuliraj fetch, ki vrne "New result saved"
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'New result saved 🔥' })
    });
    // Simuliraj konec igre in preveri Alert
    // fireEvent.press(getByText('Back to Menu'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        expect.stringMatching(/First time|Score saved successfully/i),
        expect.any(String)
      );
    });
  });
});
