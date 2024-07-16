import React from 'react';
import 'react-dom';

declare module 'react-dom' {
  interface Root {
    render: (children: React.ReactNode) => void;
    unmount: () => void;
  }

  export function createRoot(
    container: Element,
    options?: {
      hydrate?: boolean;
    }
  ): Root;
}
