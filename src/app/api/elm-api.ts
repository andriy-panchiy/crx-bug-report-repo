import { Api } from '@app/api/elm-generated-api';
import { API as wildmailAPI } from '@app/api/wildmail-api';
import { setIdToken } from '@app/redux/slices/authSlice';
import { store } from '@app/redux/store';
import config from '@utils/config';
import { isTokenExpired } from '@utils/jwtUtils';

export const API = new Api({
  withCredentials: true,
  baseURL: config.API_URL,
});

API.instance.interceptors.request.use(
  async (request) => {
    const state = store.getState();
    let accessToken = state.auth.idToken;
    let refreshToken = state.auth.refreshToken;

    if (accessToken && refreshToken) {
      if (isTokenExpired(accessToken)) {
        const response = await wildmailAPI.api.refreshIdToken({ refresh_token: refreshToken });
        if (response.status !== 200 || !response.data) return request;
        accessToken = response.data.id_token;

        store.dispatch(setIdToken(accessToken));
      }
      request.headers.set('authorization', `Bearer ${accessToken}`);
    }

    request.headers.set('language', 'en');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
