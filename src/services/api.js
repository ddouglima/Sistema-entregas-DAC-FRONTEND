import axios from 'axios';

// -----------------------------------------------------------
// ⚠️ ATUALIZE ESTA URL PARA A SUA URL DO BACKEND NA LOCAWEB/VERCEL
// -----------------------------------------------------------
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Exemplo de como configurar um token de autenticação (JWT)
 * (Isto seria necessário se você implementasse JWT no backend)
 */
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('userToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


export default api;