// import browser from 'webextension-polyfill';
import { EnumURL } from '@enums/EnumURL';
import config, { isDev } from '@utils/config';
import store, { initializeWrappedStore } from '../app/redux/store';

initializeWrappedStore();

store.subscribe(() => {});

// browser.runtime.onInstalled.addListener(async (details) => {
//   if (details.reason === 'install') {
//     //show the welcome page
//     const url = browser.runtime.getURL(isDev ? 'src/options/options.html#/welcome' : 'options.html#/welcome');
//     await browser.tabs.create({ url });
//   }
// });

export class Background {
  init() {
    this.#handle_installing();
    // this.#handle_uninstalling();
    this.#handle_messages();
  }
  async #open_auth() {
    const storage = await chrome.storage.local.get(['auth_page_was_opened']);
    if (storage.auth_page_was_opened !== true) {
      chrome.storage.local.set({ auth_page_was_opened: true });
      chrome.tabs.create({ url: isDev ? 'src/options/options.html#/auth' : 'options/options.html#/auth', active: true });
    }
  }
  #handle_installing() {
    try {
      chrome.runtime.onInstalled.addListener(async (details) => {
        const tabs = await chrome.tabs.query({ url: 'https://mail.google.com/*' });
        for (let tab of tabs) {
          if (tab.id) {
            chrome.tabs.reload(tab.id);
          }
        }
        switch (details.reason) {
          case 'install': {
            this.#open_auth();
            break;
          }
          case 'update': {
            break;
          }
          default:
            break;
        }
      });
    } catch (error) {
      console.log('🚀 ~ Background ~ #handle_installing ~ error:', error);
    }
  }
  #handle_uninstalling() {
    try {
      chrome.runtime.setUninstallURL(EnumURL.logout.url);
    } catch (error) {
      console.log('🚀 ~ Background ~ #handle_uninstalling ~ error:', error);
    }
  }
  #handle_messages() {
    chrome.runtime.onMessage.addListener(async (message, sender, callback) => {
      switch (message.type) {
        case 'inboxsdk__injectPageWorld': {
          if (chrome.scripting && sender.tab?.id !== undefined && sender.frameId !== undefined) {
            // MV3
            chrome.scripting.executeScript({
              target: { tabId: sender.tab.id, frameIds: [sender.frameId] },
              world: 'MAIN',
              files: ['src/pages/pageWorld/index.js'],
            });
            callback(true);
          } else {
            // MV2 fallback. Tell content script it needs to figure things out.
            callback(false);
          }
          break;
        }
        default:
          break;
      }

      switch (message.name) {
        case 'close_this_tab': {
          if (sender.tab && sender.tab.id) {
            chrome.tabs.remove(sender.tab.id);
          }
          break;
        }
        case 'reload_gmail_tabs': {
          const tabs = await chrome.tabs.query({});
          for (let tab of tabs) {
            if (tab.id && tab.url && tab.url.startsWith('https://mail.google.com/')) {
              chrome.tabs.reload(tab.id);
            }
          }
          break;
        }
        case 'close_extension_auth': {
          const tabs = await chrome.tabs.query({});
          for (let tab of tabs) {
            if (tab.id && tab.url && tab.url.includes(config.EXTENSION_AUTH_URL)) {
              chrome.tabs.remove(tab.id);
            }
          }
          break;
        }
        case 'focus_this_tab': {
          if (sender.tab && sender.tab.id) {
            chrome.tabs.update(sender.tab.id, {
              active: true,
            });
          }
          break;
        }
        case 'get_this_tab_id': {
          callback(sender.tab?.id);
          break;
        }
        case 'disable_popup_on_this_tab': {
          chrome.action.setPopup({
            tabId: sender.tab?.id,
            popup: '',
          });
          break;
        }
        case 'go_to_gmail': {
          const tabs = await chrome.tabs.query({
            url: 'https://mail.google.com/*',
            currentWindow: true,
          });

          if (tabs.length > 0) {
            const id = tabs[0]?.id;
            if (!id) return;
            chrome.tabs.update(id, { active: true });
          } else {
            chrome.tabs.create({ url: 'https://mail.google.com/' });
          }
          break;
        }
        case 'logout_user_from_popup': {
          const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          for (const tab of tabs) {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, { name: 'logout_user_from_bg' });
            }
          }
          break;
        }
        default:
          break;
      }
    });
  }
}

const instance = new Background();
instance.init();
