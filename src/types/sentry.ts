export enum BreadcrumbCategory {
  default = 'default',
  internetConnection = 'internetConnection',
}

export type CaptureBreadcrumb = (
  message?: string,
  data?: Record<string, unknown>,
  category?: BreadcrumbCategory,
) => void

export enum SentryLogKey {
  currentCoordinates = 'Get current coordinates failed',
  getModulesForAppQuery = 'Failed to get modules for app',
  isScreenReaderEnabled = 'Screenreader enabled check failed',
  locationPermission = 'Check location permission failed',
  openMailUrl = 'Open mail url failed',
  openPhoneUrl = 'Open phone url failed',
  openWebUrl = 'Open web url failed',
  pickingImageFailed = 'Picking image from device failed',
  registerDevice = 'Register device for push notifications failed',
  requestLocationPermission = 'Request location permission failed',
  resetLocationPermissionAndroid = 'Android: Check location permission on foreground failed',
  // TODO: sentryMiddleWare custom error fix
  sentryMiddleWareError = 'Sentry middleware logger failed',
  takingPhotoFailed = 'Taking photo failed',
}

export type SendErrorLog = (
  message: SentryLogKey,
  filename: string,
  data?: Record<string, unknown>,
) => void

export const sentryWhitelist: Partial<Record<SentryLogKey, string[]>> = {
  [SentryLogKey.currentCoordinates]: ['code', 'message'],
  [SentryLogKey.getModulesForAppQuery]: ['code', 'message'],
  [SentryLogKey.isScreenReaderEnabled]: ['code', 'message'],
  [SentryLogKey.locationPermission]: ['code', 'message'],
  [SentryLogKey.openMailUrl]: ['code', 'message'],
  [SentryLogKey.openPhoneUrl]: ['code', 'message'],
  [SentryLogKey.openWebUrl]: ['code', 'message'],
  [SentryLogKey.pickingImageFailed]: ['code', 'message', 'viaCamera'],
  [SentryLogKey.registerDevice]: ['code', 'message'],
  [SentryLogKey.requestLocationPermission]: ['code', 'message'],
  [SentryLogKey.resetLocationPermissionAndroid]: ['code', 'message'],
  [SentryLogKey.sentryMiddleWareError]: ['code', 'message'],
  [SentryLogKey.takingPhotoFailed]: ['code', 'message', 'viaCamera'],
}

export type SentryHandler = {
  captureSentryBreadcrumb: CaptureBreadcrumb
  sendSentryErrorLog: SendErrorLog
}
