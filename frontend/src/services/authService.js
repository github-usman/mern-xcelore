// src/services/authService.js

import axios from 'axios';
import { baseUrl } from '../config/env.config';


const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'Login failed. Please try again.';
    throw new Error(errorMessage);
  }
};

export { login };
