import axios from 'axios';

const APP_URL = process.env.REACT_APP_DEV_URL;

function getToken() {
  const data = localStorage && localStorage.getItem('token');
  return data; 
}

let ApiDev = axios.create({
  baseURL: APP_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
});

ApiDev.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiDev;
