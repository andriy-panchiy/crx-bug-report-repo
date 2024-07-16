import config from '@utils/config';
import { jwtDecode } from 'jwt-decode';
import sign from 'jwt-encode';

export type IDateArguments = number | string | Date;
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
export type Func<Args extends string[] = string[], Result = unknown> = (...args: Args) => Result;
export type TypedFunction<Args extends any[] = any[], Resp = any, isPromise extends boolean = false> = (...args: Args) => isPromise extends true ? Promise<Resp> : Resp;

export const time = {
  get second() {
    return 1000;
  },
  get minute() {
    return 60 * this.second;
  },
  get hour() {
    return 60 * this.minute;
  },
  get day() {
    return 24 * this.hour;
  },
  get week() {
    return 7 * this.day;
  },
  get month() {
    return 30 * this.day;
  },
  get year() {
    return 365 * this.day;
  },
} as const;

export function doTimeout(callback: (...args: any[]) => void, ms?: number, ...args: any[]): ReturnType<typeof setTimeout> {
  // try catch fix issue with clearTimeout
  try {
    callback(...args);
  } catch (error) {}
  return setTimeout(callback, ms, ...args);
}

export function doInterval(callback: (...args: any[]) => void, ms?: number, ...args: any[]): ReturnType<typeof setInterval> {
  // try catch fix issue with clearInterval
  try {
    callback(...args);
  } catch (error) {}
  return setInterval(callback, ms, ...args);
}

export function isValidDate(value: IDateArguments): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function getTimeDifference(startTime: IDateArguments | null | undefined, endTime: IDateArguments | null | undefined) {
  if (!startTime || !endTime || !isValidDate(startTime) || !isValidDate(endTime)) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const diff = end - start;
  const years = Math.floor(diff / time.year);
  const months = Math.floor((diff % time.year) / time.month);
  const days = Math.floor((diff % time.month) / time.day);
  const hours = Math.floor((diff % time.day) / time.hour);
  const minutes = Math.floor((diff % time.hour) / time.minute);
  const seconds = Math.floor((diff % time.minute) / time.second);
  return { years, months, days, hours, minutes, seconds };
}

export function getSelectedText(): string {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection) return '';
    return selection.toString();
  } else if (document['selection'] && document['selection'].type !== 'Control') {
    const range = document.getSelection();
    if (!range) return '';
    const r = range.getRangeAt(0);
    const text = r.toString();
    return text;
  }
  return '';
}

export function copyToClipboard(text: string | undefined): void {
  if (!text) return;
  const input = document.createElement('textarea');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export function get_scrollbar_width() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function getQueryParams(params: object) {
  if (!params) return '';
  return (
    '?' +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
}

export function get_params_string(params: string | string[][] | Record<string, string> | URLSearchParams | undefined) {
  return params ? '?' + new URLSearchParams(params) : '';
}

export function get_search_params<T extends object>(search: string) {
  const startIndex = search.indexOf('?');
  const searchParams = startIndex !== -1 ? search.slice(startIndex) : search;
  const params = new URLSearchParams(searchParams);
  const result: Record<string, any> = {};
  for (const [key, value] of params.entries()) {
    result[key] = isNaN(+value) ? value : +value;
  }
  return result as T;
}

export function getCookie(name: string): string {
  const escape = (s: string) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match?.[1] ? match[1] : '';
}

export function updateObjectByKey<T>(obj1: T, obj2: T, searchKey: string) {
  if (!(obj1 instanceof Object)) return obj2;
  if (!(obj2 instanceof Object)) return obj1;
  Object.keys(obj2).forEach((key) => {
    if (key === searchKey) {
      obj1[key as string | number] = obj2[key];
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      obj1[key as string | number] = updateObjectByKey(obj1[key], obj2[key], searchKey);
    }
  });
  return obj1;
}

export function updateObject<T>(obj1: T, obj2: DeepPartial<T>): T {
  if (!(obj1 instanceof Object)) return obj2 as T;
  if (!(obj2 instanceof Object)) return obj1;
  Object.keys(obj2).forEach((Key) => {
    const key = Key as string | number;
    if (obj1[key] === null || typeof obj1[key] === 'undefined') {
      obj1[key] = obj2[key];
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      obj1[key] = updateObject(obj1[key], obj2[key]);
    }
  });
  return obj1;
}

export function updateArrayWithObjectsByKey<T>(
  arr1: T[],
  arr2: DeepPartial<T>[],
  searchKey: string,
  options: {
    insertNew?: boolean;
    insertAt?: 'start' | 'end';
  } = {}
): T[] {
  const default_options: NonNullable<typeof options> = {
    insertNew: true,
    insertAt: 'end',
  };
  options = { ...default_options, ...options };

  if (!arr1.length) return arr2 as T[];
  if (!arr2.length) return arr1;
  arr2.forEach((partialObj) => {
    if (partialObj[searchKey] !== null && partialObj[searchKey] !== undefined) {
      const foundIndex = arr1.findIndex((obj) => obj[searchKey] === partialObj[searchKey]);

      if (foundIndex !== -1 && arr1[foundIndex]) {
        arr1[foundIndex] = updateObject<T>(arr1[foundIndex]!, partialObj);
      } else if (options.insertNew) {
        if (options.insertAt === 'start') {
          arr1.unshift(partialObj as T);
        } else {
          arr1.push(partialObj as T);
        }
      }
    }
  });

  return arr1;
}

export function updateArrayAndUniqueByKey<T>(arr: T[], searchKey: string): T[] {
  if (!arr.length) return arr;
  const uniqueArr: T[] = [];
  arr.forEach((item) => {
    const foundIndex = uniqueArr.findIndex((obj) => obj[searchKey] === item[searchKey]);
    if (foundIndex === -1) {
      uniqueArr.push(item);
    } else {
      uniqueArr[foundIndex] = updateObjectByKey<T>(uniqueArr[foundIndex]!, item, searchKey);
    }
  });
  return uniqueArr;
}

export function get_current_tab_id() {
  if (!chrome.tabs) throw new Error('chrome.tabs is not defined');
  return new Promise((resolve: (value: chrome.tabs.Tab['id'] | null) => void) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        resolve(tabs[0].id);
      } else {
        resolve(null);
      }
    });
  });
}

export async function storage_set(
  keys: { [key: string]: any },
  options: {
    storageType: 'chromeStorageLocal' | 'chromeStorageSync' | 'localStorage' | 'sessionStorage';
  } = {
    storageType: config.mode === 'testing' ? 'localStorage' : 'chromeStorageLocal',
  }
): Promise<void> {
  if (!isValidChromeRuntime()) throw new Error('chrome.runtime is not defined');

  const defaultOptions: NonNullable<typeof options> = {
    storageType: config.mode === 'testing' ? 'localStorage' : 'chromeStorageLocal',
  };
  options = { ...defaultOptions, ...options };

  switch (options.storageType) {
    case 'chromeStorageLocal':
      storage_local_set(keys);
      break;
    case 'chromeStorageSync':
      storage_sync_set(keys);
      break;
    case 'localStorage':
      Object.keys(keys).forEach((key) => {
        const data = keys[key]!;
        localStorage.setItem(String(key), JSON.stringify(data));
      });
      break;
    case 'sessionStorage':
      Object.keys(keys).forEach((key) => {
        const data = keys[key]!;
        sessionStorage.setItem(String(key), JSON.stringify(data));
      });
      break;
    default:
      throw new Error('Invalid storage type specified');
  }
}

export const isValidChromeRuntime = () => {
  return chrome.runtime && !!chrome.runtime.getManifest();
};

export async function storage_get<T>(
  keys: string[] | null = null,
  options: {
    storageType: 'chromeStorageLocal' | 'chromeStorageSync' | 'localStorage' | 'sessionStorage';
  } = {
    storageType: config.mode === 'testing' ? 'localStorage' : 'chromeStorageLocal',
  }
): Promise<T | Record<string, never>> {
  if (!isValidChromeRuntime()) throw new Error('chrome.runtime is not defined');

  const defaultOptions: NonNullable<typeof options> = {
    storageType: config.mode === 'testing' ? 'localStorage' : 'chromeStorageLocal',
  };
  options = { ...defaultOptions, ...options };

  let res = {} as T | Record<string, never>;

  switch (options.storageType) {
    case 'chromeStorageLocal':
      res = await storage_local_get<T>(keys);
      break;
    case 'chromeStorageSync':
      res = await storage_sync_get<T>(keys);
      break;
    case 'localStorage':
      if (keys !== null && keys.length) {
        keys.forEach((key: string) => {
          const item = localStorage.getItem(key);
          res[key] = decode.json(item) || item;
        });
      }
      if (keys === null) {
        Object.keys(localStorage).forEach((key) => {
          const item = localStorage.getItem(key as string);
          res[key] = decode.json(item) || item;
        });
      }
      break;
    case 'sessionStorage':
      if (keys !== null && keys.length) {
        keys.forEach((key: string) => {
          const item = sessionStorage.getItem(key);
          res[key] = decode.json(item) || item;
        });
      }
      if (keys === null) {
        Object.keys(sessionStorage).forEach((key) => {
          const item = sessionStorage.getItem(key as string);
          res[key] = decode.json(item) || item;
        });
      }
      break;
  }
  return res;
}

export async function storage_local_get<T>(items: string[] | null): Promise<T | Record<string, never>> {
  if (!chrome.storage) throw new Error('chrome.storage is not defined');
  return chrome.storage.local.get(items) as ReturnType<typeof storage_local_get<T>>;
}

export async function storage_local_set(items: { [key: string]: any }): Promise<void> {
  if (!chrome.storage) throw new Error('chrome.storage is not defined');
  return chrome.storage.local.set(items);
}

export async function storage_sync_get<T>(items: string[] | null): Promise<T | Record<string, never>> {
  if (!chrome.storage) throw new Error('chrome.storage is not defined');
  return chrome.storage.sync.get(items) as ReturnType<typeof storage_sync_get<T>>;
}

export async function storage_sync_set(items: { [key: string]: any }): Promise<void> {
  if (!chrome.storage) throw new Error('chrome.storage is not defined');
  return chrome.storage.sync.set(items);
}

export async function storage_clear(): Promise<void> {
  if (!chrome.storage) throw new Error('chrome.storage is not defined');
  return chrome.storage.local.clear();
}

export async function tab_reload(tabId: number): Promise<void> {
  if (!chrome.tabs) throw new Error('chrome.tabs is not defined');
  return chrome.tabs.reload(tabId);
}

export async function tabs_reload(): Promise<void> {
  if (!chrome.tabs) throw new Error('chrome.tabs is not defined');
  return chrome.tabs.reload();
}

export async function tabs_create(data: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab> {
  if (!chrome.tabs) throw new Error('chrome.tabs is not defined');
  return chrome.tabs.create(data);
}

export async function tabs_query(data: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
  if (!chrome.tabs) throw new Error('chrome.tabs is not defined');
  return chrome.tabs.query(data);
}

export async function wait(time: number) {
  return new Promise((resolve: Function) => {
    setTimeout(resolve, time);
  });
}

export function withTimeout(promise: Promise<any>, timeout: number) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))]);
}

export async function waitForPromises(promises: Promise<any>[], timeout: number) {
  try {
    return await Promise.all(promises.map((p) => withTimeout(p, timeout)));
  } catch (error) {
    console.error('One or more promises timed out or rejected:', error);
    return null;
  }
}

export async function execute_script_in_all_tabs<T>(tabId: NonNullable<chrome.tabs.Tab['id']>, data: { file: string }): Promise<chrome.scripting.Awaited<T>[] | null>;
export async function execute_script_in_all_tabs<T>(tabId: NonNullable<chrome.tabs.Tab['id']>, data: { func: Func }): Promise<chrome.scripting.Awaited<T>[] | null>;
export async function execute_script_in_all_tabs<T>(
  tabId: NonNullable<chrome.tabs.Tab['id']>,
  { file, func }: { file?: string; func?: Func<any[], T> }
): Promise<chrome.scripting.Awaited<T>[] | null> {
  if (file) {
    const result: chrome.scripting.InjectionResult<chrome.scripting.Awaited<T>>[] = await chrome.scripting.executeScript<any[], T>({
      target: { tabId, allFrames: true },
      files: [file],
    });
    return result.map((item: chrome.scripting.InjectionResult<chrome.scripting.Awaited<T>>) => item.result).filter((result) => !!result) as chrome.scripting.Awaited<T>[];
  }
  if (func) {
    const result: chrome.scripting.InjectionResult<chrome.scripting.Awaited<T>>[] = await chrome.scripting.executeScript<any[], T>({
      target: { tabId, allFrames: true },
      func: func,
    });
    return result.map((item: chrome.scripting.InjectionResult<chrome.scripting.Awaited<T>>) => item.result).filter((result) => !!result) as chrome.scripting.Awaited<T>[];
  }
  return null;
}

export async function execute_script_in_tab<Resp, Args extends any[] = any[]>(
  tabId: NonNullable<chrome.tabs.Tab['id']>,
  data: { file?: string; func?: TypedFunction<Args, Resp>; args?: Args }
): Promise<chrome.scripting.Awaited<Resp>[] | null> {
  const { file, func, args } = data;
  let injection: chrome.scripting.ScriptInjection<Args, Resp>;
  if (file) {
    injection = { target: { tabId }, files: [file], args };
  } else if (func) {
    injection = { target: { tabId }, func, args };
  } else {
    return null;
  }
  const result: chrome.scripting.InjectionResult<chrome.scripting.Awaited<Resp>>[] = await chrome.scripting.executeScript<Args, Resp>(injection);
  return result.map((item: chrome.scripting.InjectionResult<chrome.scripting.Awaited<Resp>>) => item.result).filter(Boolean);
}

export async function execute_script_in_current_tab<Resp, Args extends any[] = any[]>(data: { file?: string; func?: TypedFunction<Args, Resp>; args?: Args }) {
  const tabId = await get_current_tab_id();
  if (!tabId) return null;
  return execute_script_in_tab<Resp, Args>(tabId, data);
}

export async function wait_for_element<T extends HTMLElement>(selector: string, max_time = 1000, wait_time = 100): Promise<T | null> {
  for (let i = 0; i < max_time / wait_time; i++) {
    let element = document.querySelector<T>(selector);
    if (element) {
      return element;
    } else {
      await wait(wait_time);
    }
  }
  return null;
}

export async function wait_for_elements<T extends HTMLElement>(selector: string, max_time = 1000, wait_time = 100): Promise<NodeListOf<T> | null> {
  for (let i = 0; i < max_time / wait_time; i++) {
    let elements = document.querySelectorAll<T>(selector);
    if (elements && elements.length) {
      return elements;
    } else {
      await wait(wait_time);
    }
  }
  return null;
}

export async function wait_when_element_hide<T extends HTMLElement>(selector: string, max_time = 1000, wait_time = 100): Promise<T | null> {
  let element: T | null = null;
  for (let i = 0; i < max_time / wait_time; i++) {
    element = document.querySelector<T>(selector);
    if (element === null) {
      return null;
    } else {
      await wait(wait_time);
    }
  }
  return element;
}

export async function wait_for_elements_hide<T extends HTMLElement>(selector: string, max_time = 1000, wait_time = 100): Promise<NodeListOf<T> | null> {
  let elements: NodeListOf<T> | null = null;
  for (let i = 0; i < max_time / wait_time; i++) {
    elements = document.querySelectorAll<T>(selector);
    if (elements && !elements.length) {
      return null;
    } else {
      await wait(wait_time);
    }
  }
  return elements;
}

export function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const getOffset_result = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
  return getOffset_result;
}

export function simulateClick(element: HTMLElement) {
  element.dispatchEvent(new Event('mousedown', { bubbles: true }));
  element.dispatchEvent(new Event('click', { bubbles: true }));
  element.dispatchEvent(new Event('mouseup', { bubbles: true }));
}

export function simulateEvent(element: HTMLElement, event: string) {
  element.dispatchEvent(new Event(event, { bubbles: true }));
}

export function close_all_popups() {
  try {
    chrome.windows.getLastFocused((window) => {
      chrome.extension.getViews({ type: 'popup', windowId: window.id }).forEach((windowId) => windowId.close());
    });
  } catch (error) {}
}

export const encode = {
  jwt: sign,
  json: function (obj: object): string {
    return JSON.stringify(obj);
  },
  base64url: function (buffer: Buffer): string {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  },
};

export const decode = {
  jwt: jwtDecode,
  json: function <T>(text: string | null): T | null {
    if (text === null) return null;
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      return null;
    }
  },
  formData: function <T>(data: FormData): T | null {
    try {
      // @ts-ignore
      const obj = Object.fromEntries(data.entries()) as T;
      return obj;
    } catch (e) {
      return null;
    }
  },
  base64url: function (base64url: string) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const binStr = window.atob(base64);
    const bin = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bin[i] = binStr.charCodeAt(i);
    }
    return bin.buffer;
  },
};

export function clone<T>(obj: T): T | null {
  try {
    return JSON.parse(JSON.stringify(obj)) as T;
  } catch (e) {
    return null;
  }
}

/**
 * Converts a camel case string to a human readable string by inserting spaces before capital letters and capitalizing the first letter.
 *
 * @param {string} camelCaseString - The camel case string to be converted.
 * @return {string} The human readable version of the camel case string.
 */
export default function convertCamelCaseToHumanReadable(camelCaseString: string) {
  let spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
  spacedString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
  return spacedString;
}
