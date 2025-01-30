import axios from 'axios';

const API_URL = '/api/Uw5CrX';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get('/api/Uw5CrX'); // Ensure this matches your proxy
    return response.data.questions; // Extract only the questions array
  } catch (error) {
    console.error('Error fetching quiz data:', error.message);
    throw new Error('Failed to fetch quiz data');
  }
};