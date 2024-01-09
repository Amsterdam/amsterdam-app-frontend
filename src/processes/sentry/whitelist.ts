import {SentryErrorLogKey} from '@/processes/sentry/types'

export const sentryWhitelist: Record<SentryErrorLogKey, string[]> = {
  [SentryErrorLogKey.currentCoordinates]: ['code', 'message'],
  [SentryErrorLogKey.getModulesForAppQuery]: ['error', 'retriesRemaining'],
  [SentryErrorLogKey.isScreenReaderEnabled]: ['error'],
  [SentryErrorLogKey.locationPermission]: ['error'],
  [SentryErrorLogKey.openMailUrl]: [],
  [SentryErrorLogKey.openPhoneUrl]: [],
  [SentryErrorLogKey.openWebUrl]: ['url'],
  [SentryErrorLogKey.pickingImageFailed]: ['code', 'message', 'viaCamera'],
  [SentryErrorLogKey.piwikInitialization]: ['error'],
  [SentryErrorLogKey.registerDevice]: ['error'],
  [SentryErrorLogKey.requestLocationPermission]: ['error'],
  [SentryErrorLogKey.resetLocationPermissionAndroid]: ['error'],
  [SentryErrorLogKey.sentryMiddleWareError]: ['endpoint', 'status', 'url'],
  [SentryErrorLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
}
