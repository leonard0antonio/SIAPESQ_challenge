import axios from 'axios';

// Criação de uma instância do Axios com a URL base configurada para o backend, facilitando as requisições HTTP para os endpoints da API. Essa instância pode ser importada e utilizada em diferentes partes da aplicação para realizar operações como GET, POST, PUT e DELETE, garantindo uma comunicação consistente com o servidor.
export const api = axios.create({
  baseURL: 'https://siapesq-api-j101.onrender.com',
});