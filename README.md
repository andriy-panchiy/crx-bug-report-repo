## Wildhero Chrome Extension

**Wildhero** is a private Chrome extension designed to enhance user experience with various custom widgets and tools. This extension is built using modern web technologies including React, TypeScript, and Tailwind CSS, and follows best practices for linting, formatting, and testing.

### Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)

### Installation

To install the project dependencies, run:

```sh
npm install --force
```

### Scripts

- `dev`: Clean the build directory and start the development server with Vite. (temporary not working due to Vite issue)
- `watch`: Start TypeScript in watch mode.
- `build`: Clean the build directory and create a production build with Vite.
- `firefox-build`: Convert the build for Firefox.
- `clean`: Run all cleaning scripts.
- `clean:dist`: Remove the `dist` directory.
- `clean:dist_firefox`: Remove the `dist_firefox` directory.
- `ci:test`: Run all CI tests.
- `ci:test:lint`: Run all linting tests.
- `ci:test:unit`: Run unit tests with Jest.
- `ci:test:types`: Check TypeScript types.
- `format`: Run all formatting scripts.
- `format:eslint`: Fix ESLint issues.
- `format:prettier`: Fix Prettier issues.
- `format:stylelint`: Fix Stylelint issues.
- `lint`: Run all linting scripts.
- `lint:eslint`: Lint JavaScript, TypeScript, and TSX files.
- `lint:prettier`: Check formatting with Prettier.
- `lint:stylelint`: Lint CSS files.
- `test`: Run unit tests with Jest.
- `test:types`: Check TypeScript types.
- `generate-elm-types`: Generate TypeScript types from the Elm API.
- `generate-wildmail-types`: Generate TypeScript types from the Wildmail API.

### Project Structure

- **.github/**: GitHub-specific configuration files and workflows.
- **.vscode/**: Visual Studio Code-specific settings.
- **dist/**: Distribution folder for the build.
- **node_modules/**: Node.js modules.
- **packages/**: Directory for packages.
- **public/**: Public assets for the extension.
- **src/**: Source code for the extension.
  - **@types/**: TypeScript type definitions.
  - **app/**: Main application code.
    - **api/**: API related code and type definitions.
    - **components/**: Reusable UI components.
      - **custom/**: Custom components.
      - **modals/**: Modal components.
      - **ui/**: UI components.
      - **widgets/**: Widget components.
    - **controllers/**: Controller classes.
    - **css/**: Stylesheets.
    - **enums/**: Enum definitions.
    - **hooks/**: Custom React hooks.
    - **models/**: Data models.
    - **pages/**: Page components.
      - **auth/**: Authentication pages.
      - **overlay/**: Overlay pages.
    - **redux/**: Redux store and slices.
      - **slices/**: Redux slices.
      - **proxyStore.ts**: Redux proxy store setup.
      - **store.ts**: Main Redux store setup.
  - **auth_success/**: Authentication success page.
  - **background/**: Background scripts.
  - **content/**: Content scripts.
  - **options/**: Options page.
  - **popup/**: Popup scripts and HTML.
  - **utils/**: Utility functions and scripts.
- **utils/**: Various utility scripts.
- **config files**: Configuration files for tools like ESLint, Prettier, Stylelint, and Tailwind CSS.

### Dependencies

- `@eduardoac-skimlinks/webext-redux`, `@inboxsdk/core`, `@ownid/webauthn`, `@radix-ui/react-*`, `@reduxjs/toolkit`, `axios`, `bcryptjs`, `buffer`, `clsx`, `dayjs`, `lodash-es`, `nanoid`, `react`, `react-dom`, `react-hook-form`, `react-icons`, `react-redux`, `react-toastify`, `redux-persist`, `swiper`, `tailwind-merge`, `use-query-params`, `uuid`, `webextension-polyfill`.

### Dev Dependencies

- `@commitlint/*`, `@crxjs/vite-plugin`, `@ryansonshine/*`, `@tailwindcss/typography`, `@testing-library/*`, `@total-typescript/ts-reset`, `@types/*`, `eslint`, `eslint-config-*`, `glob`, `identity-obj-proxy`, `jest`, `jest-chrome`, `postcss`, `prettier`, `rimraf`, `stylelint`, `typescript`, `vite`, `vite-plugin-*`.
