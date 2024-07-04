import axios from 'axios';
import { baseUrl } from '../config/env.config';
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance;
