import { axiosInstance } from '../config/axios.config';
import Cookies from "js-cookie";
const loginService = async (email, password) => {
  try {
    const response = await axiosInstance.post('/user/login', { email, password });
    const { token } = response.data;
    if (token) {
      Cookies.set('token', token, { expires: 5 }); 
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Login failed. Please try again.';
    throw new Error(errorMessage);
  }
};


const fetchProfileService = async () => {
  try {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axiosInstance.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchAllProfileService = async (keyword = '', page = 1) => {
  try {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axiosInstance.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        keyword,
        page,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export { loginService, fetchProfileService,fetchAllProfileService };
