import { Api } from '@app/api/wildmail-generated-api';
import config from '@utils/config';

export const API = new Api({
  withCredentials: true,
  baseURL: config.REFRESH_URL,
});
