import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api';

export const fetchGreeting = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hello`);
    return response.data;
  } catch (error) {
    console.error('Error fetching greeting:', error);
    throw error;
  }
};
