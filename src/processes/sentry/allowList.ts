import {SentryErrorLogKey} from '@/processes/sentry/types'

export const sentryAllowList = {
  [SentryErrorLogKey.currentCoordinates]: ['code', 'message'],
  [SentryErrorLogKey.getModulesForAppQuery]: [
    'error',
    'retriesRemaining',
    'serverModules',
  ],
  [SentryErrorLogKey.isScreenReaderEnabled]: ['error'],
  [SentryErrorLogKey.locationPermission]: ['error'],
  [SentryErrorLogKey.openMailUrl]: [],
  [SentryErrorLogKey.openPhoneUrl]: [],
  [SentryErrorLogKey.openWebUrl]: ['url'],
  [SentryErrorLogKey.pickingImageFailed]: ['error', 'code', 'viaCamera'],
  [SentryErrorLogKey.piwikInitialization]: ['error'],
  [SentryErrorLogKey.registerDevice]: ['error'],
  [SentryErrorLogKey.requestLocationPermission]: ['error'],
  [SentryErrorLogKey.resetLocationPermissionAndroid]: ['error'],
  [SentryErrorLogKey.sentryMiddleWareError]: ['endpoint', 'status', 'url'],
  [SentryErrorLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
} as const
