import axios, { AxiosRequestConfig } from 'axios';

import LocalStorage from './LocalStorage';

const token = LocalStorage.getToken();

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
