import axios from 'axios';
const APP_URL = process.env.REACT_APP_BASE_URL
function getToken() {
  const data = localStorage && localStorage.getItem('token');
  return data; 
}

let Api = axios.create({
  baseURL:APP_URL,
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
    'Access-Control-Allow-Origin': '*',
    "Cache-Control" : 'no-cache, no-store, must-revalidate'
  }
});

Api.interceptors.request.use(
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

export default Api;
