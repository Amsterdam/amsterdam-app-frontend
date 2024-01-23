import {sentryAllowList} from '@/processes/sentry/allowList'

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
  isScreenReaderEnabled = 'Screenreader enabled check failed',
  locationPermission = 'Check location permission failed',
  openMailUrl = 'Open mail url failed',
  openPhoneUrl = 'Open phone url failed',
  openWebUrl = 'Open web url failed',
  pickingImageFailed = 'Picking image from device failed',
  piwikInitialization = 'Piwik initialization failed',
  registerDevice = 'Register device for push notifications failed',
  requestLocationPermission = 'Request location permission failed',
  resetLocationPermissionAndroid = 'Android: Check location permission on foreground failed',
  sentryMiddleWareError = 'Sentry middleware logger failed',
  takingPhotoFailed = 'Taking photo failed',
}

export type SendErrorLog = <T extends SentryErrorLogKey>(
  logKey: T,
  filename: string,
  data?: (typeof sentryAllowList)[T][number] extends never
    ? never
    : Partial<Record<(typeof sentryAllowList)[T][number], unknown>>,
  errorTitle?: string,
) => void

export type SentryHandler = {
  captureSentryBreadcrumb: CaptureBreadcrumb
  sendSentryErrorLog: SendErrorLog
}
