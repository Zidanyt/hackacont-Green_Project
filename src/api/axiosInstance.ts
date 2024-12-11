import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://meruem.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
