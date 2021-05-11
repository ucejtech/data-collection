import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:9001';

const Api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 50000
});

export { Api, BASE_URL };
