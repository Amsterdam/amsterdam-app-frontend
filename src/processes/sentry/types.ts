import {type AllowListKeys} from '@/processes/sentry/allowList'

export enum BreadcrumbKey {
  internetConnection = 'Internet connection change',
}

export enum BreadcrumbCategory {
  default = 'default',
  internetConnection = 'internetConnection',
}

export type CaptureBreadcrumb = (
  message?: BreadcrumbKey,
  data?: Record<string, unknown>,
  category?: BreadcrumbCategory,
) => void

export enum SentryErrorLogKey {
  currentCoordinates = 'Get current coordinates failed',
  getModulesForAppQuery = 'Failed to get modules for app',
  getRedirectsUrl = 'Get redirects url with key',
  hideSplashScreen = 'Hide splash screen failed',
  isScreenReaderEnabled = 'Screenreader enabled check failed',
  notSupportedStoredUrl = 'Can not use url to open store',
  openMailUrl = 'Open mail url failed',
  openPhoneUrl = 'Open phone url failed',
  openStore = 'Open app store',
  openWebUrl = 'Open web url failed',
  pickingImageFailed = 'Picking image from device failed',
  piwikInitialization = 'Piwik initialization failed',
  piwikTrackCustomEvent = 'Piwik trackCustomEvent failed',
  piwikTrackOutlink = 'Piwik trackOutlink failed',
  piwikTrackScreen = 'Piwik trackScreen failed',
  piwikTrackSearch = 'Piwik trackSearch failed',
  redirectNotFound = 'Redirect not found',
  registerDevice = 'Register device for push notifications failed',
  requestLocationPermission = 'Request location permission failed',
  sentryMiddleWareError = 'Sentry middleware logger failed',
  takingPhotoFailed = 'Taking photo failed',
  updatePermission = 'Update permission failed',
}

export type SendErrorLog = <T extends SentryErrorLogKey>(
  logKey: T,
  filename: string,
  data?: AllowListKeys<T> extends never
    ? never
    : Partial<Record<AllowListKeys<T>, unknown>>,
  errorTitle?: string,
) => void

export type SentryHandler = {
  captureSentryBreadcrumb: CaptureBreadcrumb
  sendSentryErrorLog: SendErrorLog
}
