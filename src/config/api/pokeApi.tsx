import axios from 'axios';

// Instancia de axios
export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});
