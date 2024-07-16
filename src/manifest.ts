import { CrxPlugin } from '@crxjs/vite-plugin';
import { version } from '../package.json';

type ManifestV3 = Parameters<NonNullable<CrxPlugin['transformCrxManifest']>>[number];

const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'Wildhero - Plants Trees With Your Email',
  short_name: 'Wildhero',
  description: 'Plants trees with your email.',
  version,
  key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0NulF4+ocWkFI/mDDyjG5v1+Bj7Sa6qceNkRlOGjNgPIWqz7EJeYxCl96Twf8nMUMGXAXTJ5AFoq5Hcf+rsQb/h/84o81XMCK8DLr5D3cGyAN0bE3eAP8rlUUWWwS3EiB2yxeEkfVGEFP1YMVxDXE1k0+NOe361iAD53CpakGGoeKhn+Nr0SRonK2239r5pGF+7yKML1UywbvgdoLu02TNI1OmGTHDZ+9XCYFG4gaWGUe/3XFi2AMgJD3RI5RvVf2z5j3TvZafnhT181otxEcVQPs2Et8U6yDedYV/nP0gKfazP4EoJio8MTcM6bzdsRRrHdd6qcAPe66DAj2VLMAQIDAQAB',
  incognito: 'split',
  homepage_url: 'https://github.com/chromane/wildhero#readme',
  author: { email: 'andrew@chromane.com' },
  background: {
    service_worker: 'background/index.ts',
  },
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
  },
  content_scripts: [
    {
      // @ts-ignore
      run_at: 'document_start',
      all_frames: false,
      matches: ['https://mail.google.com/*'],
      js: ['content/index.tsx'],
      css: ['css/content.css', 'css/widgets.css'],
    },
  ],
  minimum_chrome_version: '96',
  web_accessible_resources: [
    {
      resources: ['*', 'auth_success/auth_success.html'],
      matches: ['https://*/*', 'http://*/*'],
      extension_ids: [],
    },
  ],
  action: {
    default_popup: 'popup/popup.html',
    default_icon: {
      '16': 'images/extension_16.png',
      '32': 'images/extension_32.png',
      '48': 'images/extension_48.png',
      '64': 'images/extension_64.png',
      '128': 'images/extension_128.png',
    },
  },
  icons: {
    '16': 'images/extension_16.png',
    '32': 'images/extension_32.png',
    '48': 'images/extension_48.png',
    '64': 'images/extension_64.png',
    '128': 'images/extension_128.png',
  },
  permissions: ['storage', 'scripting'],
};

export default manifest;
