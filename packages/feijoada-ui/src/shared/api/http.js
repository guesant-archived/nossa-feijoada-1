import axios from 'axios';

const { VUE_APP_ENDPOINT_URL } = process.env;

export const httpConfig = {
  baseURL: VUE_APP_ENDPOINT_URL
}
export const getInstance = () => axios.create({
  baseURL: httpConfig.baseURL,
  headers: {
    'Accept': 'application/json'
  }
});

export default getInstance();
