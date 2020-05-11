import store from '../../store';
import { getInstance } from './http';

export const getToken = async () => {
  const { token } = store.getters['settings/getOption']('account');
  return `Bearer ${token}`;
};

export const getHttp = async () => {
  const http = getInstance();
  http.defaults.headers.common['Authorization'] = await getToken();
  return http;
};
