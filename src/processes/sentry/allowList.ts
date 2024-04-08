import {SentryErrorLogKey} from '@/processes/sentry/types'

export const sentryAllowList = {
  [SentryErrorLogKey.currentCoordinates]: ['error'],
  [SentryErrorLogKey.getRedirectsUrl]: ['redirectsKey'],
  [SentryErrorLogKey.notSupportedStoredUrl]: [],
  [SentryErrorLogKey.hideSplashScreen]: ['error'],
  [SentryErrorLogKey.isScreenReaderEnabled]: ['error'],
  [SentryErrorLogKey.openMailUrl]: [],
  [SentryErrorLogKey.openPhoneUrl]: [],
  [SentryErrorLogKey.openStore]: ['error'],
  [SentryErrorLogKey.openWebUrl]: ['url'],
  [SentryErrorLogKey.pickingImageFailed]: ['error', 'code', 'viaCamera'],
  [SentryErrorLogKey.piwikInitialization]: ['error'],
  [SentryErrorLogKey.piwikTrackCustomEvent]: [
    'category',
    'action',
    'name',
    'path',
    'value',
  ],
  [SentryErrorLogKey.piwikTrackOutlink]: ['url'],
  [SentryErrorLogKey.piwikTrackScreen]: ['path'],
  [SentryErrorLogKey.piwikTrackSearch]: [],
  [SentryErrorLogKey.redirectNotFound]: ['urlKey'],
  [SentryErrorLogKey.registerDevice]: ['error'],
  [SentryErrorLogKey.requestLocationPermission]: ['error'],
  [SentryErrorLogKey.sentryMiddleWareError]: [
    'endpoint',
    'error',
    'originalStatus',
    'status',
    'url',
  ],
  [SentryErrorLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
  [SentryErrorLogKey.updatePermission]: ['error', 'permission', 'request'],
} as const

export type AllowListKeys<LogKey extends SentryErrorLogKey> =
  (typeof sentryAllowList)[LogKey][number]
