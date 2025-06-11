import 'dotenv/config';
import appJson from './app.json';

export default {
  expo: {
    ...appJson.expo,
    updates: {
      url: 'https://u.expo.dev/2f34bcce-844b-47a9-9a92-b3ddef9e4bf2'
    },
    runtimeVersion: {
      policy: 'appVersion'
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api',
      ...appJson.expo.extra
    }
  }
};