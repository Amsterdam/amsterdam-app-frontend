import {AllowListKeys} from '@/processes/logging/allowList'

export enum EventLogKey {
  fullStartup = 'Full startup',
  internetConnection = 'Internet connection changed',
  nativeStartup = 'Native startup',
}
export enum ExceptionLogKey {
  coordinates = 'Failed to get coordinates to determine location',
  getRedirectsUrl = 'Get redirects url with key',
  hideSplashScreen = 'Hide splash screen failed',
  isScreenReaderEnabled = 'Screenreader enabled check failed',
  nodeNotFound = 'Node not found for ref',
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
  takingPhotoFailed = 'Taking photo failed',
  updatePermission = 'Update permission failed',
}

export const enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

export type TrackException = <T extends ExceptionLogKey>(
  logKey: T,
  filename: string,
  data?: AllowListKeys<T> extends never
    ? never
    : Partial<Record<AllowListKeys<T>, unknown>>,
  /**
   * @default `SeverityLevel.Error`
   */
  severityLevel?: SeverityLevel,
) => void
