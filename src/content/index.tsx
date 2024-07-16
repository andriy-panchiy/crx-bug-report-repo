import 'construct-style-sheets-polyfill';
import 'webextension-polyfill';

import GmailHelper from '@app/controllers/GmailController';
import Overlay from '@app/pages/overlay/Overlay';
import { proxyStore } from '@app/redux/proxyStore';
import { initialState as authInitialState, updateUser, updateUserSettings, updateUserTheme } from '@app/redux/slices/authSlice';
import { hideWidget, initialState as widgetsInitialState, setState as setWidgetsState, showWidget } from '@app/redux/slices/widgetsSlice';
import type { RootState } from '@app/redux/store';
import CommunityTrees from '@components/widgets/CommunityTrees';
import HowItWorks from '@components/widgets/HowItWorks';
import RightColumnAds from '@components/widgets/RightColumnAds';
import TreeCounter from '@components/widgets/TreeCounter';
import { Store } from '@eduardoac-skimlinks/webext-redux';
import { EnumSelectors } from '@enums/EnumSelectors';
import type { InboxSDK as PlatformImplementation } from '@inboxsdk/core';
import InboxSDK from '@inboxsdk/core';
import { ContentInterface } from '@models/ContentInterface';
import { isDev } from '@utils/config';
import { Constants } from '@utils/Constants';
import { config, cssom, observe, stringify, twind } from '@utils/twind';
import { doInterval } from '@utils/utils';
import { debounce } from 'lodash-es';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

const widgets = { TreeCounter, HowItWorks, CommunityTrees, RightColumnAds, Overlay };

export default class Content implements ContentInterface {
  state: RootState;
  proxyStore: Store<RootState>;
  sdk: PlatformImplementation;
  static gmailController: GmailHelper;

  iframeWidgets: ContentInterface['iframeWidgets'] = {
    TreeCounter: document.createElement('iframe'),
    HowItWorks: document.createElement('iframe'),
    CommunityTrees: document.createElement('iframe'),
    RightColumnAds: document.createElement('iframe'),
  };
  shadowWidgets: ContentInterface['shadowWidgets'] = {
    TreeCounter: document.createElement('div'),
    Overlay: document.createElement('div'),
  };

  constructor({ proxyStore, sdk }: { proxyStore: Store<RootState>; sdk: PlatformImplementation }) {
    this.proxyStore = proxyStore;
    this.sdk = sdk;
    this.state = proxyStore.getState();
    Content.gmailController = new GmailHelper({ contentController: this });
  }

  async init() {
    const { Compose, Conversations, Keyboard, User, Lists, NavMenu, AppMenu, Router, Search, Toolbars, ButterBar, Widgets, Global } = this.sdk;

    this.inject_styles();

    // reset chrome localStorage
    proxyStore.dispatch(setWidgetsState({ key: 'CommunityTrees', state: widgetsInitialState.CommunityTrees }));
    proxyStore.dispatch(setWidgetsState({ key: 'RightColumnAds', state: widgetsInitialState.RightColumnAds }));
    proxyStore.dispatch(setWidgetsState({ key: 'TreeCounter', state: widgetsInitialState.TreeCounter }));
    proxyStore.dispatch(setWidgetsState({ key: 'EthicalBrands', state: widgetsInitialState.EthicalBrands }));

    proxyStore.dispatch(updateUserSettings({ approveChangeTheme: false }));

    const userEmail = User.getEmailAddress();

    if (userEmail && this.state.auth.user.email !== userEmail) {
      this.state.auth.settings.isFirstLoad = true;
      this.state.auth.theme = authInitialState.theme;
      proxyStore.dispatch(updateUserSettings({ isFirstLoad: true }));
      proxyStore.dispatch(updateUserTheme(authInitialState.theme));
    }

    if (this.state.auth.idToken) {
      this.change_user_theme();
    }

    proxyStore.dispatch(updateUser({ email: userEmail }));

    Compose.registerComposeViewHandler(() => {
      Content.gmailController.add_signature();
    });

    Lists.registerThreadRowViewHandler((threadRowView: InboxSDK.ThreadRowView) => {
      const threadView = threadRowView.getElement();
      const nextThreadView = threadView.nextElementSibling;
      const threadViewParent = threadView.parentElement;

      if (threadViewParent?.children) {
        const index = Array.from(threadViewParent.children).indexOf(threadView);

        if (Constants.show_ad_in_list_after.includes(index) && !nextThreadView?.classList.contains('injectedAd')) {
          threadView.after(
            Content.gmailController.get_email_ad({
              author: 'Treecard App',
              title: 'Shop refurbed tech, plant trees!',
              description: 'This ad funds trees',
              href: 'https://www.treecard.org/',
              label: 'Ad',
              className: 'zA',
              timestamp: new Date(),
            })
          );
        }
      }
    });

    doInterval(() => {
      this.state = proxyStore.getState();

      Content.gmailController.replace_logo();
      Content.gmailController.update_tab_icon();

      this.injectShadowWidget({
        searchSelector: EnumSelectors.BODY,
        className: `extension-widget shadow-widget ${this.state.auth.idToken && !this.state.auth.settings.isFirstLoad ? 'hidden' : ''}`,
        insertWere: 'afterbegin',
        componentName: 'Overlay',
        injectLinks: ['/css/widgets.css', '/css/shadow.css'],
      });

      this.injectShadowWidget({
        searchSelector: EnumSelectors.HEADER_SEARCH_INPUT,
        className: 'extension-widget shadow-widget',
        insertWere: 'afterend',
        componentName: 'TreeCounter',
        injectLinks: ['/css/widgets.css', '/css/shadow.css'],
      });

      this.injectIframeWidget({ className: 'extension-widget iframe-widget', searchSelector: EnumSelectors.SIDEBAR, insertWere: 'afterend', componentName: 'CommunityTrees' });
      this.injectIframeWidget({ className: 'extension-widget iframe-widget', searchSelector: EnumSelectors.SIDEBAR, insertWere: 'afterend', componentName: 'HowItWorks' });
      this.injectIframeWidget({ className: 'extension-widget iframe-widget', searchSelector: EnumSelectors.EMAIL_LIST, insertWere: 'afterend', componentName: 'RightColumnAds' });
    }, 300);
  }

  async change_user_theme() {
    if (this.state.auth.settings.isFirstLoad) {
      proxyStore.dispatch(updateUserSettings({ isFirstLoad: false }));
      proxyStore.dispatch(showWidget({ widget: 'Overlay' }));
      await Content.gmailController.reset_user_theme();
    }
    proxyStore.dispatch(hideWidget({ widget: 'Overlay' }));

    Content.gmailController.prevent_change_theme();
  }

  inject_styles() {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    document.documentElement.appendChild(link);
  }

  async injectIframeWidget({
    searchSelector,
    wrapper,
    className,
    events,
    globalEvents,
    insertWere,
    componentName,
  }: {
    searchSelector: EnumSelectors;
    wrapper?: { tagName: string; className?: string; id?: string };
    events?: {
      eventName: keyof HTMLElementEventMap;
      callback: (event: Event) => void;
    }[];
    globalEvents?: {
      eventName: keyof HTMLElementEventMap;
      callback: (event: Event) => void;
    }[];
    className?: string;
    insertWere: InsertPosition;
    componentName: keyof ContentInterface['iframeWidgets'];
  }) {
    const search_input = document.querySelector(searchSelector);
    const isInjected = !!document.getElementById(componentName);
    if (isInjected) {
      if (!this.state.widgets?.[componentName]?.isShown) {
        this.iframeWidgets[componentName].classList.add('hidden');
      } else {
        this.iframeWidgets[componentName].classList.remove('hidden');
      }
    }
    if (!search_input || isInjected) return;

    this.iframeWidgets[componentName].src = chrome.runtime.getURL(isDev ? `/src/options/options.html#/${componentName}` : `options/options.html#/${componentName}`);
    this.iframeWidgets[componentName].id = componentName;
    if (className) this.iframeWidgets[componentName].className = className;

    if (events) {
      for (let event of events) {
        this.iframeWidgets[componentName].addEventListener(event.eventName, event.callback);
      }
    }

    if (globalEvents) {
      for (let globalEvent of globalEvents) {
        document.addEventListener(globalEvent.eventName, globalEvent.callback, true);
        const iframes = document.getElementsByTagName('iframe');
        const iframesArray = Array.from(iframes);
        iframesArray.forEach((frame) => {
          try {
            frame?.contentWindow?.document.addEventListener(globalEvent.eventName, globalEvent.callback, true);
          } catch (error) {}
        });
      }
    }

    if (wrapper) {
      let wrapperElement = document.createElement(wrapper.tagName);
      if (wrapper.className && document.querySelector(`.${wrapper.className}`)) {
        wrapperElement = document.querySelector<HTMLElement>(`.${wrapper.className}`)!;
        wrapperElement.appendChild(this.iframeWidgets[componentName]);
        return;
      }
      if (wrapper.id && document.getElementById(wrapper.id)) {
        wrapperElement = document.getElementById(wrapper.id)!;
        wrapperElement.appendChild(this.iframeWidgets[componentName]);
        return;
      }
      if (wrapper.className) {
        const classList = wrapper.className.split(' ');
        for (let className of classList) {
          wrapperElement.classList.add(className);
        }
      }
      if (wrapper.id) wrapperElement.id = wrapper.id;
      wrapperElement.appendChild(this.iframeWidgets[componentName]);
      search_input.insertAdjacentElement(insertWere, wrapperElement);
    } else {
      search_input.insertAdjacentElement(insertWere, this.iframeWidgets[componentName]);
    }
  }

  injectShadowWidget({
    searchSelector,
    insertWere,
    componentName,
    className,
    injectLinks,
    injectStyles,
  }: {
    searchSelector: EnumSelectors;
    insertWere: InsertPosition;
    componentName: keyof ContentInterface['shadowWidgets'];
    className?: string;
    injectLinks?: string[];
    injectStyles?: string[];
  }) {
    const search_input = document.querySelector(searchSelector);
    const isInjected = !!document.getElementById(componentName);
    if (isInjected) {
      if (!this.state.widgets?.[componentName]?.isShown) {
        this.shadowWidgets[componentName].classList.add('hidden');
      } else {
        this.shadowWidgets[componentName].classList.remove('hidden');
      }
    }
    if (!search_input || isInjected) return;

    this.shadowWidgets[componentName].id = componentName;
    if (className) this.shadowWidgets[componentName].className = className;
    search_input.insertAdjacentElement(insertWere, this.shadowWidgets[componentName]);

    const shadowRoot = this.shadowWidgets[componentName].attachShadow({ mode: 'open' });
    const sheet = cssom(new CSSStyleSheet());

    // shadowRoot.adoptedStyleSheet bug in firefox
    // see: https://bugzilla.mozilla.org/show_bug.cgi?id=1827104
    if (navigator?.userAgent.includes('Firefox')) {
      const style = document.createElement('style');
      const debouncedSyncCss = debounce(() => {
        style.textContent += stringify(sheet.target);
      }, 100);

      const originalSheetInsert = sheet.insert;
      (sheet.insert as typeof originalSheetInsert) = (...params) => {
        originalSheetInsert(...params);
        debouncedSyncCss();
      };
      shadowRoot.appendChild(style);
    } else {
      shadowRoot.adoptedStyleSheets = [sheet.target];
    }

    const tw = twind(config, sheet);
    observe(tw, shadowRoot);

    if (injectLinks) {
      for (let injectStyle of injectLinks) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        if (injectStyle.match(/^(http|https):/)) {
          link.setAttribute('href', injectStyle);
        } else {
          link.setAttribute('href', chrome.runtime.getURL(injectStyle));
        }
        shadowRoot.appendChild(link);
      }
    }

    if (injectStyles) {
      for (let injectStyle of injectStyles) {
        let style = document.createElement('style');
        style.textContent = injectStyle;
        shadowRoot.appendChild(style);
      }
    }

    const shadowWrapper = document.createElement('div');
    shadowWrapper.id = 'root';
    shadowWrapper.style.display = 'contents';
    shadowRoot.appendChild(shadowWrapper);

    createRoot(shadowWrapper).render(
      <React.StrictMode>
        {/* @ts-ignore */}
        <Provider store={proxyStore}>
          <>{React.createElement(widgets[componentName])}</>
        </Provider>
      </React.StrictMode>
    );
  }
}

proxyStore.ready().then(() => {
  InboxSDK.load(2, 'sdk_wildhero_a34e1b4214').then(async (sdk: PlatformImplementation) => {
    const content = new Content({ proxyStore, sdk });

    window.sdk = sdk;
    window['content'] = content;

    content.init();
  });
});
