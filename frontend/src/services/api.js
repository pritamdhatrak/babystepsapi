import axios from 'axios';

const api = axios.create({
  baseURL: 'https://babystepsapi.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  withCredentials: false
});

// Set token (only in the browser, after window loads)
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request)
  return request
});

// Add response interceptor for debugging
api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
}, error => {
  console.log('Error:', error.response)
  return Promise.reject(error)
});

export default api;
