import axios from 'axios';

const API_URL = '/db.json'; // Path to your local JSON file

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.questions; // Ensure this matches the JSON structure
  } catch (error) {
    console.error('Error fetching quiz data:', error.message);
    throw new Error('Failed to fetch quiz data');
  }
};
