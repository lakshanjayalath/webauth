import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:5080/api/auth/login', {
    email: email,
    password: password
  });
  return response.data;
};
