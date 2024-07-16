import { updateUserSettings, updateUserTheme } from '@app/redux/slices/authSlice';
import { EnumSelectors } from '@enums/EnumSelectors';
import { ContentInterface } from '@models/ContentInterface';
import { waitForPromises, wait_for_element, wait_when_element_hide } from '@utils/utils';

export default class GmailHelper {
  static contentController: ContentInterface;

  constructor({ contentController }: { contentController: ContentInterface }) {
    GmailHelper.contentController = contentController;
  }

  get_email_ad({
    author,
    title,
    description,
    href,
    label,
    timestamp,
    className,
  }: {
    author: string;
    title: string;
    description: string;
    href: string;
    label?: string;
    timestamp: Date;
    className?: string;
  }) {
    const customRow = document.createElement('tr');
    customRow.className = ['injectedAd', className].join(' ');
    customRow.style.backgroundColor = '#F0F5FC';
    customRow.onclick = (e) => {
      const target = e.target as HTMLElement;
      const tooltip = target.closest('[data-tooltip="Delete"]') as HTMLElement;
      if (tooltip) {
        e.stopPropagation();
        customRow.remove();

        return;
      }

      window.open(href, '_blank');
    };
    customRow.onmouseenter = () => {
      customRow.classList.add('aqw');
    };
    customRow.onmouseleave = () => {
      customRow.classList.remove('aqw');
    };
    customRow.innerHTML = `
      <td class="PF xY"></td>
      <td class="oZ-x3 xY" style="" data-tooltip="Select">
        <div class="oZ-jc T-Jo J-J5-Ji " role="checkbox" dir="ltr" aria-checked="false" tabindex="-1">
          <div class="T-Jo-auh"></div>
        </div>
      </td>
      <td class="apU xY">
        <span class="aXw T-KT" aria-label="Not starred" role="button" data-tooltip="Not starred">
          <img class="T-KT-JX" src="images/cleardot.gif" alt="Not starred">
        </span>
      </td>
      <td class="WA xY">
        <div class="pG" data-tooltip-contained="true" data-tooltip-align="b,l" data-tooltip-delay="1500" aria-label="Not important" role="switch" aria-checked="false" data-is-important="false">
          <div class="T-ays-a45">
            <span class="aol">Click to teach Chromane Mail this conversation is important.</span>
          </div>
          <div class="pH-A7 a9q"></div>
          <div class="bnj"></div>
        </div>
      </td>
      <td class="yX xY " role="gridcell" tabindex="-1">
        <div class="yW" style="-webkit-flex-grow: 0; flex-grow: 0; -webkit-box-ordinal-group: 0; -webkit-order: 0; order: 0;">
          <span class="bA4">
            <span translate="no" class="yP">${author}</span>
          </span>
        </div>
        ${
          label
            ? `<div class="ar" style="margin-left: 6px;">
                    <div class="at" data-tooltip="${label}" style="background-color: #E9EAEA; border-color: #E9EAEA; color: #80868B;">
                      <div class="au" style="border-color: #E9EAEA;">
                        <div class="av" style="max-width: 90px;">${label}</div>
                      </div>
                    </div>
                  </div>`
            : ''
        }
      </td>
      <td tabindex="-1" class="xY a4W" role="gridcell">
        <div class="xS" role="link">
          <div class="xT">
            <div class="y6">
              <span class="bog">
                <span>${title}</span>
              </span>
            </div>
            <span class="y2">
              <span class="Zt">&nbsp;-&nbsp;</span>
              <span>${description}</span>
            </span>
          </div>
        </div>
      </td>
      <td class="byZ xY" role="gridcell" tabindex="-1"></td>
      <td class="yf xY ">&nbsp;</td>
      <td class="xW xY" role="gridcell" tabindex="-1">
        <span title="${timestamp.toLocaleString()}" aria-label="${timestamp.toLocaleString()}">
          <span>${timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </span>
      </td>
      <td class="bq4 xY">
        <ul class="bqY" role="toolbar">
          <li class="bqX bru" data-tooltip="Delete"></li>
        </ul>
      </td>
      <td class="xY"></td>`;

    return customRow;
  }

  replace_logo() {
    try {
      const gmail_logo_element = document.querySelector<HTMLImageElement>(`img[src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png']`);
      const wildhero_logo = chrome.runtime.getURL('/images/logo-wide.svg');
      if (!gmail_logo_element?.src || gmail_logo_element.src === wildhero_logo) return;
      gmail_logo_element.removeAttribute('srcset');
      gmail_logo_element.src = wildhero_logo;
      gmail_logo_element.style.width = '122px';
    } catch (error) {}
  }

  add_signature() {
    let compose_windows = document.querySelectorAll<HTMLElement>(EnumSelectors.COMPOSE_WINDOW);
    for (let compose_window of compose_windows) {
      if (compose_window.dataset.wildhero_extended !== '1') {
        let wildhero_link = compose_window.querySelector(`a[href^='https://mail.wildhero.com/']`);
        if (wildhero_link === null) {
          compose_window.dataset.wildhero_extended = '1';
          let response = "<br/><br/>Sent via <a href='https://mail.wildhero.com/'>Wildhero</a> - email that plants trees.";
          const gmail_contenteditable_original = compose_window.querySelector(EnumSelectors.gmail_contenteditable_original);
          const gmail_contenteditable_quote = compose_window.querySelector(EnumSelectors.gmail_contenteditable_quote);
          const gmail_contenteditable = compose_window.querySelector(EnumSelectors.gmail_contenteditable);
          if (gmail_contenteditable_original) {
            gmail_contenteditable_original.innerHTML += response;
          } else if (gmail_contenteditable_quote && gmail_contenteditable) {
            gmail_contenteditable.innerHTML += `<div>${response}</div><br>` + gmail_contenteditable_quote.outerHTML;
          } else if (gmail_contenteditable) {
            gmail_contenteditable.innerHTML += `<div>${response}</div>`;
          }
        }
      }
    }
  }

  update_tab_icon() {
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    const white_icon_url = chrome.runtime.getURL('/images/extension_32.png');
    if (!link?.href || link.href === white_icon_url) return;
    link.href = white_icon_url;
  }

  async open_settings_panel() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const settings_button = await wait_for_element<HTMLElement>(EnumSelectors.SETTINGS_BUTTON);
      if (settings_button) {
        settings_button.click();
      }
      const settings_side_panel = await wait_for_element(EnumSelectors.SETTINGS_SIDE_PANEL, 3000);
      resolve(settings_side_panel !== null);
    });
  }

  async close_settings_panel() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const settings_button_close = await wait_for_element<HTMLElement>(EnumSelectors.SETTINGS_BUTTON_CLOSE);
      if (settings_button_close) {
        settings_button_close.click();
      }
      const settings_side_panel = await wait_when_element_hide(EnumSelectors.SETTINGS_SIDE_PANEL, 3000);
      resolve(settings_side_panel === null);
    });
  }

  async is_settings_panel_open() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const settings_side_panel = await wait_for_element(EnumSelectors.SETTINGS_SIDE_PANEL);
      resolve(settings_side_panel !== null);
    });
  }

  async change_user_theme_density() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const density_default_not_active = document.querySelector<HTMLElement>(EnumSelectors.DENSITY_DEFAULT_NOT_ACTIVE);
      if (density_default_not_active) {
        density_default_not_active.click();
      }
      const density_default_active = await wait_for_element(EnumSelectors.DENSITY_DEFAULT_ACTIVE, 300);
      if (density_default_active) {
        GmailHelper.contentController.proxyStore.dispatch(updateUserTheme({ density: 'Default' }));
      }
      resolve(density_default_active !== null);
    });
  }

  async change_user_theme_background() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const theme_backgrounds_default_not_active = document.querySelector<HTMLElement>(EnumSelectors.THEME_BACKGROUNDS_DEFAULT_NOT_ACTIVE);
      if (theme_backgrounds_default_not_active) {
        theme_backgrounds_default_not_active.click();
      }
      const theme_backgrounds_default_active = await wait_for_element(EnumSelectors.THEME_BACKGROUNDS_DEFAULT_ACTIVE, 300);
      if (theme_backgrounds_default_active) {
        GmailHelper.contentController.proxyStore.dispatch(updateUserTheme({ background: 'Default' }));
      }
      resolve(theme_backgrounds_default_active !== null);
    });
  }

  async change_user_theme_inbox_type() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const theme_inbox_type_default_not_active = document.querySelector<HTMLElement>(EnumSelectors.INBOX_TYPE_DEFAULT_NOT_ACTIVE);
      if (theme_inbox_type_default_not_active) {
        theme_inbox_type_default_not_active.click();
      }
      const theme_inbox_type_default_active = await wait_for_element(EnumSelectors.INBOX_TYPE_DEFAULT_ACTIVE, 300);
      if (theme_inbox_type_default_active) {
        GmailHelper.contentController.proxyStore.dispatch(updateUserTheme({ inboxType: 'Default' }));
      }
      resolve(theme_inbox_type_default_active !== null);
    });
  }

  async change_user_theme_reading_pane() {
    return new Promise(async (resolve: (value: boolean) => void) => {
      const theme_reading_pane_default_not_active = document.querySelector<HTMLElement>(EnumSelectors.READING_PANE_LABEL);
      if (theme_reading_pane_default_not_active) {
        theme_reading_pane_default_not_active.click();
      }
      const theme_reading_pane_default_active = await wait_for_element(EnumSelectors.READING_PANE_DEFAULT_ACTIVE, 300);
      if (theme_reading_pane_default_active) {
        GmailHelper.contentController.proxyStore.dispatch(updateUserTheme({ readingPane: 'No split' }));
      }
      resolve(theme_reading_pane_default_active !== null);
    });
  }

  async prevent_change_theme() {
    const settings_side_panel_parent = await wait_for_element<HTMLElement>(EnumSelectors.SETTINGS_SIDE_PANEL_PARENT);
    if (settings_side_panel_parent) {
      settings_side_panel_parent.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        const settings_side_panel_prevent_element = target.closest<HTMLElement>(EnumSelectors.SETTINGS_SIDE_PANEL_PREVENT_ELEMENTS);
        if (settings_side_panel_prevent_element && !GmailHelper.contentController.state.auth.settings.approveChangeTheme) {
          e.preventDefault();
          e.stopPropagation();

          const element = document.createElement('div');
          element.textContent = 'Wildhero is not optimised to work with other themes.';
          element.style.width = '274px';

          window.sdk?.Widgets.showModalView({
            el: element,
            title: 'Are you sure?',
            buttons: [
              {
                text: 'Go back',
                type: 'PRIMARY_ACTION',
                onClick: function (event) {
                  event.modalView.close();
                },
              },
              {
                text: 'Change theme',
                type: 'SECONDARY_ACTION',
                onClick: function (event) {
                  event.modalView.close();
                  GmailHelper.contentController.proxyStore.dispatch(updateUserSettings({ approveChangeTheme: true }));
                  settings_side_panel_prevent_element.click();
                },
              },
            ],
          });
        } else {
          GmailHelper.contentController.proxyStore.dispatch(updateUserSettings({ approveChangeTheme: false }));
        }
      });
    }
  }

  async reset_user_theme() {
    const isSettingsPanelsOpen = await this.open_settings_panel();

    if (isSettingsPanelsOpen) {
      const promise1 = this.change_user_theme_density();
      const promise2 = this.change_user_theme_background();
      const promise3 = this.change_user_theme_inbox_type();
      const promise4 = this.change_user_theme_reading_pane();

      await waitForPromises([promise1, promise2, promise3, promise4], 3000);
      await this.close_settings_panel();
    }
  }
}
