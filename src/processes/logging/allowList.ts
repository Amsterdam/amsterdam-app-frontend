import {ExceptionLogKey} from '@/processes/logging/types'

export const allowList = {
  [ExceptionLogKey.coordinates]: ['error'],
  [ExceptionLogKey.getRedirectsUrl]: ['redirectsKey'],
  [ExceptionLogKey.nodeNotFound]: [],
  [ExceptionLogKey.notSupportedStoredUrl]: [],
  [ExceptionLogKey.hideSplashScreen]: ['error'],
  [ExceptionLogKey.isScreenReaderEnabled]: ['error'],
  [ExceptionLogKey.openMailUrl]: [],
  [ExceptionLogKey.openPhoneUrl]: [],
  [ExceptionLogKey.openStore]: ['error'],
  [ExceptionLogKey.openWebUrl]: ['url'],
  [ExceptionLogKey.pickingImageFailed]: ['error', 'code', 'viaCamera'],
  [ExceptionLogKey.piwikInitialization]: ['error'],
  [ExceptionLogKey.piwikTrackCustomEvent]: [
    'category',
    'action',
    'name',
    'path',
    'value',
  ],
  [ExceptionLogKey.piwikTrackOutlink]: ['url'],
  [ExceptionLogKey.piwikTrackScreen]: ['path'],
  [ExceptionLogKey.piwikTrackSearch]: [],
  [ExceptionLogKey.redirectNotFound]: ['urlKey'],
  [ExceptionLogKey.registerDevice]: ['error'],
  [ExceptionLogKey.requestLocationPermission]: ['error'],
  [ExceptionLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
  [ExceptionLogKey.updatePermission]: ['error', 'permission', 'request'],
} as const

export type AllowListKeys<LogKey extends ExceptionLogKey> =
  (typeof allowList)[LogKey][number]