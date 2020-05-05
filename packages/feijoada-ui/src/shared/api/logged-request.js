import localforage from 'localforage';
import { getInstance } from './http';

const getToken = async () => {
  const token = await localforage.getItem('token');
  return `Bearer ${token}`;
}

export const getHttp = async () => {
  const http = getInstance();
  http.defaults.headers.commom['Authorization'] = await getToken();

  return http;
}
