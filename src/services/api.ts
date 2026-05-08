import axios from 'axios';

// O Vite utiliza 'import.meta.env' para aceder a variáveis de ambiente.

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
});