import type { InboxSDK as PlatformImplementation } from '@inboxsdk/core';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      REFRESH_URL: string;
      API_URL: string;
    }
  }
}

declare global {
  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>;
    keys<T extends object>(o: T): (keyof T)[];
  }
  interface JSON {
    parse<T = unknown>(text: string, reviver?: (this: any, key: string, value: any) => any): T;
  }
  interface URLSearchParams {
    get<T extends string>(name: string): T | null;
  }
}

declare global {
  interface Window {
    XMLHttpRequest: typeof XMLHttpRequest;
    sdk?: PlatformImplementation;
  }
  interface Document {
    selection: Selection | null;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
