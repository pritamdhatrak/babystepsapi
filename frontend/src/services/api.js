import axios from 'axios';

const api = axios.create({
  baseURL: 'https://babystepsapi.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Remove withCredentials
delete axios.defaults.withCredentials;

// Set token (only in the browser, after window loads)
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default api;
