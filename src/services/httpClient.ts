import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://l60lz7y9w3.execute-api.us-east-1.amazonaws.com',
});
