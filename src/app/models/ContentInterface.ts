import type { RootState } from '@app/redux/store';
import { Store } from '@eduardoac-skimlinks/webext-redux';
import { EnumSelectors } from '@enums/EnumSelectors';
import { GmailInterface } from '@models/GmailInterface';

export abstract class ContentInterface {
  abstract state: RootState;
  abstract proxyStore: Store<RootState>;
  static gmailController: GmailInterface;

  abstract iframeWidgets: {
    TreeCounter: HTMLIFrameElement;
    HowItWorks: HTMLIFrameElement;
    CommunityTrees: HTMLIFrameElement;
    RightColumnAds: HTMLIFrameElement;
  };
  abstract shadowWidgets: {
    TreeCounter: HTMLDivElement;
    Overlay: HTMLDivElement;
  };
  abstract init(): void;
  abstract change_user_theme(): void;
  abstract inject_styles(): void;
  abstract injectIframeWidget({
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
  }): void;
  abstract injectShadowWidget({
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
  }): void;
}
