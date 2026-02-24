import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://k2oo9k21y5.execute-api.us-east-1.amazonaws.com',
});
