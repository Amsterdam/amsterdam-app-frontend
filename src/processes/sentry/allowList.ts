import {SentryErrorLogKey} from '@/processes/sentry/types'

export const sentryAllowList = {
  [SentryErrorLogKey.currentCoordinates]: ['code', 'message'],
  [SentryErrorLogKey.getModulesForAppQuery]: [
    'error',
    'retriesRemaining',
    'serverModules',
  ],
  [SentryErrorLogKey.notSupportedStoredUrl]: [],
  [SentryErrorLogKey.hideSplashScreen]: ['error'],
  [SentryErrorLogKey.isScreenReaderEnabled]: ['error'],
  [SentryErrorLogKey.locationPermission]: ['error'],
  [SentryErrorLogKey.openMailUrl]: [],
  [SentryErrorLogKey.openPhoneUrl]: [],
  [SentryErrorLogKey.openWebUrl]: ['url'],
  [SentryErrorLogKey.pickingImageFailed]: ['error', 'code', 'viaCamera'],
  [SentryErrorLogKey.piwikInitialization]: ['error'],
  [SentryErrorLogKey.piwikTrackCustomEvent]: ['category', 'action', 'name'],
  [SentryErrorLogKey.piwikTrackOutlink]: ['url'],
  [SentryErrorLogKey.piwikTrackScreen]: ['path'],
  [SentryErrorLogKey.piwikTrackSearch]: [],
  [SentryErrorLogKey.registerDevice]: ['error'],
  [SentryErrorLogKey.requestLocationPermission]: ['error'],
  [SentryErrorLogKey.resetLocationPermissionAndroid]: ['error'],
  [SentryErrorLogKey.sentryMiddleWareError]: ['endpoint', 'status', 'url'],
  [SentryErrorLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
  [SentryErrorLogKey.openStore]: ['error'],
} as const

export type AllowListKeys<LogKey extends SentryErrorLogKey> =
  (typeof sentryAllowList)[LogKey][number]
