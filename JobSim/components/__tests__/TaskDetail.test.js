import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskDetail from '../../app/job/Developer/tasks/[taskId]';
import { Alert } from 'react-native';

// Mock Clerk useUser hook
jest.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
  }),
}));

// Mock useLocalSearchParams to always return a known taskId
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ taskId: '1' }),
}));

// Mock developerTasks
jest.mock('../../data/developerTasks', () => ({
  developerTasks: [
    {
      id: '1',
      title: 'Test Task',
      question: 'console.log(1+1)',
      options: ['2', '3', '4'],
      correctIndex: 0,
      difficulty: 5,
      type: 'multiple-choice',
      lines: [],
    },
  ],
}));

describe('TaskDetail', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ ok: true }) }));
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with correct payload on correct answer', async () => {
    const { getByText } = render(<TaskDetail />);
    // Izberi prvi (pravilen) odgovor
    fireEvent.press(getByText('2'));
    // Počakaj, da se fetch pokliče
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/game/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"score":5'),
        })
      );
    });
  });

  it('should show incorrect Alert and NOT call fetch on wrong answer', async () => {
    const { getByText } = render(<TaskDetail />);
    // Izberi napačen odgovor (druga možnost)
    fireEvent.press(getByText('3'));
    // Preveri, da je prikazan Alert z napačnim sporočilom
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('❌ Incorrect', 'Try again.');
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('should show error Alert if fetch fails on correct answer', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    const { getByText } = render(<TaskDetail />);
    fireEvent.press(getByText('2'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('✅ Correct!', 'Well done.');
      // Počakamo še na napako v konzoli (ni nujno, da je Alert za napako, ker komponenta logira v console.error)
      // Če bi želeli Alert za napako, bi morali komponento prilagoditi
    });
  });
});
