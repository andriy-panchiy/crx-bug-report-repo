/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  error: string;
  message?: string;
}

export interface CreateUserRequest {
  idToken?: string;
  serverAuthCode: string;
  appVersion?: string;
  deviceTokens?: string[];
}

export interface CreateWebUserRequest {
  refreshToken: string;
}

export interface PatchUserRequest {
  appVersion?: string;
  deviceTokens?: string[];
  preferredContentSizeCategory?: string;
}

export interface PatchUserWebRequest {
  deviceTokens?: string[];
}

export interface AddEmailAccountRequest {
  idToken: string;
  serverAuthCode: string;
}

export interface AddWebEmailAccountRequest {
  refreshToken: string;
  idToken: string;
}

export interface UserImpactCarbon {
  /** @format float */
  removed: number;
}

export interface UserImpactTrees {
  planted?: UserImpactTreesPlanted;
  progress?: UserImpactTreesProgress;
  week?: UserImpactTreesPlantedThisWeek;
}

export interface UserImpactTreesPlantedThisWeek {
  /** @format double */
  sunday: number;
  /** @format double */
  monday: number;
  /** @format double */
  tuesday: number;
  /** @format double */
  wednesday: number;
  /** @format double */
  thursday: number;
  /** @format double */
  friday: number;
  /** @format double */
  saturday: number;
}

export interface UserImpactTreesProgress {
  current: number;
  needed: number;
}

export interface UserImpactTreesPlanted {
  integer: number;
  decimal: number;
  displayAmount: string;
}

export interface UserImpact {
  carbon: UserImpactCarbon;
  trees: UserImpactTrees;
}

export type GenericEventPayload = Record<string, any>;

export interface AmountEventPayload {
  amount: number;
  [key: string]: any;
}

export enum EventType {
  AppAnalytics = 'app_analytics',
  WebAnalytics = 'web_analytics',
  ElmEvent = 'elm_event',
  ExtensionAnalytics = 'extension_analytics',
}

export type EventName = UserEventName | AppAnalyticsEventName | string;

export enum AppAnalyticsEventName {
  EmailRenderedEvent = 'email_rendered_event',
  InboxUpdatedEvent = 'inbox_updated_event',
  AttachmentOpenedEvent = 'attachment_opened_event',
  AccountSwitchedEvent = 'account_switched_event',
}

export enum UserEventName {
  AppOpenEvent = 'app_open_event',
  PageOpenEvent = 'page_open_event',
  EmailClientSetupEvent = 'email_client_setup_event',
  OnboardingEmailSentEvent = 'onboarding_email_sent_event',
  FirstRealEmailSentEvent = 'first_real_email_sent_event',
  FirstCleanupEvent = 'first_cleanup_event',
  CleanupEvent = 'cleanup_event',
  EmailOpenedEvent = 'email_opened_event',
  EmailReceivedEvent = 'email_received_event',
  EmailSentEvent = 'email_sent_event',
  EmailDeleteEvent = 'email_delete_event',
  EmailStarredEvent = 'email_starred_event',
  ScreenLoadedEvent = 'screen_loaded_event',
  ClickEvent = 'click_event',
  FailedTokenRefresh = 'failed_token_refresh',
}

export interface CreateEvent {
  name: EventName;
  type: EventType;
  value?: string;
  payload?: AmountEventPayload | GenericEventPayload;
}

export interface Subscription {
  /** @format uuid */
  id: string;
  /** @format uuid */
  email_account_id: string;
  sender_name: string;
  /** @format email */
  sender_email: string;
  /** @format float */
  open_rate: number;
  num_emails: number;
  /** @format float */
  carbon_removed: number;
  kept?: boolean;
}

export interface SubscriptionResponse {
  subscriptions: Subscription[];
  loading_status?: LoadingState;
  /** @format int */
  next_page?: number;
}

export interface LoadingState {
  synced_count: number;
  synced_left: number;
  time_seconds_left: number;
  completed: boolean;
}

export interface SubscriptionStatus {
  emailsDeleted: number;
  totalEmails: number;
  deletionComplete: boolean;
}

export interface UserTreesAndPlantingProjectsResponse {
  trees: PlantedTree[];
  plantingProjects: PlantingProject[];
}

export interface TreesPlantedResponse {
  /** @format int64 */
  count: number;
}

export interface ImpactStatsResponse {
  /** @format int64 */
  carbonSequesteredPounds: number;
  /** @format int64 */
  countriesSupportedCount: number;
  /** @format int64 */
  countryPartnersCount: number;
  /** @format double */
  protectedAcres: number;
  /** @format int64 */
  treePlantersSupportedCount: number;
  /** @format int64 */
  treesPlantedCount: number;
}

export interface Coordinates {
  /** @format double */
  latitude: number;
  /** @format double */
  longitude: number;
}

export interface PlantingImage {
  coordinates: Coordinates;
  title: string;
  /** @format date-time */
  updated_at: string;
  url: string;
}

export interface PlantedTree {
  /** @format uuid */
  id: string;
  friendlyID: string;
  treeType: string;
  plantedBy: string;
  currentStatus: string;
  statusChangeTimeline: StatusChangeTimeline;
  satelliteImage: string;
  /** @format uuid */
  plantingProjectId: string;
  isCelebrated: boolean;
  rarity: TreeRarity;
  splitInitials?: string[];
  /** @format double */
  percentageOwned: number;
}

export enum TreeRarity {
  Normal = 'normal',
  Special = 'special',
}

export interface StatusChangeTimeline {
  /** @format date-time */
  created?: string;
  /** @format date-time */
  planted?: string;
  /** @format date-time */
  verified?: string;
  /** @format date-time */
  photo?: string;
}

export interface PlantingProject {
  coordinates: Coordinates;
  country: string;
  geofence: number[][][][];
  /** @format uuid */
  id: string;
  region: string;
  site: string;
  /** @format double */
  treesPlanted: number;
  organization?: string;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
  tags?: PlantingProjectTags[];
  animalsProtected?: PlantingProjectAnimalsProtected[];
  media?: PlantingProjectMedia[];
  latestVideo?: PlantingProjectMedia;
  order: number;
}

export enum PlantingProjectTags {
  Biodiversity = 'biodiversity',
  Food = 'food',
  CleanWater = 'clean water',
  Livelihood = 'livelihood',
}

export interface PlantingProjectAnimalsProtected {
  image: string;
  name: string;
  status: string;
}

export interface PlantingProjectMedia {
  /** @format uuid */
  id: string;
  type: PlantingProjectMediaType;
  url: string;
  title: string;
  source: string;
  thumbnail: string;
  previewUrl?: string;
  tags?: PlantingProjectMediaTags[];
  description?: string;
  /** @format date-time */
  takenAt: string;
  duration?: number;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export enum PlantingProjectMediaType {
  Image = 'image',
  Video = 'video',
}

export enum PlantingProjectMediaTags {
  PlantingActivity = 'planting_activity',
  AnimalSighting = 'animal_sighting',
  Timelapse = 'timelapse',
  Sunset = 'sunset',
  Sunrise = 'sunrise',
}

export type ImpactPlantingProject = PlantingProject & {
  images: PlantingImage[];
  /** @format double */
  userTreesPlanted: number;
  /** @format int64 */
  planters: number;
  plantingLead: string;
  /** @format int64 */
  verificationLevel: number;
  /** @format date-time */
  lastSession?: string;
};

export interface PlantingPartner {
  /** @format uuid */
  id: string;
  partnerLogo: string;
  partnerName: string;
  plantingProjects: ImpactPlantingProject[];
  /** @format double */
  co2Reduction?: number;
  /** @format double */
  areaPlanted?: number;
  totalEmployees?: number;
}

export interface Evidence {
  dateOfFieldReport: string;
  typeOfSession: string;
  images: string[];
}

export interface ImagesAndPagination {
  images: PlantingImage[];
  hasNext: boolean;
  nextPageToken: string;
}

export interface UpdateTreeRequest {
  /** mark the tree as celebrated (true) */
  isCelebrated: boolean;
}

export interface UserResponse {
  /** @format uuid */
  id: string;
  primaryEmail: string;
  emailAccounts: UserResponseEmailAccount[];
  abTestingGroups: string[];
  settings: UserSettingsResponse;
  activeEmailAccount: UserResponseEmailAccount;
}

export interface UserResponseEmailAccount {
  /** @format uuid */
  id: string;
  emailAddress: string;
  displayName: string;
  profilePicture?: string;
  status: UserResponseEmailAccountStatus;
}

export enum UserResponseEmailAccountStatus {
  Unknown = 'unknown',
  Authenticated = 'authenticated',
  Invalid = 'invalid',
  Deleted = 'deleted',
}

export interface UserSettingsResponse {
  swipe_actions: UserSettingSwipeAction;
  web_appearance: UserSettingAppearance;
  app_appearance: UserSettingAppearance;
  web_theme: UserSettingTheme;
  app_theme: UserSettingTheme;
}

export interface UserSettingAppearance {
  appearance: UserSettingAppearanceValue;
}

export interface UserSettingTheme {
  theme: UserSettingThemeValue;
}

export interface UserSettingSwipeAction {
  left: UserSettingSwipeActionValue;
  right: UserSettingSwipeActionValue;
}

export type UserSettingSwipeActionValue = string;

export enum UserSettingAppearanceValue {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

export enum UserSettingThemeValue {
  Default = 'default',
  Apple = 'apple',
  Google = 'google',
}

export type UserSetting = UserSettingSwipeAction | UserSettingAppearance | UserSettingTheme;

export enum UserSettingType {
  SwipeActions = 'swipe_actions',
  WebAppearance = 'web_appearance',
  AppAppearance = 'app_appearance',
  WebTheme = 'web_theme',
  AppTheme = 'app_theme',
}

export interface UpdateSettingsRequest {
  name: UserSettingType;
  setting: UserSetting;
}

export interface FeatureFlagsResponse {
  testFeatureFlag: FeatureFlag;
}

export interface EmailSettingsResponse {
  show_in_all_mail: EmailSettingBoolean;
  inbox_view_app: EmailSettingInboxView;
  inbox_view_web: EmailSettingInboxView;
  notifications_app: EmailSettingNotifications;
  notifications_web: EmailSettingNotifications;
  split_inbox_app?: EmailSettingSplitInbox;
  split_inbox_web?: EmailSettingSplitInbox;
  show_important_marker_app: EmailSettingBoolean;
  show_important_marker_web: EmailSettingBoolean;
  signature?: EmailSettingSignature;
  inbox_customization: EmailInboxCustomization;
}

export type EmailSetting = EmailSettingBoolean | EmailSettingInboxView | EmailSettingNotifications | EmailSettingSplitInbox | EmailSettingSignature | EmailInboxCustomization;

export enum EmailSettingType {
  ShowInAllMail = 'show_in_all_mail',
  InboxViewApp = 'inbox_view_app',
  InboxViewWeb = 'inbox_view_web',
  NotificationsApp = 'notifications_app',
  NotificationsWeb = 'notifications_web',
  SplitInboxApp = 'split_inbox_app',
  SplitInboxWeb = 'split_inbox_web',
  ShowImportantMarkerApp = 'show_important_marker_app',
  ShowImportantMarkerWeb = 'show_important_marker_web',
  Signature = 'signature',
  InboxCustomization = 'inbox_customization',
}

export interface UpdateEmailSettingsRequest {
  name: EmailSettingType;
  setting: EmailSetting;
}

export interface EmailSettingBoolean {
  enabled: boolean;
}

export interface EmailSettingSignature {
  enabled: boolean;
  signature: string;
}

export interface EmailInboxCustomization {
  folders: EmailInboxCustomizationFolder[];
}

export interface EmailInboxCustomizationFolder {
  label: string;
  order: number;
  enabled: boolean;
}

export interface EmailSettingInboxView {
  view: InboxView;
}

export interface EmailSettingNotifications {
  setting: AccountNotificationSetting;
}

export interface EmailSettingSplitInbox {
  categories: EmailSettingSplitInboxCategory[];
}

export enum EmailSettingSplitInboxCategory {
  Promotions = 'promotions',
  Updates = 'updates',
  Social = 'social',
  Forums = 'forums',
}

export enum InboxView {
  Default = 'default',
  ImportantFirst = 'important_first',
  UnreadFirst = 'unread_first',
  StarredFirst = 'starred_first',
  PriorityInbox = 'priority_inbox',
  MultipleInboxes = 'multiple_inboxes',
}

export enum AccountNotificationSetting {
  AllNewEmails = 'all_new_emails',
  HighPriorityOnly = 'high_priority_only',
  ImportantOnly = 'important_only',
  PrimaryOnly = 'primary_only',
  None = 'none',
}

export interface FeatureFlag {
  name: FeatureFlagName;
  enabled: boolean;
}

export enum FeatureFlagName {
  OutlookEnabled = 'outlook_enabled',
  ImpactCenterV2 = 'impact_center_v2',
  EmailCleanerV2 = 'email_cleaner_v2',
  InboxCustomization = 'inbox_customization',
}

export enum HistoryType {
  MessageAdded = 'messageAdded',
  MessageDeleted = 'messageDeleted',
}

export interface EmailLabelColor {
  textColor: string;
  backgroundColor: string;
}

export interface EmailLabelVisibility {
  message: EmailLabelVisibilityMessage;
  label: EmailLabelVisibilityLabel;
}

export enum EmailLabelType {
  System = 'system',
  User = 'user',
}

export enum EmailLabelVisibilityLabel {
  Show = 'show',
  Unread = 'unread',
  Hide = 'hide',
}

export enum EmailLabelVisibilityMessage {
  Show = 'show',
  Hide = 'hide',
}

export enum EmailMessageFormat {
  Minimal = 'minimal',
  InboxView = 'inboxView',
  Full = 'full',
  Raw = 'raw',
  Metadata = 'metadata',
  Flattened = 'flattened',
}

export enum ThreadFormat {
  Full = 'full',
  QuickView = 'quickView',
}

export enum EmailHistoryType {
  MessageAdded = 'messageAdded',
  MessageDeleted = 'messageDeleted',
  LabelAdded = 'labelAdded',
  LabelRemoved = 'labelRemoved',
}

export interface EmailLabelStats {
  messagesTotal: number;
  messagesUnread: number;
  threadsTotal: number;
  threadsUnread: number;
}

export interface EmailLabel {
  id: string;
  name: string;
  type: EmailLabelType;
  color?: EmailLabelColor;
  visibility?: EmailLabelVisibility;
  stats?: EmailLabelStats;
}

export interface EmailThread {
  id: string;
  /** @format uuid */
  accountId: string;
  snippet?: string;
  historyId: string;
  messages: EmailMessage[];
  calendarEvent?: CalendarEvent;
  labelIds?: string[];
}

export interface EmailDraftMessage {
  id?: string;
  /** @format uuid */
  accountId?: string;
  message?: EmailMessage;
}

export interface EmailMessage {
  id: string;
  /** @format uuid */
  accountId: string;
  threadId?: string;
  draftId?: string;
  labelIds?: string[];
  snippet?: string;
  historyId?: string;
  sizeEstimate?: number;
  internalDate?: string;
  raw?: string;
  inboxMetadata?: EmailInboxMetadata;
  payload?: EmailMessagePart;
  thumbnails?: EmailMessageAttachmentThumbnail[];
  calendarEvent?: CalendarEvent;
  contactPhotoUrl?: string;
  headers?: Record<string, string[]>;
  emailBodyHtml?: string;
  emailBodyText?: string;
}

export interface EmailInboxMetadata {
  to: string;
  parsedTo: ParsedEmailAddress[];
  from: string;
  parsedFrom: ParsedEmailAddress;
  cc: string;
  parsedCc: ParsedEmailAddress[];
  bcc: string;
  parsedBcc: ParsedEmailAddress[];
  replyTo: string;
  parsedReplyTo: ParsedEmailAddress;
  subject: string;
  inReplyTo: string;
  /** @format date-time */
  date: string;
  attachments?: EmailInboxMetadataAttachment[];
}

export interface EmailInboxMetadataAttachment {
  id: string;
  filename: string;
  contentType: string;
  inline: boolean;
}

export interface ParsedEmailAddress {
  name: string;
  email: string;
}

export interface EmailMessageIDAndLabels {
  messageId: string;
  labelIds: string[];
}

export interface EmailMessagePart {
  partId: string;
  mimeType: string;
  filename?: string;
  headers: EmailMessagePartHeaders[];
  body: EmailMessagePartBody;
  parts?: EmailMessagePart[];
}

export interface EmailMessagePartHeaders {
  name: string;
  value: string;
}

export interface EmailMessagePartBody {
  size: number;
  data?: string;
  attachmentId?: string;
  attachmentUrl?: string;
}

export interface EmailMessageUpdateRequest {
  addLabelIds?: string[];
  removeLabelIds?: string[];
}

export interface EmailMessageBulkUpdateRequest {
  ids: string[];
  addLabelIds?: string[];
  removeLabelIds?: string[];
}

export type SubmitOfflineChangesRequest = OfflineChangesRequest[];

export interface OfflineChangesRequest {
  messageId: string;
  labels: string[];
  /** @format date-time */
  timestamp: string;
}

export interface GetOfflineChangesStatusResponse {
  status: 'in_progress' | 'completed';
  failedChanges: FailedOfflineChange[];
}

export interface FailedOfflineChange {
  messageId: string;
  oldLabels: string[];
  newLabels: string[];
  /** @format date-time */
  timestamp: string;
}

export interface EmailMessageBulkIdRequest {
  ids: string[];
}

export interface EmailLabelListResponse {
  labels: EmailLabel[];
}

export interface EmailMessageListResponse {
  messages: EmailMessage[];
  nextPageToken: string;
  resultSizeEstimate: number;
}

export interface EmailHistoryListResponse {
  histories: EmailHistory[];
  nextPageToken: string;
  historyId: string;
}

export interface EmailHistory {
  id: string;
  messagesAdded: EmailMessage[];
  messagesDeleted: EmailMessage[];
  labelsAdded: EmailMessageIDAndLabels[];
  labelsRemoved: EmailMessageIDAndLabels[];
  labelsUpdated: EmailMessageIDAndLabels[];
}

export interface EmailDraftMessageListResponse {
  messages: EmailDraftMessage[];
  nextPageToken: string;
  resultSizeEstimate: number;
}

export interface EmailThreadsListResponse {
  messages: EmailThread[];
  nextPageToken: string;
  resultSizeEstimate: number;
}

export interface EmailSearchThreadsListResponse {
  contacts: EmailContact[];
  threads: EmailThread[];
  nextPageToken: string;
  resultSizeEstimate: number;
}

export enum EmailUploadType {
  Multipart = 'multipart',
}

export interface PeopleSource {
  type: string;
  id: string;
}

export interface PeopleMetadata {
  primary: boolean;
  source: PeopleSource;
  sourcePrimary: boolean;
}

export interface EmailContactName {
  displayName: string;
  displayNameLastFirst: string;
  familyName: string;
  givenName: string;
  metadata: PeopleMetadata;
  unstructuredName: string;
}

export interface EmailContactEmailAddress {
  value: string;
  metadata: PeopleMetadata;
}

export interface EmailContactPhoto {
  url: string;
}

export interface EmailContact {
  resourceName: string;
  etag: string;
  names?: EmailContactName[];
  emailAddresses?: EmailContactEmailAddress[];
  photos?: EmailContactPhoto[];
}

export interface EmailSearchResponse {
  messages: EmailMessage[];
  contacts: EmailContact[];
}

export interface LabelSearchResponse {
  labels: EmailLabel[];
}

export interface EmailMessageAttachmentThumbnail {
  attachmentId?: string;
  originalFilename: string;
  originalContentType: string;
  /** @format byte */
  thumbnail: string;
}

export interface ContactSearchResponse {
  contacts: EmailContact[];
}

export interface ContactListResponse {
  contacts: EmailContact[];
  nextPageToken?: string;
  nextSyncToken?: string;
  totalSize?: number;
}

export enum EmailUnsubscribeOption {
  Unsubscribe = 'unsubscribe',
  UnsubscribeMarkRead = 'unsubscribe_mark_read',
  UnsubscribeTrash = 'unsubscribe_trash',
}

export interface CalendarEventPerson {
  email: string;
  displayName?: string;
}

export interface CalendarEventAttendee {
  email: string;
  displayName?: string;
  responseStatus: CalendarEventResponseStatus;
  self?: boolean;
}

export enum CalendarEventResponseStatus {
  NeedsAction = 'needsAction',
  Declined = 'declined',
  Tentative = 'tentative',
  Accepted = 'accepted',
}

export enum CalendarEventStatus {
  Confirmed = 'confirmed',
  Tentative = 'tentative',
  Cancelled = 'cancelled',
}

export interface CalendarEvent {
  id: string;
  uid: string;
  calendarId?: string;
  status: CalendarEventStatus;
  /** @format date-time */
  created: string;
  /** @format date-time */
  updated?: string;
  summary: string;
  description?: string;
  conferenceLink?: string;
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
  organizer: CalendarEventPerson;
  attendees: CalendarEventAttendee[];
}

export interface CalendarEventListResponse {
  events: CalendarEvent[];
  nextPageToken: string;
}

export interface PreAuthAbGroupsResponse {
  preAuthAbGroups: PreAuthGroupName[];
}

export enum PreAuthGroupName {
  GooglePermissionPrompt = 'google_permission_prompt',
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams = ((typeof secure === 'boolean' ? secure : this.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Elm OpenAPI
 * @version 0.0.1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  metrics = {
    /**
     * No description
     *
     * @tags metrics
     * @name CreateMetricsEvent
     * @summary create metric event
     * @request POST:/metrics/event
     * @secure
     */
    createMetricsEvent: (data: CreateEvent, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/metrics/event`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  jwt = {
    /**
     * No description
     *
     * @tags user
     * @name GetUser
     * @summary Get User
     * @request GET:/jwt/user
     * @secure
     */
    getUser: (params: RequestParams = {}) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name CreateUser
     * @summary create elm user
     * @request POST:/jwt/user
     * @secure
     */
    createUser: (data: CreateUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name PatchUser
     * @summary patch elm user
     * @request PATCH:/jwt/user
     * @secure
     */
    patchUser: (data: PatchUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetCurrentUserAccount
     * @summary Get Current User
     * @request GET:/jwt/user/currentAccount
     * @secure
     */
    getCurrentUserAccount: (params: RequestParams = {}) =>
      this.request<UserResponseEmailAccount, Error>({
        path: `/jwt/user/currentAccount`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name CreateWebUser
     * @summary create elm web user
     * @request POST:/jwt/user/web
     * @secure
     */
    createWebUser: (data: CreateWebUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user/web`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name PatchWebUser
     * @summary patch elm web user
     * @request PATCH:/jwt/user/web
     * @secure
     */
    patchWebUser: (data: PatchUserWebRequest, params: RequestParams = {}) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user/web`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name AddEmailAccount
     * @summary add a new email account for the user
     * @request POST:/jwt/user/addEmailAccount
     * @secure
     */
    addEmailAccount: (
      data: AddEmailAccountRequest,
      query?: {
        /** a boolean flag indicating that you would like the user response returned */
        returnUserResponse?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user/addEmailAccount`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name AddWebEmailAccount
     * @summary add a new web email account
     * @request POST:/jwt/user/web/addEmailAccount
     * @secure
     */
    addWebEmailAccount: (
      data: AddWebEmailAccountRequest,
      query?: {
        /** a boolean flag indicating that you would like the user response returned */
        returnUserResponse?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserResponse, Error>({
        path: `/jwt/user/web/addEmailAccount`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name RemoveEmailAccount
     * @summary remove the given account from the database
     * @request POST:/jwt/user/removeEmailAccount/{emailAccountId}
     * @secure
     */
    removeEmailAccount: (emailAccountId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/user/removeEmailAccount/${emailAccountId}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name RemoveEmailAccounts
     * @summary remove all email accounts associated with the given user
     * @request POST:/jwt/user/removeEmailAccounts
     * @secure
     */
    removeEmailAccounts: (params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/user/removeEmailAccounts`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserImpact
     * @summary Get User Impact
     * @request GET:/jwt/user/impact
     * @secure
     */
    getUserImpact: (
      query?: {
        /**
         * start date for the tree parts graph, which will be adjusted to correspond to the start of the given week, where weeks start on Sunday
         * @format date-time
         */
        startDate?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserImpact, Error>({
        path: `/jwt/user/impact`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserSubscriptions
     * @summary get the user's subscriptions. returns the next page to query if it exists
     * @request GET:/jwt/user/subscriptions
     * @secure
     */
    getUserSubscriptions: (
      query?: {
        /** page number, 0 indexed */
        page?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionResponse, Error>({
        path: `/jwt/user/subscriptions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserSubscriptionsForEmailAccount
     * @summary get the user's subscriptions for the given email account id only. returns the next page to query if it exists
     * @request GET:/jwt/user/subscriptions/{emailAccountId}
     * @secure
     */
    getUserSubscriptionsForEmailAccount: (
      emailAccountId: string,
      query?: {
        /** page number, 0 indexed */
        page?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionResponse, Error>({
        path: `/jwt/user/subscriptions/${emailAccountId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name DeleteSubscription
     * @summary delete all the emails that are part of the given subscription id
     * @request DELETE:/jwt/user/subscription/{id}
     * @secure
     */
    deleteSubscription: (
      id: string,
      query?: {
        /** a boolean flag indicating if the user should also be unsubscribed from the subscription */
        unsubscribe?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @format float */
          success_rate?: number;
        },
        Error
      >({
        path: `/jwt/user/subscription/${id}`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name KeepSubscription
     * @summary mark this subscription id as kept
     * @request PATCH:/jwt/user/subscription/{id}
     * @secure
     */
    keepSubscription: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/user/subscription/${id}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetSubscriptionStatus
     * @summary returns emails deleted, total number of emails, and deletion status of the susbcription
     * @request GET:/jwt/user/subscription/{id}
     * @secure
     */
    getSubscriptionStatus: (id: string, params: RequestParams = {}) =>
      this.request<SubscriptionStatus, Error>({
        path: `/jwt/user/subscription/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name RestoreSubscription
     * @summary restores the deleted subscription specified by the given ID
     * @request POST:/jwt/user/subscription/{id}/restore
     * @secure
     */
    restoreSubscription: (
      id: string,
      query?: {
        /** a boolean flag indicating if the user should also be subscribed to the subscription */
        subscribe?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/jwt/user/subscription/${id}/restore`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserTreesAndPlantingProjects
     * @summary Get the number of trees planted by current user
     * @request GET:/jwt/user/userTreesAndPlantingProjects
     */
    userTreesAndPlantingProjects: (params: RequestParams = {}) =>
      this.request<UserTreesAndPlantingProjectsResponse, any>({
        path: `/jwt/user/userTreesAndPlantingProjects`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateTree
     * @summary update the tree with the given id
     * @request PATCH:/jwt/user/trees/{treeId}
     * @secure
     */
    updateTree: (treeId: string, data: UpdateTreeRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/user/trees/${treeId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name GetEmailSettings
     * @summary Get email settings
     * @request GET:/jwt/email/{emailAccountId}/settings
     * @secure
     */
    getEmailSettings: (emailAccountId: string, params: RequestParams = {}) =>
      this.request<EmailSettingsResponse, Error>({
        path: `/jwt/email/${emailAccountId}/settings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name UpdateEmailSettings
     * @summary set or update email settings
     * @request POST:/jwt/email/{emailAccountId}/settings
     * @secure
     */
    updateEmailSettings: (emailAccountId: string, data: UpdateEmailSettingsRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name GetNumberOfUnreadEmails
     * @summary Get number of unread emails across all accounts
     * @request GET:/jwt/email/numberUnread
     * @secure
     */
    getNumberOfUnreadEmails: (params: RequestParams = {}) =>
      this.request<
        {
          numberUnread: number;
        },
        Error
      >({
        path: `/jwt/email/numberUnread`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name GetUnreadCount
     * @summary Get number of unread emails and unread threads
     * @request GET:/jwt/email/unreadCount
     * @secure
     */
    getUnreadCount: (params: RequestParams = {}) =>
      this.request<
        {
          unreadEmails: number;
          unreadThreads: number;
        },
        Error
      >({
        path: `/jwt/email/unreadCount`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserSettings
     * @summary Get user settings
     * @request GET:/jwt/user/settings
     * @secure
     */
    getUserSettings: (params: RequestParams = {}) =>
      this.request<UserSettingsResponse, Error>({
        path: `/jwt/user/settings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateUserSettings
     * @summary set or update user settings
     * @request POST:/jwt/user/settings
     * @secure
     */
    updateUserSettings: (data: UpdateSettingsRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/user/settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelCreate
     * @summary create a label.
     * @request POST:/jwt/email/{emailAccountId}/labels
     * @secure
     */
    labelCreate: (emailAccountId: string, data: EmailLabel, params: RequestParams = {}) =>
      this.request<EmailLabel, Error>({
        path: `/jwt/email/${emailAccountId}/labels`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelsList
     * @summary Gets all labels.
     * @request GET:/jwt/email/{emailAccountId}/labels
     * @secure
     */
    labelsList: (emailAccountId: string, params: RequestParams = {}) =>
      this.request<EmailLabelListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/labels`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelGet
     * @summary Gets the specified label.
     * @request GET:/jwt/email/{emailAccountId}/labels/{labelId}
     * @secure
     */
    labelGet: (emailAccountId: string, labelId: string, params: RequestParams = {}) =>
      this.request<EmailLabel, Error>({
        path: `/jwt/email/${emailAccountId}/labels/${labelId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelDelete
     * @summary Deletes the specified label.
     * @request DELETE:/jwt/email/{emailAccountId}/labels/{labelId}
     * @secure
     */
    labelDelete: (emailAccountId: string, labelId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/labels/${labelId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelUpdate
     * @summary updates the specified label.
     * @request PUT:/jwt/email/{emailAccountId}/labels/{labelId}
     * @secure
     */
    labelUpdate: (emailAccountId: string, labelId: string, data: EmailLabel, params: RequestParams = {}) =>
      this.request<EmailLabel, Error>({
        path: `/jwt/email/${emailAccountId}/labels/${labelId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageGet
     * @summary Gets the specified message.
     * @request GET:/jwt/email/{emailAccountId}/messages/{messageId}
     * @secure
     */
    messageGet: (
      emailAccountId: string,
      messageId: string,
      query?: {
        /** message format */
        format?: EmailMessageFormat;
        /** include attachment thumbnails */
        thumbnails?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageDelete
     * @summary Deletes the specified message.
     * @request DELETE:/jwt/email/{emailAccountId}/messages/{messageId}
     * @secure
     */
    messageDelete: (emailAccountId: string, messageId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageUpdate
     * @summary updates the specified message.
     * @request PUT:/jwt/email/{emailAccountId}/messages/{messageId}
     * @secure
     */
    messageUpdate: (emailAccountId: string, messageId: string, data: EmailMessageUpdateRequest, params: RequestParams = {}) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name EmptyTrash
     * @summary delete the items in the trash
     * @request POST:/jwt/email/{emailAccountId}/emptyTrash
     * @secure
     */
    emptyTrash: (emailAccountId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/emptyTrash`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageTrash
     * @summary trashes the specified message.
     * @request POST:/jwt/email/{emailAccountId}/messages/{messageId}/trash
     * @secure
     */
    messageTrash: (emailAccountId: string, messageId: string, params: RequestParams = {}) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}/trash`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageUntrash
     * @summary un-trashes the specified message.
     * @request POST:/jwt/email/{emailAccountId}/messages/{messageId}/untrash
     * @secure
     */
    messageUntrash: (emailAccountId: string, messageId: string, params: RequestParams = {}) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}/untrash`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesTrash
     * @summary trashes the specified message.
     * @request POST:/jwt/email/{emailAccountId}/messages/bulkTrash
     * @secure
     */
    messagesTrash: (emailAccountId: string, data: EmailMessageBulkIdRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/messages/bulkTrash`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesUntrash
     * @summary un-trashes the specified message.
     * @request POST:/jwt/email/{emailAccountId}/messages/bulkUntrash
     * @secure
     */
    messagesUntrash: (emailAccountId: string, data: EmailMessageBulkIdRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/messages/bulkUntrash`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesDelete
     * @summary deletes the specified messages.
     * @request POST:/jwt/email/{emailAccountId}/messages/bulkDelete
     * @secure
     */
    messagesDelete: (emailAccountId: string, data: EmailMessageBulkIdRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/messages/bulkDelete`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesUpdate
     * @summary updates the specified messages.
     * @request POST:/jwt/email/{emailAccountId}/messages/bulkUpdate
     * @secure
     */
    messagesUpdate: (emailAccountId: string, data: EmailMessageBulkUpdateRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/messages/bulkUpdate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name SubmitOfflineChanges
     * @summary publishes app-side changes made while the user was offline
     * @request POST:/jwt/email/{emailAccountId}/messages/offlineChanges
     * @secure
     */
    submitOfflineChanges: (emailAccountId: string, data: SubmitOfflineChangesRequest, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          offlineChangesId: string;
        },
        Error
      >({
        path: `/jwt/email/${emailAccountId}/messages/offlineChanges`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name GetOfflineChangesStatus
     * @summary check the status of changes previously submitted
     * @request GET:/jwt/email/{emailAccountId}/messages/offlineChanges/{offlineChangesId}
     * @secure
     */
    getOfflineChangesStatus: (emailAccountId: string, offlineChangesId: string, params: RequestParams = {}) =>
      this.request<GetOfflineChangesStatusResponse, Error>({
        path: `/jwt/email/${emailAccountId}/messages/offlineChanges/${offlineChangesId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesList
     * @summary Gets the message list.
     * @request GET:/jwt/email/{emailAccountId}/messages
     * @secure
     */
    messagesList: (
      emailAccountId: string,
      query?: {
        /** @default 100 */
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessageListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/messages`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesListByTimestamp
     * @summary Returns a list messages of messages for syncing. It requires either lastSyncTimestamp or fromTimestamp and toTimestamp.
     * @request GET:/jwt/email/{emailAccountId}/messages/sync
     * @secure
     */
    messagesListByTimestamp: (
      emailAccountId: string,
      query?: {
        /** @default 20 */
        maxResults?: number;
        /** @format date-time */
        lastSyncTimestamp?: string;
        /** @format date-time */
        fromTimestamp?: string;
        /** @format date-time */
        toTimestamp?: string;
        pageToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessageListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/messages/sync`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadsSync
     * @summary Returns a list of threads for syncing
     * @request GET:/jwt/email/{emailAccountId}/threads/sync
     * @secure
     */
    threadsSync: (
      emailAccountId: string,
      query: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
        /** @format date-time */
        afterTimestamp?: string;
        /** @format date-time */
        beforeTimestamp: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailThreadsListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/threads/sync`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadsListForAllAccounts
     * @summary Gets the threads list for all account.
     * @request GET:/jwt/email/threads
     * @secure
     */
    threadsListForAllAccounts: (
      query?: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailThreadsListResponse, Error>({
        path: `/jwt/email/threads`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessagesListForAllAccounts
     * @summary Gets the message list for all accounts.
     * @request GET:/jwt/email/messages
     * @secure
     */
    messagesListForAllAccounts: (
      query?: {
        /** @default 100 */
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessageListResponse, Error>({
        path: `/jwt/email/messages`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageGetAttachment
     * @summary Gets the specified message attachment.
     * @request GET:/jwt/email/{emailAccountId}/messages/{messageId}/attachments/{attachmentId}
     * @secure
     */
    messageGetAttachment: (emailAccountId: string, messageId: string, attachmentId: string, params: RequestParams = {}) =>
      this.request<EmailMessagePartBody, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}/attachments/${attachmentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageDownloadAttachment
     * @summary Gets the specified message attachment file(s).
     * @request GET:/jwt/email/{emailAccountId}/messages/{messageId}/attachments/download
     * @secure
     */
    messageDownloadAttachment: (
      emailAccountId: string,
      messageId: string,
      query?: {
        /** attachment id */
        attachmentId?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<File, Error>({
        path: `/jwt/email/${emailAccountId}/messages/${messageId}/attachments/download`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name MessageSendAttachment
     * @summary send a message with attachment.
     * @request POST:/jwt/email/{emailAccountId}/messages/send/attachment
     * @secure
     */
    messageSendAttachment: (
      emailAccountId: string,
      query: {
        /** upload type */
        uploadType: EmailUploadType;
      },
      data: {
        emailMessage?: EmailMessage;
        /** @format binary */
        data?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/messages/send/attachment`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name HistoryList
     * @summary Gets the history list.
     * @request GET:/jwt/email/{emailAccountId}/history
     * @secure
     */
    historyList: (
      emailAccountId: string,
      query?: {
        maxResults?: number;
        pageToken?: string;
        startHistoryId?: string;
        historyTypes?: EmailHistoryType[];
        labelId?: string;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailHistoryListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/history`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftGet
     * @summary Gets the specified draft.
     * @request GET:/jwt/email/{emailAccountId}/drafts/{draftMessageId}
     * @secure
     */
    draftGet: (
      emailAccountId: string,
      draftMessageId: string,
      query?: {
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailDraftMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/${draftMessageId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftDelete
     * @summary Deletes the specified draft message.
     * @request DELETE:/jwt/email/{emailAccountId}/drafts/{draftMessageId}
     * @secure
     */
    draftDelete: (emailAccountId: string, draftMessageId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/${draftMessageId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftUpdate
     * @summary updates the specified draft message.
     * @request PUT:/jwt/email/{emailAccountId}/drafts/{draftMessageId}
     * @secure
     */
    draftUpdate: (emailAccountId: string, draftMessageId: string, data: EmailDraftMessage, params: RequestParams = {}) =>
      this.request<EmailDraftMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/${draftMessageId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftCreate
     * @summary create a draft.
     * @request POST:/jwt/email/{emailAccountId}/drafts
     * @secure
     */
    draftCreate: (emailAccountId: string, data: EmailDraftMessage, params: RequestParams = {}) =>
      this.request<EmailDraftMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftsList
     * @summary Gets the draft message list.
     * @request GET:/jwt/email/{emailAccountId}/drafts
     * @secure
     */
    draftsList: (
      emailAccountId: string,
      query?: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailDraftMessageListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/drafts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftCreateAttachment
     * @summary upload a draft attachment.
     * @request POST:/jwt/email/{emailAccountId}/drafts/attachment
     * @secure
     */
    draftCreateAttachment: (
      emailAccountId: string,
      query: {
        /** upload type */
        uploadType: EmailUploadType;
      },
      data: {
        emailMessage?: EmailMessage;
        /** @format binary */
        data?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailDraftMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/attachment`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftUpdateAttachment
     * @summary update a draft with an attachment.
     * @request PUT:/jwt/email/{emailAccountId}/drafts/{draftMessageId}/attachment
     * @secure
     */
    draftUpdateAttachment: (
      emailAccountId: string,
      draftMessageId: string,
      query: {
        /** upload type */
        uploadType: EmailUploadType;
      },
      data: {
        emailMessage?: EmailMessage;
        /** @format binary */
        data?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailDraftMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/${draftMessageId}/attachment`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftSendAttachment
     * @summary send a draft with attachment.
     * @request POST:/jwt/email/{emailAccountId}/drafts/send/attachment
     * @secure
     */
    draftSendAttachment: (
      emailAccountId: string,
      query: {
        /** upload type */
        uploadType: EmailUploadType;
      },
      data: {
        emailMessage?: EmailMessage;
        /** @format binary */
        data?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/send/attachment`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name DraftSend
     * @summary sends the specified draft message.
     * @request POST:/jwt/email/{emailAccountId}/drafts/send
     * @secure
     */
    draftSend: (emailAccountId: string, data: EmailDraftMessage, params: RequestParams = {}) =>
      this.request<EmailMessage, Error>({
        path: `/jwt/email/${emailAccountId}/drafts/send`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name StartChunkedAttachmentUpload
     * @summary starts the process of uploading a chunked attachment to a draft
     * @request POST:/jwt/email/{emailAccountId}/drafts/{draftMessageId}/attachment/add
     * @secure
     */
    startChunkedAttachmentUpload: (
      emailAccountId: string,
      draftMessageId: string,
      data: {
        /** the name of the file being uploaded */
        fileName: string;
        /** the MIME type of the file being uploaded */
        mimeType: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** unique key for the upload session */
          uploadKey: string;
        },
        Error
      >({
        path: `/jwt/email/${emailAccountId}/drafts/${draftMessageId}/attachment/add`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name GetAttachmentUpload
     * @summary retrieves the content range that has already been uploaded
     * @request GET:/jwt/email/{emailAccountId}/drafts/attachment/upload
     * @secure
     */
    getAttachmentUpload: (
      emailAccountId: string,
      query: {
        /**
         * unique key for the upload session
         * @format uuid
         */
        uploadKey: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** indicates the bytes range that has been uploaded */
          range: string;
        },
        Error
      >({
        path: `/jwt/email/${emailAccountId}/drafts/attachment/upload`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name UploadAttachmentChunk
     * @summary uploads a chunk of attachment data
     * @request PUT:/jwt/email/{emailAccountId}/drafts/attachment/upload
     * @secure
     */
    uploadAttachmentChunk: (
      emailAccountId: string,
      query: {
        /**
         * unique key for the upload session
         * @format uuid
         */
        uploadKey: string;
      },
      data: File,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/jwt/email/${emailAccountId}/drafts/attachment/upload`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadsList
     * @summary Gets the threads list.
     * @request GET:/jwt/email/{emailAccountId}/threads
     * @secure
     */
    threadsList: (
      emailAccountId: string,
      query?: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailThreadsListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/threads`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadGet
     * @summary Gets the specified thread.
     * @request GET:/jwt/email/{emailAccountId}/threads/{threadId}
     * @secure
     */
    threadGet: (
      emailAccountId: string,
      threadId: string,
      query?: {
        /** thread format */
        format?: ThreadFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailThread, Error>({
        path: `/jwt/email/${emailAccountId}/threads/${threadId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadDelete
     * @summary Deletes the specified thread.
     * @request DELETE:/jwt/email/{emailAccountId}/threads/{threadId}
     * @secure
     */
    threadDelete: (emailAccountId: string, threadId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/threads/${threadId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadUpdate
     * @summary updates the specified thread.
     * @request PUT:/jwt/email/{emailAccountId}/threads/{threadId}
     * @secure
     */
    threadUpdate: (emailAccountId: string, threadId: string, data: EmailMessageUpdateRequest, params: RequestParams = {}) =>
      this.request<EmailThread, Error>({
        path: `/jwt/email/${emailAccountId}/threads/${threadId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadTrash
     * @summary trashes the specified thread.
     * @request POST:/jwt/email/{emailAccountId}/threads/{threadId}/trash
     * @secure
     */
    threadTrash: (emailAccountId: string, threadId: string, params: RequestParams = {}) =>
      this.request<EmailThread, Error>({
        path: `/jwt/email/${emailAccountId}/threads/${threadId}/trash`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadUntrash
     * @summary un-trashes the specified thread.
     * @request POST:/jwt/email/{emailAccountId}/threads/{threadId}/untrash
     * @secure
     */
    threadUntrash: (emailAccountId: string, threadId: string, params: RequestParams = {}) =>
      this.request<EmailThread, Error>({
        path: `/jwt/email/${emailAccountId}/threads/${threadId}/untrash`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadsUpdate
     * @summary updates the specified threads.
     * @request POST:/jwt/email/{emailAccountId}/threads/bulkUpdate
     * @secure
     */
    threadsUpdate: (emailAccountId: string, data: EmailMessageBulkUpdateRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/threads/bulkUpdate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name ThreadsUpdateAll
     * @summary adds and removes labels from subset of emails
     * @request POST:/jwt/email/{emailAccountId}/threads/updateAll
     * @secure
     */
    threadsUpdateAll: (
      emailAccountId: string,
      data: EmailMessageUpdateRequest,
      query?: {
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/threads/updateAll`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name SearchThreadsAndContacts
     * @summary returns threads and contacts matching the search term
     * @request GET:/jwt/email/{emailAccountId}/searchThreads
     * @secure
     */
    searchThreadsAndContacts: (
      emailAccountId: string,
      query?: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailSearchThreadsListResponse, Error>({
        path: `/jwt/email/${emailAccountId}/searchThreads`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name SearchMessagesAndContacts
     * @summary returns emails and contacts matching the search term
     * @request GET:/jwt/email/{emailAccountId}/search
     * @secure
     */
    searchMessagesAndContacts: (
      emailAccountId: string,
      query: {
        query: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailSearchResponse, Error>({
        path: `/jwt/email/${emailAccountId}/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name LabelSearch
     * @summary returns email labels matching the search term
     * @request GET:/jwt/email/{emailAccountId}/labelSearch
     * @secure
     */
    labelSearch: (
      emailAccountId: string,
      query: {
        query: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LabelSearchResponse, Error>({
        path: `/jwt/email/${emailAccountId}/labelSearch`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsSearch
     * @summary returns contacts matching the search term
     * @request GET:/jwt/contacts/{emailAccountId}/search
     * @secure
     */
    contactsSearch: (
      emailAccountId: string,
      query: {
        query: string;
        pageSize: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<ContactSearchResponse, Error>({
        path: `/jwt/contacts/${emailAccountId}/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags contacts
     * @name ContactsSearchSuggested
     * @summary returns contacts matching the search term
     * @request GET:/jwt/contacts/{emailAccountId}/suggested
     * @secure
     */
    contactsSearchSuggested: (
      emailAccountId: string,
      query: {
        query: string;
        pageSize: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<ContactSearchResponse, Error>({
        path: `/jwt/contacts/${emailAccountId}/suggested`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name EmailUnsubscribe
     * @summary Gets the specified message.
     * @request GET:/jwt/email/{emailAccountId}/unsubscribe/{messageId}
     * @secure
     */
    emailUnsubscribe: (
      emailAccountId: string,
      messageId: string,
      query: {
        /** unsubscribe option */
        unsubscribeOption: EmailUnsubscribeOption;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/unsubscribe/${messageId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags email
     * @name CalendarEventRespond
     * @summary respond to calendar event
     * @request GET:/jwt/email/{emailAccountId}/calendar-event/{messageId}
     * @secure
     */
    calendarEventRespond: (
      emailAccountId: string,
      messageId: string,
      query: {
        /** response status */
        responseStatus: CalendarEventResponseStatus;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/calendar-event/${messageId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devtools
     * @name ForwardOriginalMessage
     * @summary forward original message
     * @request GET:/jwt/email/{emailAccountId}/tools/{messageId}/forwardOriginal
     * @secure
     */
    forwardOriginalMessage: (
      emailAccountId: string,
      messageId: string,
      query: {
        /** where to forward the message */
        recipient: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/tools/${messageId}/forwardOriginal`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devtools
     * @name UploadEml
     * @summary upload EML message
     * @request POST:/jwt/email/{emailAccountId}/tools/uploadEml
     * @secure
     */
    uploadEml: (emailAccountId: string, data: File, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/email/${emailAccountId}/tools/uploadEml`,
        method: 'POST',
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devtools
     * @name GenerateSubscriptions
     * @summary generates subscriptions
     * @request GET:/jwt/email/{emailAccountId}/tools/generateSubscriptions
     * @secure
     */
    generateSubscriptions: (
      emailAccountId: string,
      query: {
        /** amount to generate */
        amount: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<Subscription, Error>({
        path: `/jwt/email/${emailAccountId}/tools/generateSubscriptions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags playground
     * @name ThreadsListImap
     * @summary IMAP threads list.
     * @request GET:/jwt/playground/{emailAccountId}/imapThreadsList
     * @secure
     */
    threadsListImap: (
      emailAccountId: string,
      query?: {
        maxResults?: number;
        pageToken?: string;
        query?: string;
        labelIds?: string[];
        includeTrash?: boolean;
        /** message format */
        format?: EmailMessageFormat;
      },
      params: RequestParams = {}
    ) =>
      this.request<EmailThreadsListResponse, Error>({
        path: `/jwt/playground/${emailAccountId}/imapThreadsList`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags playground
     * @name LoadInboxImap
     * @summary IMAP load inbox.
     * @request GET:/jwt/playground/{emailAccountId}/imapLoadInbox
     * @secure
     */
    loadInboxImap: (emailAccountId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/jwt/playground/${emailAccountId}/imapLoadInbox`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  stats = {
    /**
     * No description
     *
     * @tags stats
     * @name GetImpactStats
     * @summary Get impact stats for the wildhero community
     * @request GET:/stats/impact
     */
    getImpactStats: (params: RequestParams = {}) =>
      this.request<ImpactStatsResponse, any>({
        path: `/stats/impact`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats
     * @name GetTreesPlanted
     * @summary Get the number of trees planted by all users
     * @request GET:/stats/treesPlanted
     */
    getTreesPlanted: (params: RequestParams = {}) =>
      this.request<TreesPlantedResponse, any>({
        path: `/stats/treesPlanted`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  public = {
    /**
     * No description
     *
     * @tags public
     * @name PlatformInboxZeroImage
     * @summary get random image of the day
     * @request GET:/public/platformInboxZeroImage
     */
    platformInboxZeroImage: (
      query: {
        /** desktop or mobile */
        platform: 'desktop' | 'mobile';
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          image?: string;
        },
        any
      >({
        path: `/public/platformInboxZeroImage`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags impact
     * @name GetPlantingPartners
     * @summary get planting partners
     * @request GET:/public/plantingPartners
     */
    getPlantingPartners: (
      query?: {
        /**
         * userId
         * @format uuid
         */
        userId?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PlantingPartner[], Error>({
        path: `/public/plantingPartners`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags impact
     * @name GetImagesForPlantingProject
     * @summary get all images for the given planting projects
     * @request GET:/public/plantingProjects/{plantingProjectId}/images
     */
    getImagesForPlantingProject: (
      plantingProjectId: string,
      query?: {
        /** page token */
        pageToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ImagesAndPagination, Error>({
        path: `/public/plantingProjects/${plantingProjectId}/images`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags impact
     * @name GetFieldReport
     * @summary get latest field report
     * @request GET:/public/plantingProjects/{plantingProjectId}/fieldReport
     */
    getFieldReport: (plantingProjectId: string, params: RequestParams = {}) =>
      this.request<Evidence, Error>({
        path: `/public/plantingProjects/${plantingProjectId}/fieldReport`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags impact
     * @name GetAllPlantingImages
     * @summary get all planting project images
     * @request GET:/public/plantingPartners/images
     */
    getAllPlantingImages: (
      query?: {
        /** page token */
        pageToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ImagesAndPagination, Error>({
        path: `/public/plantingPartners/images`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  featureFlags = {
    /**
     * No description
     *
     * @tags featureFlags
     * @name GetFeatureFlags
     * @summary Get feature flags
     * @request GET:/featureFlags
     */
    getFeatureFlags: (params: RequestParams = {}) =>
      this.request<FeatureFlag[], Error>({
        path: `/featureFlags`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags featureFlags
     * @name GetSpecificFeatureFlag
     * @summary Get specific flag
     * @request GET:/featureFlags/{featureFlagName}
     */
    getSpecificFeatureFlag: (featureFlagName: FeatureFlagName, params: RequestParams = {}) =>
      this.request<FeatureFlag, Error>({
        path: `/featureFlags/${featureFlagName}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  device = {
    /**
     * No description
     *
     * @tags device
     * @name PreAuthAbGroups
     * @summary Get pre authentication ab testing groups
     * @request GET:/device/preAuthAbGroups
     */
    preAuthAbGroups: (params: RequestParams = {}) =>
      this.request<PreAuthAbGroupsResponse, any>({
        path: `/device/preAuthAbGroups`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
