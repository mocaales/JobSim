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
jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe('Questionnaire', () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_API_URL = 'http://localhost';
    global.fetch = jest.fn((url) => {
      if (url.includes('/check_existing')) {
        return Promise.resolve({ json: () => Promise.resolve({ exists: false }) });
      }
      if (url.includes('/predict')) {
        return Promise.resolve({ json: () => Promise.resolve({ predicted_profession: 'Developer' }) });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates and submits answers to backend', async () => {
    const Questionnaire = require('../../app/questionnaire/Questionnaire.jsx').default;
    const { getByText } = render(<Questionnaire />);
    // Počakaj, da loading izgine
    await waitFor(() => getByText(/Discover Your Ideal Career/i));
    // Izberi odgovor in klikni Next za vsako vprašanje
    for (let i = 0; i < 2; i++) { // testiramo le 2 vprašanja za hitrost
      fireEvent.press(getByText('Strongly Agree'));
      fireEvent.press(getByText(/Next|Submit/i));
    }
    // Simuliraj zadnji odgovor in Submit
    fireEvent.press(getByText('Strongly Agree'));
    fireEvent.press(getByText(/Next|Submit/i));
    // Preveri, da je fetch poklican na /predict
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/predict'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"email":"test@example.com"'),
        })
      );
    });
  });

  it('shows error Alert if backend returns error', async () => {
    process.env.EXPO_PUBLIC_API_URL = 'http://localhost';
    global.fetch = jest.fn((url) => {
      if (url.includes('/check_existing')) {
        return Promise.resolve({ json: () => Promise.resolve({ exists: false }) });
      }
      if (url.includes('/predict')) {
        return Promise.reject(new Error('Network error'));
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
    const Questionnaire = require('../../app/questionnaire/Questionnaire.jsx').default;
    const { getByText } = render(<Questionnaire />);
    await waitFor(() => getByText(/Discover Your Ideal Career/i));
    fireEvent.press(getByText('Strongly Agree'));
    fireEvent.press(getByText(/Next|Submit/i));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to submit answers.');
    });
  });

  it('shows result Alert if backend returns prediction', async () => {
    process.env.EXPO_PUBLIC_API_URL = 'http://localhost';
    global.fetch = jest.fn((url) => {
      if (url.includes('/check_existing')) {
        return Promise.resolve({ json: () => Promise.resolve({ exists: false }) });
      }
      if (url.includes('/predict')) {
        return Promise.resolve({ json: () => Promise.resolve({ predicted_profession: 'Doctor' }) });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
    const Questionnaire = require('../../app/questionnaire/Questionnaire.jsx').default;
    const { getByText } = render(<Questionnaire />);
    await waitFor(() => getByText(/Discover Your Ideal Career/i));
    fireEvent.press(getByText('Strongly Agree'));
    fireEvent.press(getByText(/Next|Submit/i));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Prediction Result', expect.stringMatching(/Doctor/));
    });
  });
});
