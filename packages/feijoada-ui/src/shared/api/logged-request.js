import store from '../../store';
import { getInstance } from './http';

export const getToken = async () => {
  const { token } = store.getters['getOption']('account')
  return `Bearer ${token}`;
}

export const getHttp = async () => {
  const http = getInstance();
  http.defaults.headers.commom['Authorization'] = await getToken();

  return http;
}
