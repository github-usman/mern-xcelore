import axios from 'axios';
import { baseUrl } from './env.config';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export { axiosInstance };
