import { ContentInterface } from '@models/ContentInterface';

export abstract class GmailInterface {
  abstract contentController: ContentInterface;

  abstract replace_logo(): void;
  abstract add_signature(): void;
  abstract update_tab_icon(): void;
  abstract open_settings_panel(): Promise<boolean>;
  abstract close_settings_panel(): Promise<boolean>;
  abstract is_settings_panel_open(): Promise<boolean>;
  abstract change_user_theme_density(): Promise<boolean>;
  abstract change_user_theme_background(): Promise<boolean>;
  abstract change_user_theme_inbox_type(): Promise<boolean>;
  abstract change_user_theme_reading_pane(): Promise<boolean>;
  abstract prevent_change_theme(): void;
  abstract reset_user_theme(): void;
}
