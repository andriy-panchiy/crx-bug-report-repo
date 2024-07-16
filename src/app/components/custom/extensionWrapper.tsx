import 'react-toastify/dist/ReactToastify.css';

import { proxyStore } from '@app/redux/proxyStore';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function extensionWrapper(children: React.ReactNode) {
  return createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {/* @ts-ignore */}
      <Provider store={proxyStore}>{children}</Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
      />
    </React.StrictMode>
  );
}
