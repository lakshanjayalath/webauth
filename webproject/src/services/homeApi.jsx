import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api/home';

export const getWelcomeMessage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/welcome`);
    return response.data;
  } catch (error) {
    console.error('Error fetching welcome message:', error);
    return 'Backend unavailable';
  }
};
