import axios from 'axios';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/results`;

export const saveResult = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (err) {
    console.error('Error saving result:', err);
    throw err;
  }
};