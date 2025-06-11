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

beforeEach(() => {
  let callCount = 0;
  global.fetch = jest.fn((url) => {
    callCount++;
    // Prvi klic je nominatim (OpenStreetMap)
    if (url && url.includes('nominatim.openstreetmap.org')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { geojson: { type: 'Polygon', coordinates: [[[15, 46], [16, 46], [16, 47], [15, 47], [15, 46]]] } }
        ])
      });
    }
    // OpenRouteService directions API
    if (url && url.includes('api.openrouteservice.org')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          features: [
            { geometry: { coordinates: [[15.64869, 46.55175], [15.7, 46.6]] } }
          ]
        })
      });
    }
    // /game/submit
    if (url && url.includes('/game/submit')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'New result saved 🔥' })
      });
    }
    // fallback
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('DispatcherGame', () => {
  it('renders without crashing', () => {
    const DispatcherGame = require('../../app/job/Dispatcher/game.jsx').default;
    const { getByText } = render(<DispatcherGame />);
  });

  it('shows feedback Alert on result submit', async () => {
    const DispatcherGame = require('../../app/job/Dispatcher/game.jsx').default;
    const { getByText } = render(<DispatcherGame />);
    fireEvent.press(getByText('Begin'));
    await waitFor(() => expect(getByText('Submit')).toBeTruthy());
    fireEvent.press(getByText('Submit'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Draw route first');
    });
  });
});
