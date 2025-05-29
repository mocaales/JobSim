import 'dotenv/config';
import appJson from './app.json';

export default {
  expo: {
    ...appJson.expo,
    extra: {
      // privzeto preberi iz .env: EXPO_PUBLIC_API_URL
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api',
      // ohrani ostale nastavitve
      ...appJson.expo.extra
    }
  }
};
