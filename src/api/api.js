import axios from 'axios';

const API_URL = '/api/Uw5CrX';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL); // Match this with the proxy setup
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching quiz data:', error.message);
    throw new Error('Failed to fetch quiz data');
  }
};
