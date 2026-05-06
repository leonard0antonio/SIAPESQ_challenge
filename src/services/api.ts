import axios from 'axios';

// Cria uma instância do axios com a URL base da sua API.
// Como o desafio não forneceu uma URL de backend, configuramos para localhost.
// (Mais abaixo explico como simular esta API localmente para testar)
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});