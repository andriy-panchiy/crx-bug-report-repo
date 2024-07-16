export const isDev = process.env.NODE_ENV === 'development';
export const extension_id = chrome.runtime.id;

export default {
  mode: isDev ? 'development' : 'production',
  extension_id,
  EXTENSION_AUTH_URL: chrome.runtime.getURL('/options/options.html'),
  CLIENT_URL: 'https://wildhero.com',
  REFRESH_URL: 'https://mail.wildhero.com',
  API_URL: 'https://elm.production.wildhero.xyz',
};
