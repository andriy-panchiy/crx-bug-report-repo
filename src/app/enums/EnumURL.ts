export const EnumURL = {
  logout: { url: 'https://mail.wildhero.com/logout', title: null, alt: '', target: '_blank' },
  auth: { url: 'https://mail.wildhero.com/extension-auth', title: null, alt: '', target: '_blank' },
  root: { url: 'https://mail.wildhero.com/', title: null, alt: '', target: '_blank' },
  learn_more: { url: 'https://blog.wildhero.com/our-ethical-brand-partners/', title: null, alt: '', target: '_blank' },
  how_it_works: { url: 'https://blog.wildhero.com/how-wildhero-works/', title: null, alt: '', target: '_blank' },
} as const;

export type EnumURL = keyof typeof EnumURL;
