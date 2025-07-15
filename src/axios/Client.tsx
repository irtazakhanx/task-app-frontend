import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9000',
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default client;