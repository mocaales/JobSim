import Constants from 'expo-constants';
import axios from 'axios';

// read base API URL from expoConfig.extra
const BASE = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE}/results`;

export const saveResult = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (err) {
    console.error('Error saving result:', err);
    throw err;
  }
};
