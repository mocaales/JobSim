import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

// Arrange mode: mock developerTasks and useLocalSearchParams for arrange task
jest.mock('../../data/developerTasks', () => ({
  developerTasks: [
    {
      id: '2',
      title: 'Arrange Task',
      question: 'Arrange the lines',
      options: [],
      correctIndex: 0,
      difficulty: 3,
      type: 'arrange',
      lines: ['a', 'b', 'c'],
      shuffled: ['a', 'b', 'c'],
    },
  ],
}));
jest.mock('expo-router', () => ({ useLocalSearchParams: () => ({ taskId: '2' }) }));
jest.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      primaryEmailAddress: { emailAddress: 'test@example.com' },
    },
  }),
}));

const TaskDetailArrange = require('../../app/job/Developer/tasks/[taskId]').default;

describe('TaskDetail arrange mode', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ ok: true }) }));
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should call fetch and show correct Alert in arrange mode when order is correct', async () => {
    const { getByText } = render(<TaskDetailArrange />);
    fireEvent.press(getByText('Preveri vrstni red'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('✅ Correct!');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/game/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"score":3'),
        })
      );
    });
  });
});
