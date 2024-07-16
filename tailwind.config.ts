import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import animationDelay from 'tailwindcss-animation-delay';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const widthUnits = {
  initial: 'initial',
  inherit: 'inherit',
  none: 'none',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
  0: '0px',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  4.5: '1.125rem',
  5: '1.25rem',
  5.5: '1.375rem',
  6: '1.5rem',
  6.5: '1.625rem',
  7: '1.75rem',
  7.5: '1.875rem',
  8: '2rem',
  8.5: '2.125rem',
  9: '2.25rem',
  9.5: '2.375rem',
  10: '2.5rem',
  10.5: '2.625rem',
  11: '2.75rem',
  11.5: '2.875rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  full: '100%',
  screen: '100vw',
  xs: '20rem',
  'xs+': '21.5rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  prose: '65ch',
  'screen-vh': '100vh',
  'screen-vw': '100vw',
  'screen-sm': '640px',
  'screen-md': '768px',
  'screen-lg': '1024px',
  'screen-xl': '1280px',
  'screen-2xl': '1400px',
};
const heightUnits = {
  ...widthUnits,
  screen: '100vh',
};

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },

    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000000',
        white: '#FFFFFF',
        shadow: 'rgba(0, 0, 0, 0.15)',

        custom: {
          tertiary: {
            DEFAULT: 'rgba(var(--custom-tertiary), <alpha-value>)',
          },
          progressbar: {
            DEFAULT: 'rgba(var(--custom-progressbar), <alpha-value>)',
          },
          'text-how-it-works': {
            DEFAULT: 'rgba(var(--custom-text-how-it-works), <alpha-value>)',
            hover: 'rgba(var(--custom-text-how-it-works-hover), <alpha-value>)',
          },
          'text-ad-button': {
            DEFAULT: 'rgba(var(--custom-text-ad-button), <alpha-value>)',
            hover: 'rgba(var(--custom-text-ad-button-hover), <alpha-value>)',
          },
          'text-primary': {
            DEFAULT: 'rgba(var(--custom-text-primary), <alpha-value>)',
            forest: 'rgba(var(--custom-text-primary-forest), <alpha-value>)',
          },
          'text-secondary': {
            DEFAULT: 'rgba(var(--custom-text-secondary), <alpha-value>)',
          },
          primary: {
            DEFAULT: 'rgba(var(--custom-primary), <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'rgba(var(--custom-secondary), <alpha-value>)',
          },
          background: {
            DEFAULT: 'rgba(var(--custom-background), <alpha-value>)',
          },
          'compose-button': {
            DEFAULT: 'rgba(var(--custom-compose-button), <alpha-value>)',
          },
          'selected-tab-left': {
            DEFAULT: 'rgba(var(--custom-selected-tab-left), <alpha-value>)',
          },
          'search-bar': {
            DEFAULT: 'rgba(var(--custom-search-bar), <alpha-value>)',
          },
          'selected-tab-top': {
            DEFAULT: 'rgba(var(--custom-selected-tab-top), <alpha-value>)',
          },
          'read-email': {
            DEFAULT: 'rgba(var(--custom-read-email), <alpha-value>)',
          },
          'unread-email': {
            DEFAULT: 'rgba(var(--custom-unread-email), <alpha-value>)',
          },
          'selected-email': {
            DEFAULT: 'rgba(var(--custom-selected-email), <alpha-value>)',
          },
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        progressBar: 'radial-gradient(closest-side, transparent 90%, rgba(0,0,0,0.05) 10% 100%), conic-gradient(rgb(var(--custom-progressbar)) var(--progressBarPercentage, 0%), transparent 0)',
      },
      spacing: {
        '0x': '0px',
        '0.5x': '2px',
        '1x': '4px',
        '1.5x': '6px',
        '2x': '8px',
        '2.5x': '10px',
        '3x': '12px',
        '3.5x': '14px',
        '4x': '16px',
        '4.5x': '18px',
        '5x': '20px',
        '5.5x': '22px',
        '6x': '24px',
        '6.5x': '26px',
        '7x': '28px',
        '7.5x': '30px',
        '8x': '32px',
        '8.5x': '34px',
        '9x': '36px',
        '9.5x': '38px',
        '10x': '40px',
      },
      dropShadow: {
        top: '0 -4px 6px var(--tw-shadow-color)',
        'top-lg': '0 -10px 15px var(--tw-shadow-color)',
        'top-xl': '0 -20px 25px var(--tw-shadow-color)',
        'top-2xl': '0 -25px 50px var(--tw-shadow-color)',
        center: '0 0 6px var(--tw-shadow-color)',
        'center-lg': '0 0 15px var(--tw-shadow-color)',
        'center-xl': '0 0 25px var(--tw-shadow-color)',
        'center-2xl': '0 0 50px var(--tw-shadow-color)',
        bottom: '0 4px 6px var(--tw-shadow-color)',
        'bottom-lg': '0 10px 15px var(--tw-shadow-color)',
        'bottom-xl': '0 20px 25px var(--tw-shadow-color)',
        'bottom-2xl': '0 25px 50px var(--tw-shadow-color)',

        'custom-bottom': '0 4px 14px rgba(0, 0, 0, 0.16)',
      },
      boxShadow: {
        top: '0 -4px 6px var(--tw-shadow-color)',
        'top-lg': '0 -10px 15px var(--tw-shadow-color)',
        'top-xl': '0 -20px 25px var(--tw-shadow-color)',
        'top-2xl': '0 -25px 50px var(--tw-shadow-color)',
        center: '0 0 6px var(--tw-shadow-color)',
        'center-lg': '0 0 15px var(--tw-shadow-color)',
        'center-xl': '0 0 25px var(--tw-shadow-color)',
        'center-2xl': '0 0 50px var(--tw-shadow-color)',
        bottom: '0 4px 6px var(--tw-shadow-color)',
        'bottom-lg': '0 10px 15px var(--tw-shadow-color)',
        'bottom-xl': '0 20px 25px var(--tw-shadow-color)',
        'bottom-2xl': '0 25px 50px var(--tw-shadow-color)',

        'custom-bottom': '0 4px 14px rgba(0, 0, 0, 0.16)',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        xl: '0 12px 24px var(--tw-shadow-color)',
        none: '0 0 0 transparent',
        top: '0 -4px 6px var(--tw-shadow-color)',
        'top-lg': '0 -10px 15px var(--tw-shadow-color)',
        'top-xl': '0 -20px 25px var(--tw-shadow-color)',
        'top-2xl': '0 -25px 50px var(--tw-shadow-color)',
        center: '0 0 6px var(--tw-shadow-color)',
        'center-lg': '0 0 15px var(--tw-shadow-color)',
        'center-xl': '0 0 25px var(--tw-shadow-color)',
        'center-2xl': '0 0 50px var(--tw-shadow-color)',
        bottom: '0 4px 6px var(--tw-shadow-color)',
        'bottom-lg': '0 10px 15px var(--tw-shadow-color)',
        'bottom-xl': '0 20px 25px var(--tw-shadow-color)',
        'bottom-2xl': '0 25px 50px var(--tw-shadow-color)',
      },
      flexGrow: {
        max: '9999',
      },
      flex: {
        1: '1 1 0%',
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
        9: '9 9 0%',
        10: '10 10 0%',
        11: '11 11 0%',
        12: '12 12 0%',
      },
      width: widthUnits,
      maxWidth: widthUnits,
      minWidth: widthUnits,
      height: heightUnits,
      maxHeight: heightUnits,
      minHeight: heightUnits,
      size: widthUnits,
      letterSpacing: {
        px: '1px',
      },
      transitionProperty: {
        dimensions: 'width, height',
        transform: 'transform',
        position: 'top, right, bottom, left',
        matrix: 'width, height, transform, top, right, bottom, left',
        spacing: 'margin, padding',
        opacity: 'opacity',
        color: 'color, background, fill, stroke',
        border: 'border',
      },
      screens: {
        '2xl': '1400px',
        '3xl': '1784px',
        '4xl': '1920px',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        Inter: ['Inter', ...fontFamily.sans],
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient-rotate': {
          from: { backgroundPosition: '0% 0%' },
          to: { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-rotate': 'gradient-rotate 2s infinite',
      },
    },

    fontFamily: {
      body: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
  },
  plugins: [
    typography,
    animate,
    animationDelay,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({ 'text-shadow': (value) => ({ textShadow: value }) }, { values: theme('textShadow') });
    }),
    plugin(function ({ addUtilities, theme }) {
      function extractVars(obj: any, prefix: string, group: string = ''): any {
        // @ts-ignore
        return Object.keys(obj).reduce((vars: any, key: string) => {
          const value = obj[key];
          const cssVariable = key === 'DEFAULT' ? `--${prefix}${group}` : `--${prefix}${group}-${key}`;
          const newVars = typeof value === 'string' ? { [cssVariable]: value } : extractVars(value, prefix, `-${key}`);
          return { ...vars, ...newVars };
        }, {});
      }
      addUtilities({
        ':root': {
          ...extractVars(theme('colors'), 'color'),
          ...extractVars(theme('backgroundImage'), 'background-image'),
          ...extractVars(theme('boxShadow'), 'box-shadow'),
          ...extractVars(theme('width'), 'w'),
          ...extractVars(theme('height'), 'h'),
        },
      });
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.overflow-x-initial': { 'overflow-x': 'initial' },
        '.overflow-y-initial': { 'overflow-y': 'initial' },
        '.overflow-initial': { overflow: 'initial' },
        '.overflow-x-inherit': { 'overflow-x': 'inherit' },
        '.overflow-y-inherit': { 'overflow-y': 'inherit' },
        '.overflow-inherit': { overflow: 'inherit' },
      };
      // @ts-ignore
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
} as Config;
