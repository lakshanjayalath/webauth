import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:5080/api/auth/login', {
    email: email,
    password: password
  });
  return response.data;
};

export const register = async (email, password, role) => {
  const response = await axios.post('http://localhost:5080/api/auth/register', {
    email: email,
    password: password,
    role: role
  });
  return response.data;
};
